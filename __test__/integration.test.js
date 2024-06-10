
const request = require('supertest');
const mockdata = require('../mockdatabase'); // Assuming you export connection from database.js
const {app,server} = require('../server');
const logic = require('../logic'); 


describe('Product API Integration Tests', () => {
    let productId;

    afterAll(async () => {
        await new Promise(resolve => server.close(resolve));
    });

    it('GET/api/products should return all users',async () =>{
        const response = await request(app).get('/api/products');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(mockdata.length);
        productId = response.body[0].id;
        expect(productId).toBeDefined();
    });

   
    it('should return a product by ID', async () => {
        const response = await request(app).get(`/api/product/${productId}`);
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(productId);
    });

    it('Post/ api/products should create a new product', async () => {
        const newProduct = { name: 'Product5', description: 'Description5', price: 50, quantity: 500, category: 'Category5' };
        const response = await request(app)
            .post('/api/product')
            .send(newProduct);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        productId = response.body.id;
    });


    it('PUT /api/product/:id should update a product by ID', async () => {
        const updatedProduct = { name: 'Product5', description: 'Description5', price: 50, quantity: 500, category: 'Category5' }; 
        const response = await request(app)
            .put(`/api/product/${productId}`)
            .send(updatedProduct);

        expect(response.status).toBe(200);
        expect(response.text).toBe('product updated successfully');
    });

    it('DELETE /api/product/:id should delete a product by ID', async () => {
        const response = await request(app).delete(`/api/product/${productId}`);
        expect(response.status).toBe(200);
        expect(response.text).toBe('product deleted successfully');
    });
});