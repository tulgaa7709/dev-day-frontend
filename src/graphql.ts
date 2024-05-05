import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Blog = {
  __typename?: 'Blog';
  _id: Scalars['ID']['output'];
  category: Category;
  createdAt?: Maybe<Scalars['Float']['output']>;
  summary: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Float']['output']>;
};

export type Category = {
  __typename?: 'Category';
  _id?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Float']['output']>;
};

export type CreateBlogInput = {
  category: Scalars['String']['input'];
  summary: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateCategoryInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createBlog: Scalars['Boolean']['output'];
  createCategory: Scalars['Boolean']['output'];
  updateBlog: Scalars['Boolean']['output'];
  updateCategory: Scalars['Boolean']['output'];
};


export type MutationCreateBlogArgs = {
  blog?: InputMaybe<CreateBlogInput>;
};


export type MutationCreateCategoryArgs = {
  category?: InputMaybe<CreateCategoryInput>;
};


export type MutationUpdateBlogArgs = {
  blog?: InputMaybe<UpdateBlogInput>;
};


export type MutationUpdateCategoryArgs = {
  category?: InputMaybe<UpdateCategoryInput>;
};

export type Query = {
  __typename?: 'Query';
  getBlogList?: Maybe<Array<Blog>>;
  getCategoryList?: Maybe<Array<Category>>;
};


export type QueryGetBlogListArgs = {
  categoryId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateBlogInput = {
  _id: Scalars['String']['input'];
  category: Scalars['String']['input'];
  summary: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type UpdateCategoryInput = {
  _id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type GetBlogListQueryVariables = Exact<{
  categoryId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetBlogListQuery = { __typename?: 'Query', getBlogList?: Array<{ __typename?: 'Blog', _id: string, title: string, summary: string, updatedAt?: number | null, createdAt?: number | null, category: { __typename?: 'Category', _id?: string | null, name?: string | null } }> | null };

export type CreateBlogMutationVariables = Exact<{
  blog?: InputMaybe<CreateBlogInput>;
}>;


export type CreateBlogMutation = { __typename?: 'Mutation', createBlog: boolean };

export type GetCategoryListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoryListQuery = { __typename?: 'Query', getCategoryList?: Array<{ __typename?: 'Category', _id?: string | null, name?: string | null, updatedAt?: number | null, createdAt?: number | null }> | null };

export type CreateCategoryMutationVariables = Exact<{
  category?: InputMaybe<CreateCategoryInput>;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: boolean };


export const GetBlogListDocument = gql`
    query getBlogList($categoryId: String) {
  getBlogList(categoryId: $categoryId) {
    _id
    title
    summary
    category {
      _id
      name
    }
    updatedAt
    createdAt
  }
}
    `;
export const CreateBlogDocument = gql`
    mutation createBlog($blog: CreateBlogInput) {
  createBlog(blog: $blog)
}
    `;
export const GetCategoryListDocument = gql`
    query getCategoryList {
  getCategoryList {
    _id
    name
    updatedAt
    createdAt
  }
}
    `;
export const CreateCategoryDocument = gql`
    mutation createCategory($category: CreateCategoryInput) {
  createCategory(category: $category)
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getBlogList(variables?: GetBlogListQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetBlogListQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetBlogListQuery>(GetBlogListDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getBlogList', 'query', variables);
    },
    createBlog(variables?: CreateBlogMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateBlogMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateBlogMutation>(CreateBlogDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createBlog', 'mutation', variables);
    },
    getCategoryList(variables?: GetCategoryListQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetCategoryListQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCategoryListQuery>(GetCategoryListDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCategoryList', 'query', variables);
    },
    createCategory(variables?: CreateCategoryMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateCategoryMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateCategoryMutation>(CreateCategoryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createCategory', 'mutation', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;