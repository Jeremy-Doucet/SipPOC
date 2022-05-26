import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
  /** A field whose value conforms to the standard E.164 format as specified in: https://en.wikipedia.org/wiki/E.164. Basically this is +17895551234. */
  PhoneNumber: any;
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: any;
};

/** Payload returned if login or signup is successful */
export type AuthPayload = {
  __typename?: 'AuthPayload';
  /** The current JWT token. Use in Authentication header */
  token?: Maybe<Scalars['String']>;
  /** The logged in user */
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createSession?: Maybe<Session>;
  /** Create User for an account */
  createUser?: Maybe<User>;
  deleteSession?: Maybe<Session>;
  /** Login to an existing account */
  login?: Maybe<AuthPayload>;
  /** Signup for an account */
  signup?: Maybe<AuthPayload>;
};

export type MutationCreateSessionArgs = {
  description?: Maybe<Scalars['String']>;
};

export type MutationCreateUserArgs = {
  data: UserCreateInput;
};

export type MutationDeleteSessionArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MutationSignupArgs = {
  data: SignupInput;
};

/** A User Profile */
export type Profile = {
  __typename?: 'Profile';
  createdAt: Scalars['DateTime'];
  firstName: Scalars['String'];
  /** The first and last name of a user */
  fullName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  /** Returns the currently logged in user */
  me?: Maybe<User>;
  /** Returns a session by id */
  session?: Maybe<Session>;
  /** Returns all sessions */
  sessions?: Maybe<Array<Maybe<Session>>>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type QuerySessionArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

/** A Session */
export type Session = {
  __typename?: 'Session';
  /** The API key for Tokbox */
  apiKey?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  sessionId: Scalars['String'];
  /** The token for this session */
  token?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

/** Input required for a user to signup */
export type SignupInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  profile: SignupProfileInput;
};

/** Input required for Profile Create on Signup. */
export type SignupProfileCreateInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

/** Input required for Profile on Signup. */
export type SignupProfileInput = {
  create: SignupProfileCreateInput;
};

/** Sort direction for filtering queries (ascending or descending) */
export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

/** A way to filter string fields. Meant to pass to prisma where clause */
export type StringFilter = {
  contains?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  equals?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  notIn?: Maybe<Array<Scalars['String']>>;
  startsWith?: Maybe<Scalars['String']>;
};

/** A User */
export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  profile?: Maybe<Profile>;
  roles: Array<Role>;
  updatedAt: Scalars['DateTime'];
};

/** Input to Add a new user */
export type UserCreateInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  roles?: Maybe<Array<Maybe<Role>>>;
};

/** Order users by a specific field */
export type UserOrderByInput = {
  createdAt?: Maybe<SortOrder>;
  email?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
};

/** Input to find users based other fields */
export type UserWhereInput = {
  email?: Maybe<StringFilter>;
  id?: Maybe<Scalars['Int']>;
};

/** Input to find users based on unique fields */
export type UserWhereUniqueInput = {
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;

export type LoginMutation = { __typename?: 'Mutation' } & {
  login?: Maybe<{ __typename?: 'AuthPayload' } & Pick<AuthPayload, 'token'>>;
};

export type SignupMutationVariables = Exact<{
  data: SignupInput;
}>;

export type SignupMutation = { __typename?: 'Mutation' } & {
  signup?: Maybe<
    { __typename?: 'AuthPayload' } & Pick<AuthPayload, 'token'> & {
        user?: Maybe<{ __typename?: 'User' } & Pick<User, 'id'>>;
      }
  >;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: 'Query' } & {
  me?: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'email'>>;
};

export type AllSessionsQueryVariables = Exact<{ [key: string]: never }>;

export type AllSessionsQuery = { __typename?: 'Query' } & {
  sessions?: Maybe<
    Array<
      Maybe<
        { __typename?: 'Session' } & Pick<
          Session,
          'id' | 'sessionId' | 'createdAt' | 'updatedAt' | 'description'
        >
      >
    >
  >;
};

export type CreateSessionMutationVariables = Exact<{
  description?: Maybe<Scalars['String']>;
}>;

export type CreateSessionMutation = { __typename?: 'Mutation' } & {
  createSession?: Maybe<
    { __typename?: 'Session' } & Pick<
      Session,
      'id' | 'sessionId' | 'createdAt' | 'updatedAt' | 'description'
    >
  >;
};

export type DeleteSessionMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type DeleteSessionMutation = { __typename?: 'Mutation' } & {
  deleteSession?: Maybe<
    { __typename?: 'Session' } & Pick<
      Session,
      'id' | 'sessionId' | 'createdAt' | 'updatedAt' | 'description'
    >
  >;
};

export type GetSessionQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type GetSessionQuery = { __typename?: 'Query' } & {
  session?: Maybe<
    { __typename?: 'Session' } & Pick<
      Session,
      'id' | 'sessionId' | 'createdAt' | 'updatedAt' | 'description' | 'apiKey' | 'token'
    >
  >;
};

export const LoginDocument = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
}

