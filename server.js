const express = require('express');
const app = express();
const port = 3000;
const logic = require('./logic');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/product', logic);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


const server = app.listen(port, () => {
    console.log("Server is running on port 3000.");
});

module.exports = { app, server };