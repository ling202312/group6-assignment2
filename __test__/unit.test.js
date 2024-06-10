
const mysql = require('mysql2');
const {
    getAllProducts, getProductById, addProduct, updateProduct, deleteProduct
} = require('../database');

jest.mock('mysql2');

describe('Database Operations', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should retrieve all products from the database', async () => {
        const mockResults = [{ id: 1, name: 'Product 1', description: 'Description 1', price: 10, quantity: 20, category: 'Category 1' }];
        mysql.createConnection.mockReturnValue({
            query: jest.fn().mockImplementation((sql, callback) => {
                callback(null, mockResults);
            })
        });
        const callback = jest.fn();
        await getAllProducts(callback);

        expect(mysql.createConnection).toHaveBeenCalled();
        expect(callback).toHaveBeenCalledWith(mockResults);
    });

    it('should retrieve a product by id from the database', async () => {
        const mockResults = { id: 1, name: 'Product 1', description: 'Description 1', price: 10, quantity: 20, category: 'Category 1' };
        const id = 1;
        mysql.createConnection.mockReturnValue({
            query: jest.fn().mockImplementation((sql, params, callback) => {
                callback(null, [mockResults]);
            })
        });

        const callback = jest.fn();
        await getProductById(id, callback);

        expect(mysql.createConnection).toHaveBeenCalled();
        expect(callback).toHaveBeenCalledWith(mockResults);
    });

    it('should add a product to the database', async () => {
        const product = { name: 'Product 1', description: 'Description 1', price: 10, quantity: 20, category: 'Category 1' };
        const mockInsertId = 1;
        mysql.createConnection.mockReturnValue({
            query: jest.fn().mockImplementation((sql, params, callback) => {
                callback(null, { insertId: mockInsertId });
            })
        });

        const callback = jest.fn();
        await addProduct(product, callback);

        expect(mysql.createConnection).toHaveBeenCalled();
        expect(callback).toHaveBeenCalledWith(mockInsertId);
    });

    it('should update a product in the database', async () => {
        const id = 1;
        const product = { name: 'Product 1 Updated', description: 'Description 1 Updated', price: 15, quantity: 25, category: 'Category 1 Updated' };
        const mockAffectedRows = 1;
        mysql.createConnection.mockReturnValue({
            query: jest.fn().mockImplementation((sql, params, callback) => {
                callback(null, { affectedRows: mockAffectedRows });
            })
        });

        const callback = jest.fn();
        await updateProduct(id, product, callback);

        expect(mysql.createConnection).toHaveBeenCalled();
        expect(callback).toHaveBeenCalledWith(mockAffectedRows);
    });

    it('should delete a product from the database', async () => {
        const id = 1;
        const mockAffectedRows = 1;
        mysql.createConnection.mockReturnValue({
            query: jest.fn().mockImplementation((sql, params, callback) => {
                callback(null, { affectedRows: mockAffectedRows });
            })
        });

        const callback = jest.fn();
        await deleteProduct(id, callback);

        expect(mysql.createConnection).toHaveBeenCalled();
        expect(callback).toHaveBeenCalledWith(mockAffectedRows);
    });
});