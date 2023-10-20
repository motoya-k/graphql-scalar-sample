import { codegen } from "npm:@graphql-codegen/core@4.0.0";
import * as typescriptResolversPlugin from "npm:@graphql-codegen/typescript-resolvers@2.7.7";
import { TypeScriptResolversPluginConfig } from "npm:@graphql-codegen/typescript-resolvers@2.7.7";
import * as typescriptPlugin from "npm:@graphql-codegen/typescript@2.8.2";
import { TypeScriptPluginConfig } from "npm:@graphql-codegen/typescript@2.8.2";
import { GraphQLSchema, buildSchema, parse, printSchema } from "npm:graphql@16.8.1";

const typeDefs = /* GraphQL */`
  type User {
    id: ID!
    name: String!
    age: Int!
  }
  type Query {
    users: [User!]!
    user(id: ID!): User
  }
  type Mutation {
    createUser(name: String!, age: Int!): User!
  }
`

const schema: GraphQLSchema = buildSchema(typeDefs);
const outputFile = "./resolvers_types.ts";
const typescriptPluginConfig: TypeScriptPluginConfig = {}
const typescriptResolversPluginConfig: TypeScriptResolversPluginConfig = {}
const config: Parameters<typeof codegen>[number] = {
  documents: [],
  config: {},
  filename: outputFile,
  schema: parse(printSchema(schema)),
  plugins: [
    {
      // ref: https://the-guild.dev/graphql/codegen/plugins/typescript/typescript
      typescript: typescriptPluginConfig,
    },
    {
      // ref: https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-resolvers
      typescriptResolvers: typescriptResolversPluginConfig,
    },
  ],
  pluginMap: {
    typescript: typescriptPlugin,
    typescriptResolvers: typescriptResolversPlugin,
  },
};

const output = await codegen(config);
await Deno.writeFile(outputFile, new TextEncoder().encode(output));
console.log("Outputs generated! 🚀");
