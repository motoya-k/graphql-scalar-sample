import { GraphQLDateTimeISO, GraphQLLatitude, GraphQLLongitude, GraphQLURL } from "graphql-scalars";


export const scalarDefs = /* GraphQL */ `
  scalar ${GraphQLLatitude.name} @specifiedBy(url: "${GraphQLLatitude.description}")
  scalar ${GraphQLLongitude.name} @specifiedBy(url: "${GraphQLLongitude.description}")
  scalar ${GraphQLURL.name} @specifiedBy(url: "${GraphQLURL.description}")
  scalar ${GraphQLDateTimeISO.name} @specifiedBy(url: "${GraphQLDateTimeISO.description}")
`

export const scalarResolvers = {
    [GraphQLLatitude.name]: GraphQLLatitude,
    [GraphQLLongitude.name]: GraphQLLongitude,
    [GraphQLURL.name]: GraphQLURL,
    [GraphQLDateTimeISO.name]: GraphQLDateTimeISO,
}

export const scalarMapForCodegen = {
    [GraphQLLatitude.name]: "number | string",
    [GraphQLLongitude.name]: "number | string",
    [GraphQLURL.name]: "string",
    [GraphQLDateTimeISO.name]: "Date",
}
