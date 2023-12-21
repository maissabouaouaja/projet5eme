const db = require('./models/models');

// Implementation of GraphQL resolvers
const clientResolver = {
  client: ({ id }) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM clients WHERE id = ?`, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  },
  clients: () => {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM clients`, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },
  addClient: ({ name, balance }) => {
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO clients (name, balance) VALUES (?, ?)`,
        [name, balance], function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id: this.lastID, name, balance });
          }
        });
    });
  },
  deleteClient: ({ id }) => {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM clients WHERE id = ?`, [id], function(err) {
        if (err) {
          reject(err);
        } else {
          if (this.changes === 0) {
            reject(new Error(`Client with id ${id} not found`));
          } else {
            resolve({ message: `Client with id ${id} deleted successfully` });
          }
        }
      });
    });
  }
};

module.exports = clientResolver;
