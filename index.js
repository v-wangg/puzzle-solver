const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const keys = require('./config/keys.js');
const cors = require('cors');

// require('./models/user');

// mongoose.connect(keys.MONGO_URI);
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log("Connected to MongoDB")
// });

const app = express();

app.use(cors());
app.use(bodyParser.json());

// require('./routes/auth.js')(app);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    const path = require('path');
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    })
}

const PORT = process.env.PORT || 5000
app.listen(PORT);
console.log("Server listening on port", PORT);
