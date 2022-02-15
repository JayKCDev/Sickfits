import addToCart from "./addToCart";
import checkout from "./checkout";
import { graphQLSchemaExtension } from "@keystone-next/keystone/schema";

const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: `
        type Mutation{
           addToCart(productId: ID): Cart
           checkout(token: String!): Order
        }
    `,
  resolvers: {
    Mutation: {
      addToCart,
      checkout,
    },
  },
});

export default extendGraphqlSchema;
