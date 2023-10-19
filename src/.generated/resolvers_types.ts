import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Latitude: string;
};

export type GraphQLQuery = {
  __typename?: 'Query';
  ping: Scalars['String'];
};

export type GraphQLTenant = {
  __typename?: 'Tenant';
  id: Scalars['ID'];
  name: Scalars['String'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
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
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Tenant: ResolverTypeWrapper<GraphQLTenant>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type GraphQLResolversParentTypes = {
  Latitude: Scalars['Latitude'];
  Query: {};
  String: Scalars['String'];
  Tenant: GraphQLTenant;
  ID: Scalars['ID'];
  Float: Scalars['Float'];
  Boolean: Scalars['Boolean'];
};

export interface GraphQLLatitudeScalarConfig extends GraphQLScalarTypeConfig<GraphQLResolversTypes['Latitude'], any> {
  name: 'Latitude';
}

export type GraphQLQueryResolvers<ContextType = any, ParentType extends GraphQLResolversParentTypes['Query'] = GraphQLResolversParentTypes['Query']> = {
  ping?: Resolver<GraphQLResolversTypes['String'], ParentType, ContextType>;
};

export type GraphQLTenantResolvers<ContextType = any, ParentType extends GraphQLResolversParentTypes['Tenant'] = GraphQLResolversParentTypes['Tenant']> = {
  id?: Resolver<GraphQLResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<GraphQLResolversTypes['String'], ParentType, ContextType>;
  latitude?: Resolver<GraphQLResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<GraphQLResolversTypes['Float'], ParentType, ContextType>;
  createdAt?: Resolver<GraphQLResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<GraphQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GraphQLResolvers<ContextType = any> = {
  Latitude?: GraphQLScalarType;
  Query?: GraphQLQueryResolvers<ContextType>;
  Tenant?: GraphQLTenantResolvers<ContextType>;
};

