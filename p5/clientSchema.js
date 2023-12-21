const { buildSchema } = require('graphql');

// Create a GraphQL schema
const jobSchema = buildSchema(`
  type Query {
    job(id: Int!): Client
    clients: [Client]
  }

  type Mutation {
    addClient(name: String!, balance: Float!): Client
    deleteClient(id: Int!): DeleteClientResponse
  }

  type Client {
    id: Int
    name: String
    balance: Float
  }

  type DeleteClientResponse {
    message: String
  }
`);

module.exports = jobSchema;
