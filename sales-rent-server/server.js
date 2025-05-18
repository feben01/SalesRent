require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./utilities/databaseConnection');
const upload = require('./utilities/upload');
const bodyParser = require('body-parser');

const MANAGER = require('./routes/managerRoutes');
const property_owner = require('./routes/poRoutes')

const port = process.env.PORT || 4040;

connectDB();

app.use(express.json());
app.use('./uploads/id', express.static('./uploads/id'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/test', (req, res) => {
    res.send("Test");
});

// Add routes for property_owner endpoints here
app.use('/api/po', property_owner);

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})