import { GraphQLMutationResolvers } from '../../.generated/resolvers_types.ts';
import { TenantMutationService } from "../../services/tenant.ts";

export const tenantMutationResolverDefs = /* GraphQL */`
    type Mutation {
        createTenant(input: TenantInput!): Tenant!
        updateTenant(id: ID!, input: TenantUpdateInput!): Tenant!
        deleteTenant(id: ID!): Boolean!
    }
`

const tenantMutationService = new TenantMutationService();
export const tenantMutationResolver  = {
    Mutation: {
        createTenant: async (_, { input }) => {
            const results = await tenantMutationService.createTenant(input);
            return {
                ...results,
                users: [],
            };
        },
        updateTenant: async (_, { id, input }) => {
            const results = await tenantMutationService.updateTenant(id, input);
            return {
                ...results,
                users: [],
            }
        },
        deleteTenant: async (_, { id }) => {
            await tenantMutationService.deleteTenant(id);
            return true;
        },
    } as Pick<GraphQLMutationResolvers, "createTenant" | "deleteTenant" | "updateTenant">
}
