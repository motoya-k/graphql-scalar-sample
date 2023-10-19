// import { CodegenConfig } from "npm:@graphql-codegen/cli@5.0.0";
import { GraphQLSchema, buildSchema, parse, print, printSchema } from "graphql";
import { codegen } from "npm:@graphql-codegen/core@4.0.0";
import * as typescriptOperationsPlugin from "npm:@graphql-codegen/typescript-operations@4.0.1";
import { TypeScriptDocumentsPluginConfig } from "npm:@graphql-codegen/typescript-operations@4.0.1";
import * as typescriptResolversPlugin from "npm:@graphql-codegen/typescript-resolvers@2.7.7";
import { TypeScriptResolversPluginConfig } from "npm:@graphql-codegen/typescript-resolvers@2.7.7";
import * as typescriptPlugin from "npm:@graphql-codegen/typescript@2.8.2";
import { TypeScriptPluginConfig } from "npm:@graphql-codegen/typescript@2.8.2";
import { scalarMapForCodegen } from "./src/graphql/scalars.ts";
import { typeDefs } from "./src/server.ts";


const schema: GraphQLSchema = buildSchema(print(typeDefs));
const outputFile = "./src/.generated/resolvers_types.ts";
const sharedPluginConfig: Pick<TypeScriptResolversPluginConfig, "scalars" | "typesPrefix"> = {
  scalars: {
    ...scalarMapForCodegen,
  },
  typesPrefix: 'GraphQL',
}
const config: Parameters<typeof codegen>[number] = {
  documents: [],
  config: {},
  filename: outputFile,
  schema: parse(printSchema(schema)),
  plugins: [
    {
      // ref: https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-operations
      typescriptOperations: {
        ...sharedPluginConfig,
        strictScalars: true,
      } as TypeScriptDocumentsPluginConfig,
    },
    {
      // ref: https://the-guild.dev/graphql/codegen/plugins/typescript/typescript
      typescript: {
        ...sharedPluginConfig,
      } as TypeScriptPluginConfig,
    },
    {
      // ref: https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-resolvers
      typescriptResolvers: {
        ...sharedPluginConfig,
      } as TypeScriptResolversPluginConfig,
    },
  ],
  pluginMap: {
    typescriptOperations: typescriptOperationsPlugin,
    typescript: typescriptPlugin,
    typescriptResolvers: typescriptResolversPlugin,
  },
};

const output = await codegen(config);
await Deno.writeFile(outputFile, new TextEncoder().encode(output));
console.log("Outputs generated! 🚀");
