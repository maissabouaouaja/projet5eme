const sqlite3 = require('sqlite3').verbose();

// Connect to the database
let db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  }
  console.log('Database connected.');
});

// Create the products table
db.run(`CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  price REAL,
  client_id INTEGER,
  FOREIGN KEY (client_id) REFERENCES clients(id)
)`);

// Model to represent a product
class Product {
  constructor(name, price, client_id) {
    this.name = name;
    this.price = price;
    this.client_id = client_id;
  }

  // Save a new product to the database
  save(callback) {
    db.run(
      `INSERT INTO products (name, price, client_id) VALUES (?, ?, ?)`,
      [this.name, this.price, this.client_id],
      function (err) {
        if (err) {
          console.error(err.message);
          return callback(err);
        }
        console.log(`Product ${this.name} added with ID ${this.lastID}`);
        callback(null, this.lastID);
      }
    );
  }

  // Find all products in the database
  static findAll(callback) {
    db.all(`SELECT * FROM products`, [], function (err, rows) {
      if (err) {
        console.error(err.message);
        return callback(err);
      }
      const products = rows.map(
        (row) => new Product(row.name, row.price, row.client_id)
      );
      callback(null, products);
    });
  }

  // Find a product by ID in the database
  static findById(id, callback) {
    db.get(`SELECT * FROM products WHERE id = ?`, [id], function (err, row) {
      if (err) {
        console.error(err.message);
        return callback(err);
      }
      if (!row) {
        return callback(new Error('Product not found'));
      }
      const product = new Product(row.name, row.price, row.client_id);
      callback(null, product);
    });
  }

  // Update a product in the database
  static updateById(id, name, price, client_id, callback) {
    db.run(
      `UPDATE products SET name = ?, price = ?, client_id = ? WHERE id = ?`,
      [name, price, client_id, id],
      function (err) {
        if (err) {
          console.error(err.message);
          return callback(err);
        }
        console.log(`Product with ID ${id} updated.`);
        callback(null);
      }
    );
  }

  // Delete a product from the database
  static deleteById(id, callback) {
    db.run(`DELETE FROM products WHERE id = ?`, [id], function (err) {
      if (err) {
        console.error(err.message);
        return callback(err);
      }
      console.log(`Product with ID ${id} deleted.`);
      callback(null);
    });
  }
}

module.exports = db;
