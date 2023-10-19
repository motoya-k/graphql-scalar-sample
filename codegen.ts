// import { CodegenConfig } from "npm:@graphql-codegen/cli@5.0.0";
import { GraphQLSchema, buildSchema, parse, print, printSchema } from "graphql";
import { GraphQLLatitude } from "graphql-scalars";
import { codegen } from "npm:@graphql-codegen/core@4.0.0";
import * as typescriptOperationsPlugin from "npm:@graphql-codegen/typescript-operations@4.0.1";
import { TypeScriptDocumentsPluginConfig } from "npm:@graphql-codegen/typescript-operations@4.0.1";
import * as typescriptResolversPlugin from "npm:@graphql-codegen/typescript-resolvers@2.7.7";
import { TypeScriptResolversPluginConfig } from "npm:@graphql-codegen/typescript-resolvers@2.7.7";
import * as typescriptPlugin from "npm:@graphql-codegen/typescript@2.8.2";
import { TypeScriptPluginConfig } from "npm:@graphql-codegen/typescript@2.8.2";
import { typeDefs } from "./src/server.ts";


const schema: GraphQLSchema = buildSchema(print(typeDefs));
const outputFile = "./src/.generated/resolvers_types.ts";
const config: Parameters<typeof codegen>[number] = {
  documents: [],
  config: {},
  filename: outputFile,
  schema: parse(printSchema(schema)),
  plugins: [
    {
      // ref: https://the-guild.dev/graphql/codegen/plugins/typescript/typescript
      typescript: {
        scalars: {
          [GraphQLLatitude.name]: "string",
        },
        typesPrefix: 'GraphQL',
      } as TypeScriptPluginConfig,
    },
    {
      // ref: https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-resolvers
      typescriptResolvers: {
        scalars: {
          [GraphQLLatitude.name]: "string",
        },
        typesPrefix: 'GraphQL',
      } as TypeScriptResolversPluginConfig,
    },
    {
      // ref: https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-operations
      typescriptOperations: {
        scalars: {
          [GraphQLLatitude.name]: "string",
        },
        strictScalars: true,
        typesPrefix: 'GraphQL',
      } as TypeScriptDocumentsPluginConfig,
    }
  ],
  pluginMap: {
    typescript: typescriptPlugin,
    typescriptResolvers: typescriptResolversPlugin,
    typescriptOperations: typescriptOperationsPlugin,
  },
};

const output = await codegen(config);
await Deno.writeFile(outputFile, new TextEncoder().encode(output));
console.log("Outputs generated!");
