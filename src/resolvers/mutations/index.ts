import { mergeResolvers } from 'npm:@graphql-tools/merge';
import { tenantMutationResolver, tenantMutationResolverDefs } from "./tenant.ts";

export const mutationTypeDefs = [
    tenantMutationResolverDefs
]
export const mutationResolver = mergeResolvers([tenantMutationResolver])
