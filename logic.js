const db = require('./database');
const express = require(`express`);
const router = express.Router();


router.get('/', (req, res) => {
    db.getAllProducts((products) => {
        if (error) {
            return res.status(500).json({ error: 'Failed to fetch products' });
        }
        res.json(products);
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    db.getProductById(id, (product) => {
        if (error) {
            return res.status(500).json({ error: 'Failed to fetch product' });
        }
        if (product) {
            res.json(product);
        } else {
            res.status(404).send('product not found');
        }
    });
});

router.post('/:id', (req, res) => {
    const product = req.body;
    db.addProduct(product, (id) => {
        if (error) {
            return res.status(500).json({ error: 'Failed to add product' });
        }
        res.status(201).json({ id });
    });
});


router.put('/:id', (req, res) => {
    const product = req.body;
    const id = req.params.id;
    db.updateProduct(id, product, (affectedRows, error) => {
        if (error) {
            return res.status(500).json({ error: 'Failed to add product' });
        }
        if (affectedRows > 0) {
            res.json({ affectedRows });
        } else {
            res.status(404).send('product not found');
        }
    });
});


router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.deleteProduct(id, (affectedRows) => {
        if (error) {
            return res.status(500).json({ error: 'Failed to add product' });
        }
        if (affectedRows > 0) {
            res.json({ affectedRows });
        } else {
            res.status(404).send('product not found');
        }
    });
});


if (process.env.DB_TYPE === "mock") {
    module.exports = mockDatabase;
} else {
    module.exports = router;
}
