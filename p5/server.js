const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const db = require('./models/models');
const clientSchema = require('./clientSchema');
const clientResolver = require('./clientResolver');
const clientRoutes = require('./routes/client');
const productRoutes = require('./routes/product');
const app = express();
const port = 5000;

// Use GraphQL to handle requests
app.use('/graphql', graphqlHTTP({
  schema: clientSchema,
  rootValue: clientResolver,
  graphiql: true
}));

// Use body-parser to parse HTTP requests
app.use(bodyParser.json());

// Implement the REST API

app.use('/api/v1/client', clientRoutes);
app.use('/api/v1/product', productRoutes);


// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});
