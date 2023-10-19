import { mergeResolvers } from 'npm:@graphql-tools/merge';

import { mutationResolver, mutationTypeDefs } from "./mutations/index.ts";
import { queryResolver, queryTypeDefs } from "./queries/index.ts";

export const resolverTypeDefs = [
  ...mutationTypeDefs,
  ...queryTypeDefs,
]
export const resolvers = mergeResolvers([
  queryResolver,
  mutationResolver,
])

