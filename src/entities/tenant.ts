import { Faker, allLocales } from "faker";
import { Factory } from "fishery";
import { GraphQLDateTimeISO, GraphQLLatitude, GraphQLLongitude, GraphQLURL } from "graphql-scalars";
import { GraphQLBaseTenant, GraphQLTenantInput, GraphQLTenantUpdateInput } from "../.generated/resolvers_types.ts";
import { Convert } from "../types/graphql.ts";
import { BaseEntityManager } from "./common.ts";

export type { TenantEntity };
export type TenantInput = Convert<GraphQLTenantInput>;
export type TenantUpdateInput = Convert<GraphQLTenantUpdateInput>;


const faker = new Faker({
    locale: allLocales.en,
});

let tenantFixtures: TenantEntity[] = Factory.define<TenantEntity>(({ sequence }) => ({
    id: sequence.toString(),
    name: faker.company.name(),
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
    page: faker.internet.url(),
    createdAt: new Date(),
    updatedAt: new Date(),
})).buildList(10);

export const TenantSchema = /* GraphQL */`
    interface BaseTenant {
        id: ID!
        name: String!
        latitude: ${GraphQLLatitude.name}
        longitude: ${GraphQLLongitude.name}
        page: ${GraphQLURL.name}
        createdAt: ${GraphQLDateTimeISO.name}!
        updatedAt: ${GraphQLDateTimeISO.name}!
    }
    type Tenant implements BaseTenant {
        id: ID!
        name: String!
        latitude: ${GraphQLLatitude.name}
        longitude: ${GraphQLLongitude.name}
        page: ${GraphQLURL.name}
        createdAt: ${GraphQLDateTimeISO.name}!
        updatedAt: ${GraphQLDateTimeISO.name}!
        users: [User!]!
    }
    input TenantInput {
        name: String!
        latitude: ${GraphQLLatitude.name}
        longitude: ${GraphQLLongitude.name}
        page: ${GraphQLURL.name}
    }
    input TenantUpdateInput {
        name: String
        latitude: ${GraphQLLatitude.name}
        longitude: ${GraphQLLongitude.name}
        page: ${GraphQLURL.name}
    }
`

class TenantEntityManager  extends BaseEntityManager<TenantEntity> {
    getAll(): Promise<TenantEntity[]> {
        return Promise.resolve(tenantFixtures);
    }
    getById(id: string): Promise<TenantEntity> {
        const tenant = tenantFixtures.find(tenant => tenant.id === id)
        if (!tenant) throw new Error(`Tenant ${id} not found`);
        return Promise.resolve(tenant);
    }
    create(data: Convert<GraphQLTenantInput>): Promise<TenantEntity> {
        const _data = {
            ...data,
            id: (tenantFixtures.length + 1).toString(),
            latitude: data.latitude ? Number(data.latitude) : undefined,
            longitude: data.longitude ? Number(data.longitude) : undefined,
            page: data.page ? data.page : undefined,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        tenantFixtures.push(_data); 
        return Promise.resolve(_data);
    }
    update(id: string, data: Convert<GraphQLTenantUpdateInput>): Promise<TenantEntity> {
        const tenant = tenantFixtures.find(tenant => tenant.id === id)
        if (!tenant) throw new Error(`Tenant ${id} not found`);
        Object.assign(tenant, data);
        return Promise.resolve(tenant);
    }
    delete(id: string): Promise<void> {
        tenantFixtures = tenantFixtures.filter(tenant => tenant.id !== id)
        return Promise.resolve();
    }
}

class TenantEntity implements Convert<GraphQLBaseTenant> {
    id: string;
    name: string;
    latitude?: string | number
    longitude?: string | number
    page?: string;
    createdAt: Date;
    updatedAt: Date;

    public static manager = new TenantEntityManager();

    constructor({ id, name, createdAt, updatedAt, latitude, longitude, page }: TenantEntity) {
        this.id = id;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.page = page;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}


export default TenantEntity;
