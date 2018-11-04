import numpy as np
import scipy
import skimage

def preprocess(img, num_pieces):
    
    if num_pieces == 1:
        return img

    piece_locations = find_piece_locations(img, num_pieces)
    
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
    thresh = skimage.filters.threshold_otsu(gray)
    binary = 255 * (gray < thresh)

    # create regionprops and treat each collection of whitespace as an object
    labels = skimage.measure.label(binary)
    props = skimage.measure.regionprops(labels)

    regions = []

    regions = [region.equivalent_diameter for region in props]
    sorted = np.sort(regions)

    #arbitrarily choose the nth largest size as our characteristic puzzle size
    puzzle_size = sorted[-1 * num_pieces//2]

    piece_locations = []

    # only choose those regions that are between 50 to 200% of the puzzle_size we chose
    for region in props:
        if (puzzle_size / 1.1) <= region.equivalent_diameter <= (puzzle_size * 1.1):
            piece_locations.append(region.bbox)

    return piece_locations