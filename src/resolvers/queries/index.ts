import { mergeResolvers } from 'npm:@graphql-tools/merge';
import { tenantQueryResolver, tenantQueryResolverDefs } from "./tenant.ts";

export const queryTypeDefs = [
    tenantQueryResolverDefs,
]
export const queryResolver = mergeResolvers([
    tenantQueryResolver,
])