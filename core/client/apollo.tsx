import { ApolloClient, HttpLink, split } from "@apollo/client";
import { InMemoryCache, NormalizedCacheObject } from "@apollo/client/cache";
import { getMainDefinition } from "@apollo/client/utilities";
import fetch from "isomorphic-unfetch";
import React from "react";

const createHttpLink = (token: string) => {
  const httpLink = new HttpLink({
    uri: 'https://simple-test.hasura.app/v1/graphql',
    credentials: "include",
    // headers: { Authorization: `Bearer ${token}` },
    fetch,
  });
  return httpLink;
};

let apolloClient: ApolloClient<NormalizedCacheObject>;

export const createApolloClient = (token: string) => {
  const ssrMode = typeof window === "undefined";

  const link = !ssrMode
    ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      createHttpLink(token)
    )
    : createHttpLink(token);

  return new ApolloClient({ ssrMode, link, cache: new InMemoryCache() });
};

export const initializeApollo = (initialState = {}, token: string) => {
  const _apolloClient = apolloClient ?? createApolloClient(token);

  if (initialState) {
    const existingCache = _apolloClient.extract();

    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  if (typeof window === "undefined") {
    return _apolloClient;
  }

  if (!apolloClient) {
    apolloClient = _apolloClient;
  }

  return _apolloClient;
};

export function useApollo(initialState: any, token: string) {
  const store = React.useMemo(
    () => initializeApollo(initialState, token),
    [initialState, token]
  );
  return store;
}