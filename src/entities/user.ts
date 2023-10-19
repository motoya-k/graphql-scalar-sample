import { Faker, allLocales } from "faker";
import { Factory } from "fishery";
import { GraphQLDateTimeISO } from "graphql-scalars";
import { GraphQLBaseUser, GraphQLUserInput, GraphQLUserUpdateInput } from "../.generated/resolvers_types.ts";
import { Convert } from "../types/index.ts";

const faker = new Faker({
    locale: allLocales.ja,
});

let userFixtures: UserEntity[] = Factory.define<UserEntity>(({ sequence }) => ({
    id: sequence.toString(),
    name: faker.person.fullName(),
    tenantId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
})).buildList(10)

export const UserSchema = /* GraphQL */`
    interface BaseUser {
        id: ID!
        name: String!
        tenantId: ID!
        createdAt: ${GraphQLDateTimeISO.name}!
        updatedAt: ${GraphQLDateTimeISO.name}!
    }

    type User implements BaseUser {
        id: ID!
        name: String!
        tenantId: ID!
        createdAt: ${GraphQLDateTimeISO.name}!
        updatedAt: ${GraphQLDateTimeISO.name}!
        tenant: Tenant!
    }

    input UserInput {
        name: String!
        tenantId: ID!
    }

    input UserUpdateInput {
        name: String
    }
`

class UserEntityManager {
    getAll(): Promise<UserEntity[]> {
        return Promise.resolve(userFixtures);
    }
    getAllByTenantId(tenantId: string): Promise<UserEntity[]> {
        return Promise.resolve(userFixtures.filter(user => user.tenantId === tenantId));
    }
    getById(id: string): Promise<UserEntity> {
        const user = userFixtures.find(user => user.id === id);
        if (!user) throw new Error(`User ${id} not found`);
        return Promise.resolve(user);
    }
    create(data: Convert<GraphQLUserInput>): Promise<UserEntity> {
        const _data = {
            ...data,
            id: (userFixtures.length + 1).toString(),
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const user = new UserEntity(_data);
        userFixtures.push(user);
        return Promise.resolve(user);
    }
    update(id: string, data: Convert<GraphQLUserUpdateInput>): Promise<UserEntity> {
        const user = userFixtures.find(user => user.id === id);
        if (!user) throw new Error(`User ${id} not found`);
        const updatedUser = new UserEntity({
            ...data,
            ...user,
            updatedAt: new Date(),
        });
        userFixtures = userFixtures.map(user => user.id === id ? updatedUser : user);
        return Promise.resolve(updatedUser);
    }
    delete(id: string): Promise<void> {
        userFixtures = userFixtures.filter(user => user.id !== id);
        return Promise.resolve();
    }
}

class UserEntity implements Convert<GraphQLBaseUser> {
    id: string;
    name: string;
    tenantId: string;
    createdAt: Date;
    updatedAt: Date;

    public static manager = new UserEntityManager();

    constructor({ id, name, tenantId, createdAt, updatedAt }: UserEntity) {
        this.id = id;
        this.name = name;
        this.tenantId = tenantId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}


export default UserEntity;
