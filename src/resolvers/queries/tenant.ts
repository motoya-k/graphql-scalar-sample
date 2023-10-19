import { GraphQLQueryResolvers } from "../../.generated/resolvers_types.ts";
import { TenantQueryService } from "../../services/tenant.ts";

export const tenantQueryResolverDefs = /* GraphQL */`
    type Query {
        tenants: [Tenant!]!
        tenant(id: ID!): Tenant!
    }
`

const tenantQueryService = new TenantQueryService();
export const tenantQueryResolver = {
    Query: {
        tenants: async () => {
            const results = await tenantQueryService.getAllTenants();
            return results.map(tenant => ({
                ...tenant,
                users: [],
            }));
        },
        tenant: async (_, { id }) => {
            const results = await tenantQueryService.getTenantById(id);
            return {
                ...results,
                users: [],
            }
        },
    } as Pick<GraphQLQueryResolvers, "tenants" | "tenant">
    ,
    Tenant: {
        users: async (tenant: any) => {
            return await tenantQueryService.getUsersByTenantId(tenant.id);
        }
    }
}
