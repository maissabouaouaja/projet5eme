const sqlite3 = require('sqlite3').verbose();

// Connect to the database
let db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  }
  console.log('Database connected.');
});

// Create the client table
db.run(`CREATE TABLE IF NOT EXISTS clients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  balance REAL
)`);

// Model to represent a client
class Client {
  constructor(name, balance) {
    this.name = name;
    this.balance = balance;
  }

  // Save a new client to the database
  save(callback) {
    db.run(`INSERT INTO clients (name, balance) VALUES (?, ?)`,
      [this.name, this.balance], function(err) {
        if (err) {
          console.error(err.message);
          return callback(err);
        }
        console.log(`Client ${this.name} added with ID ${this.lastID}`);
        callback(null, this.lastID);
      });
  }

  // Find all clients in the database
  static findAll(callback) {
    db.all(`SELECT * FROM clients`, [], function(err, rows) {
      if (err) {
        console.error(err.message);
        return callback(err);
      }
      const clients = rows.map(row => new Client(row.name, row.balance));
      callback(null, clients);
    });
  }

  // Find a client by ID in the database
  static findById(id, callback) {
    db.get(`SELECT * FROM clients WHERE id = ?`, [id], function(err, row) {
      if (err) {
        console.error(err.message);
        return callback(err);
      }
      if (!row) {
        return callback(new Error('Client not found'));
      }
      const client = new Client(row.name, row.balance);
      callback(null, client);
    });
  }

  // Update a client in the database
  static updateById(id, name, balance, callback) {
    db.run(`UPDATE clients SET name = ?, balance = ? WHERE id = ?`,
      [name, balance, id], function(err) {
        if (err) {
          console.error(err.message);
          return callback(err);
        }
        console.log(`Client with ID ${id} updated.`);
        callback(null);
      });
  }

  // Delete a client from the database
  static deleteById(id, callback) {
    db.run(`DELETE FROM clients WHERE id = ?`, [id], function(err) {
      if (err) {
        console.error(err.message);
        return callback(err);
      }
      console.log(`Client with ID ${id} deleted.`);
      callback(null);
    });
  }
}

module.exports = db;
