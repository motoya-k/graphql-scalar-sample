import { load } from "dotenv";
import { createSchema, createYoga } from "graphql-yoga";
import { serve } from "http/server";
import { mergeTypeDefs } from 'npm:@graphql-tools/merge';

import { GraphQLLatitude } from "graphql-scalars";

import { entitySchema } from "./entities/index.ts";

await load({ export: true });

const scalarDefs = /* GraphQL */ `
  scalar ${GraphQLLatitude.name} @specifiedBy(url: "${GraphQLLatitude.description}")
`

const QueryDefs = /* GraphQL */ `
  type Query {
    ping: String!
  }
`

export const typeDefs = mergeTypeDefs([
  scalarDefs,
  QueryDefs,
  ...entitySchema,
]);

const yoga = createYoga({
  schema: createSchema({
    typeDefs: typeDefs,
    resolvers: {
      [GraphQLLatitude.name]: GraphQLLatitude,
      Query: {
        ping: () => "pong",
      },
    },
  }),
});

if (import.meta.main) {
  serve(yoga, {
    onListen({ hostname, port }) {
      console.log(
        `Listening on http://${hostname}:${port}/${yoga.graphqlEndpoint}`
      );
    },
  });
}
