import numpy as np
import scipy
import skimage
from skimage import filters

def preprocess(img, num_pieces):
    
    if num_pieces == 1:
        return img

    piece_locations = find_piece_locations(img, num_pieces)
    
    # the actual pieces cropped from the image
    pieces = []
    for location in piece_locations:
        x1, y1, x2, y2 = location
        # 20 more pixels to account for errors in binarization
        pieces.append(img[x1-20 : x2+20, y1-20 : y2+20])

    return pieces

def find_piece_locations(img, num_pieces):

    # create threshold from grayscale then binarize
    gray = skimage.color.rgb2gray(img)
    # otsu seemed to be the most versatile but can change depending
    thresh = filters.threshold_otsu(gray)
    binary = 255 * (gray < thresh)

    # create regionprops and treat each collection of whitespace as an object
    labels = skimage.measure.label(binary)
    props = skimage.measure.regionprops(labels)

    diameters = [region.equivalent_diameter for region in props]
    sorted_diameters = np.sort(diameters)
    perimeters = [region.perimeter for region in props]
    sorted_perimeters = np.sort(perimeters)

    # arbitrarily choose the nth largest diameter as our characteristic puzzle diameter, and same for perimeter
    # this assumes that the nth largest diameter/perimeter will be a puzzle piece, which could be flawed
    puzzle_diam = sorted_diameters[-1 * num_pieces]
    puzzle_perim = sorted_perimeters[-1 * num_pieces]

    diam_threshold = 1.1
    perim_threshold = 3

    # gets the bounding box for all the puzzles if they are within bounds
    piece_locations = [region.bbox for region in props 
            if (puzzle_diam / diam_threshold) <= region.equivalent_diameter <= (puzzle_diam * diam_threshold)
            and (puzzle_perim / perim_threshold) <= region.perimeter <= (puzzle_perim * perim_threshold)]    

    return piece_locations