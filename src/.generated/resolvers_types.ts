import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Latitude: number | string;
  Longitude: number | string;
  URL: string;
  DateTimeISO: Date;
};

export type GraphQLBaseTenant = {
  id: Scalars['ID'];
  name: Scalars['String'];
  latitude?: Maybe<Scalars['Latitude']>;
  longitude?: Maybe<Scalars['Longitude']>;
  page?: Maybe<Scalars['URL']>;
  createdAt: Scalars['DateTimeISO'];
  updatedAt: Scalars['DateTimeISO'];
};

export type GraphQLTenant = GraphQLBaseTenant & {
  __typename?: 'Tenant';
  id: Scalars['ID'];
  name: Scalars['String'];
  latitude?: Maybe<Scalars['Latitude']>;
  longitude?: Maybe<Scalars['Longitude']>;
  page?: Maybe<Scalars['URL']>;
  createdAt: Scalars['DateTimeISO'];
  updatedAt: Scalars['DateTimeISO'];
  users: Array<GraphQLUser>;
};

export type GraphQLTenantInput = {
  name: Scalars['String'];
  latitude?: InputMaybe<Scalars['Latitude']>;
  longitude?: InputMaybe<Scalars['Longitude']>;
  page?: InputMaybe<Scalars['URL']>;
};

export type GraphQLTenantUpdateInput = {
  name?: InputMaybe<Scalars['String']>;
  latitude?: InputMaybe<Scalars['Latitude']>;
  longitude?: InputMaybe<Scalars['Longitude']>;
  page?: InputMaybe<Scalars['URL']>;
};

export type GraphQLBaseUser = {
  id: Scalars['ID'];
  name: Scalars['String'];
  tenantId: Scalars['ID'];
  createdAt: Scalars['DateTimeISO'];
  updatedAt: Scalars['DateTimeISO'];
};

export type GraphQLUser = GraphQLBaseUser & {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  tenantId: Scalars['ID'];
  createdAt: Scalars['DateTimeISO'];
  updatedAt: Scalars['DateTimeISO'];
  tenant: GraphQLTenant;
};

export type GraphQLUserInput = {
  name: Scalars['String'];
  tenantId: Scalars['ID'];
};

export type GraphQLUserUpdateInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type GraphQLMutation = {
  __typename?: 'Mutation';
  createTenant: GraphQLTenant;
  updateTenant: GraphQLTenant;
  deleteTenant: Scalars['Boolean'];
};


export type GraphQLMutationCreateTenantArgs = {
  input: GraphQLTenantInput;
};


export type GraphQLMutationUpdateTenantArgs = {
  id: Scalars['ID'];
  input: GraphQLTenantUpdateInput;
};


export type GraphQLMutationDeleteTenantArgs = {
  id: Scalars['ID'];
};

export type GraphQLQuery = {
  __typename?: 'Query';
  tenants: Array<GraphQLTenant>;
  tenant: GraphQLTenant;
};


