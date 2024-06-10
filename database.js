const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

// Function to retrieve all products from the database
const getAllProducts = (callback) => {
    connection.query('SELECT * FROM Products', (error, results) => {
        if (error) throw error;
        callback(results);
    });
};

// Function to retrieve all products from the database
const getProductById = (id, callback) => {
    connection.query('SELECT * FROM Products WHERE id = ?', [id], (error, results) => {
        if (error) throw error;
        callback(results[0]);
    });
};

const addProduct = (product, callback) => {
    const { name, description, price, quantity, category } = product;
    connection.query('INSERT INTO Products (name, description, price, quantity, category) VALUES (?, ?, ?, ?, ?)',
        [name, description, price, quantity, category],
        (error, results) => {
            if (error) throw error;
            callback(results.insertId);
        }
    );
};


const updateProduct = (id, product, callback) => {
    const { name, description, price, quantity, category } = product;
    connection.query(
        'UPDATE Products SET name = ?, description = ?, price = ?, quantity = ?, category = ? WHERE id = ?',
        [name, description, price, quantity, category, id],
        (error, results) => {
            if (error) throw error;
            callback(results.affectedRows);
        }
    );
};

const deleteProduct = (id, callback) => {
    connection.query('DELETE FROM Products WHERE id = ?', [id], (error, results) => {
        if (error) throw error;
        callback(results.affectedRows);
    });
};

module.exports = { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct };