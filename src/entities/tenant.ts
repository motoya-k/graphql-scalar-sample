export type { GraphQLTenant } from "../.generated/resolvers_types.ts";
export type { TenantEntity };

export const TenantSchema = /* GraphQL */`
    type Tenant {
        id: ID!
        name: String!
        latitude: Float!
        longitude: Float!
        createdAt: String!
        updatedAt: String!
    }
`

class TenantEntity {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;

    constructor({ id, name, createdAt, updatedAt }: TenantEntity) {
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}


export default TenantEntity;