export type GraphQLQueryTenantArgs = {
  id: Scalars['ID'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type GraphQLResolversTypes = {
  Latitude: ResolverTypeWrapper<Scalars['Latitude']>;
  Longitude: ResolverTypeWrapper<Scalars['Longitude']>;
  URL: ResolverTypeWrapper<Scalars['URL']>;
  DateTimeISO: ResolverTypeWrapper<Scalars['DateTimeISO']>;
  BaseTenant: GraphQLResolversTypes['Tenant'];
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Tenant: ResolverTypeWrapper<GraphQLTenant>;
  TenantInput: GraphQLTenantInput;
  TenantUpdateInput: GraphQLTenantUpdateInput;
  BaseUser: GraphQLResolversTypes['User'];
  User: ResolverTypeWrapper<GraphQLUser>;
  UserInput: GraphQLUserInput;
  UserUpdateInput: GraphQLUserUpdateInput;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Query: ResolverTypeWrapper<{}>;
};

/** Mapping between all available schema types and the resolvers parents */
export type GraphQLResolversParentTypes = {
  Latitude: Scalars['Latitude'];
  Longitude: Scalars['Longitude'];
  URL: Scalars['URL'];
  DateTimeISO: Scalars['DateTimeISO'];
  BaseTenant: GraphQLResolversParentTypes['Tenant'];
  ID: Scalars['ID'];
  String: Scalars['String'];
  Tenant: GraphQLTenant;
  TenantInput: GraphQLTenantInput;
  TenantUpdateInput: GraphQLTenantUpdateInput;
  BaseUser: GraphQLResolversParentTypes['User'];
  User: GraphQLUser;
  UserInput: GraphQLUserInput;
  UserUpdateInput: GraphQLUserUpdateInput;
  Mutation: {};
  Boolean: Scalars['Boolean'];
  Query: {};
};

export interface GraphQLLatitudeScalarConfig extends GraphQLScalarTypeConfig<GraphQLResolversTypes['Latitude'], any> {
  name: 'Latitude';
}

export interface GraphQLLongitudeScalarConfig extends GraphQLScalarTypeConfig<GraphQLResolversTypes['Longitude'], any> {
  name: 'Longitude';
}

export interface GraphQLUrlScalarConfig extends GraphQLScalarTypeConfig<GraphQLResolversTypes['URL'], any> {
  name: 'URL';
}

export interface GraphQLDateTimeIsoScalarConfig extends GraphQLScalarTypeConfig<GraphQLResolversTypes['DateTimeISO'], any> {
  name: 'DateTimeISO';
}

export type GraphQLBaseTenantResolvers<ContextType = any, ParentType extends GraphQLResolversParentTypes['BaseTenant'] = GraphQLResolversParentTypes['BaseTenant']> = {
  __resolveType: TypeResolveFn<'Tenant', ParentType, ContextType>;
  id?: Resolver<GraphQLResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<GraphQLResolversTypes['String'], ParentType, ContextType>;
  latitude?: Resolver<Maybe<GraphQLResolversTypes['Latitude']>, ParentType, ContextType>;
  longitude?: Resolver<Maybe<GraphQLResolversTypes['Longitude']>, ParentType, ContextType>;
  page?: Resolver<Maybe<GraphQLResolversTypes['URL']>, ParentType, ContextType>;
  createdAt?: Resolver<GraphQLResolversTypes['DateTimeISO'], ParentType, ContextType>;
  updatedAt?: Resolver<GraphQLResolversTypes['DateTimeISO'], ParentType, ContextType>;
};

export type GraphQLTenantResolvers<ContextType = any, ParentType extends GraphQLResolversParentTypes['Tenant'] = GraphQLResolversParentTypes['Tenant']> = {
  id?: Resolver<GraphQLResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<GraphQLResolversTypes['String'], ParentType, ContextType>;
  latitude?: Resolver<Maybe<GraphQLResolversTypes['Latitude']>, ParentType, ContextType>;
  longitude?: Resolver<Maybe<GraphQLResolversTypes['Longitude']>, ParentType, ContextType>;
  page?: Resolver<Maybe<GraphQLResolversTypes['URL']>, ParentType, ContextType>;
  createdAt?: Resolver<GraphQLResolversTypes['DateTimeISO'], ParentType, ContextType>;
  updatedAt?: Resolver<GraphQLResolversTypes['DateTimeISO'], ParentType, ContextType>;
  users?: Resolver<Array<GraphQLResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GraphQLBaseUserResolvers<ContextType = any, ParentType extends GraphQLResolversParentTypes['BaseUser'] = GraphQLResolversParentTypes['BaseUser']> = {
  __resolveType: TypeResolveFn<'User', ParentType, ContextType>;
  id?: Resolver<GraphQLResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<GraphQLResolversTypes['String'], ParentType, ContextType>;
  tenantId?: Resolver<GraphQLResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<GraphQLResolversTypes['DateTimeISO'], ParentType, ContextType>;
  updatedAt?: Resolver<GraphQLResolversTypes['DateTimeISO'], ParentType, ContextType>;
};

export type GraphQLUserResolvers<ContextType = any, ParentType extends GraphQLResolversParentTypes['User'] = GraphQLResolversParentTypes['User']> = {
  id?: Resolver<GraphQLResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<GraphQLResolversTypes['String'], ParentType, ContextType>;
  tenantId?: Resolver<GraphQLResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<GraphQLResolversTypes['DateTimeISO'], ParentType, ContextType>;
  updatedAt?: Resolver<GraphQLResolversTypes['DateTimeISO'], ParentType, ContextType>;
  tenant?: Resolver<GraphQLResolversTypes['Tenant'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GraphQLMutationResolvers<ContextType = any, ParentType extends GraphQLResolversParentTypes['Mutation'] = GraphQLResolversParentTypes['Mutation']> = {
  createTenant?: Resolver<GraphQLResolversTypes['Tenant'], ParentType, ContextType, RequireFields<GraphQLMutationCreateTenantArgs, 'input'>>;
  updateTenant?: Resolver<GraphQLResolversTypes['Tenant'], ParentType, ContextType, RequireFields<GraphQLMutationUpdateTenantArgs, 'id' | 'input'>>;
  deleteTenant?: Resolver<GraphQLResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GraphQLMutationDeleteTenantArgs, 'id'>>;
};

export type GraphQLQueryResolvers<ContextType = any, ParentType extends GraphQLResolversParentTypes['Query'] = GraphQLResolversParentTypes['Query']> = {
  tenants?: Resolver<Array<GraphQLResolversTypes['Tenant']>, ParentType, ContextType>;
  tenant?: Resolver<GraphQLResolversTypes['Tenant'], ParentType, ContextType, RequireFields<GraphQLQueryTenantArgs, 'id'>>;
};

export type GraphQLResolvers<ContextType = any> = {
  Latitude?: GraphQLScalarType;
  Longitude?: GraphQLScalarType;
  URL?: GraphQLScalarType;
  DateTimeISO?: GraphQLScalarType;
  BaseTenant?: GraphQLBaseTenantResolvers<ContextType>;
  Tenant?: GraphQLTenantResolvers<ContextType>;
  BaseUser?: GraphQLBaseUserResolvers<ContextType>;
  User?: GraphQLUserResolvers<ContextType>;
  Mutation?: GraphQLMutationResolvers<ContextType>;
  Query?: GraphQLQueryResolvers<ContextType>;
};