export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const SignupDocument = gql`
  mutation signup($data: SignupInput!) {
    signup(data: $data) {
      token
      user {
        id
      }
    }
  }
`;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSignupMutation(
  baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
}

export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<
  SignupMutation,
  SignupMutationVariables
>;
export const MeDocument = gql`
  query me {
    me {
      id
      email
    }
  }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}

export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}

export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const AllSessionsDocument = gql`
  query ALL_SESSIONS {
    sessions {
      id
      sessionId
      createdAt
      updatedAt
      description
    }
  }
`;

/**
 * __useAllSessionsQuery__
 *
 * To run a query within a React component, call `useAllSessionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllSessionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllSessionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllSessionsQuery(
  baseOptions?: Apollo.QueryHookOptions<AllSessionsQuery, AllSessionsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AllSessionsQuery, AllSessionsQueryVariables>(AllSessionsDocument, options);
}

export function useAllSessionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<AllSessionsQuery, AllSessionsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AllSessionsQuery, AllSessionsQueryVariables>(
    AllSessionsDocument,
    options
  );
}

export type AllSessionsQueryHookResult = ReturnType<typeof useAllSessionsQuery>;
export type AllSessionsLazyQueryHookResult = ReturnType<typeof useAllSessionsLazyQuery>;
export type AllSessionsQueryResult = Apollo.QueryResult<
  AllSessionsQuery,
  AllSessionsQueryVariables
>;
export const CreateSessionDocument = gql`
  mutation CREATE_SESSION($description: String) {
    createSession(description: $description) {
      id
      sessionId
      createdAt
      updatedAt
      description
    }
  }
`;
export type CreateSessionMutationFn = Apollo.MutationFunction<
  CreateSessionMutation,
  CreateSessionMutationVariables
>;

/**
 * __useCreateSessionMutation__
 *
 * To run a mutation, you first call `useCreateSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSessionMutation, { data, loading, error }] = useCreateSessionMutation({
 *   variables: {
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateSessionMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateSessionMutation, CreateSessionMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateSessionMutation, CreateSessionMutationVariables>(
    CreateSessionDocument,
    options
  );
}

export type CreateSessionMutationHookResult = ReturnType<typeof useCreateSessionMutation>;
export type CreateSessionMutationResult = Apollo.MutationResult<CreateSessionMutation>;
export type CreateSessionMutationOptions = Apollo.BaseMutationOptions<
  CreateSessionMutation,
  CreateSessionMutationVariables
>;
export const DeleteSessionDocument = gql`
  mutation DELETE_SESSION($id: ID!) {
    deleteSession(id: $id) {
      id
      sessionId
      createdAt
      updatedAt
      description
    }
  }
`;
export type DeleteSessionMutationFn = Apollo.MutationFunction<
  DeleteSessionMutation,
  DeleteSessionMutationVariables
>;

/**
 * __useDeleteSessionMutation__
 *
 * To run a mutation, you first call `useDeleteSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSessionMutation, { data, loading, error }] = useDeleteSessionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteSessionMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteSessionMutation, DeleteSessionMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteSessionMutation, DeleteSessionMutationVariables>(
    DeleteSessionDocument,
    options
  );
}

export type DeleteSessionMutationHookResult = ReturnType<typeof useDeleteSessionMutation>;
export type DeleteSessionMutationResult = Apollo.MutationResult<DeleteSessionMutation>;
export type DeleteSessionMutationOptions = Apollo.BaseMutationOptions<
  DeleteSessionMutation,
  DeleteSessionMutationVariables
>;
export const GetSessionDocument = gql`
  query GET_SESSION($id: ID!) {
    session(id: $id) {
      id
      sessionId
      createdAt
      updatedAt
      description
      apiKey
      token
    }
  }
`;

/**
 * __useGetSessionQuery__
 *
 * To run a query within a React component, call `useGetSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSessionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSessionQuery(
  baseOptions: Apollo.QueryHookOptions<GetSessionQuery, GetSessionQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetSessionQuery, GetSessionQueryVariables>(GetSessionDocument, options);
}

export function useGetSessionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetSessionQuery, GetSessionQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetSessionQuery, GetSessionQueryVariables>(
    GetSessionDocument,
    options
  );
}

export type GetSessionQueryHookResult = ReturnType<typeof useGetSessionQuery>;
export type GetSessionLazyQueryHookResult = ReturnType<typeof useGetSessionLazyQuery>;
export type GetSessionQueryResult = Apollo.QueryResult<GetSessionQuery, GetSessionQueryVariables>;
