import { load } from "dotenv";
import { createSchema, createYoga } from "graphql-yoga";
import { serve } from "http/server";
import { mergeResolvers, mergeTypeDefs } from 'npm:@graphql-tools/merge';


import { entitySchema } from "./entities/index.ts";
import { scalarDefs, scalarResolvers } from "./graphql/index.ts";
import { resolverTypeDefs, resolvers } from "./resolvers/index.ts";

await load({ export: true });

export const typeDefs = mergeTypeDefs([
  scalarDefs,
  ...entitySchema,
  ...resolverTypeDefs,
]);

const yoga = createYoga({
  schema: createSchema({
    typeDefs: typeDefs,
    resolvers: mergeResolvers([
      scalarResolvers,
      resolvers,
    ])
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
