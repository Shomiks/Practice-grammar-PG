import { User } from "firebase";
import { history } from "lib/history";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import { ErrorResponse, onError } from "apollo-link-error";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { API_URL } from "lib/consts";

import _ from "lodash";
import { useEffect, useState } from "react";
import { firebaseApp } from "lib/firebase";

export const useApollo = () => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  );

  useEffect(
    () => firebaseApp.auth().onAuthStateChanged(user => setCurrentUser(user)),
    []
  );

  const errorLink = onError(({ networkError }: ErrorResponse): void => {
    // 401 is unauthenticated, i.e. logged out. Therefore redirect to login page
    if (_.get(networkError, "statusCode") === 401) {
      // redirect to login
      const loginPage = "/login";

      const { pathname } = history.location;

      // On a page multiple Graphql queries could be triggered. Each of them failing because of status 401 error results in execution of this code
      // The first one will set the nextPage parameter. The other ones are not allowed to overwrite the pathname because this is already the login route
      if (pathname.startsWith(loginPage)) {
        return;
      }

      history.push(loginPage);
    }
  });

  const authLink = setContext(async (_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: currentUser && currentUser.uid
      }
    };
  });

  const uriLink = createHttpLink({
    uri: API_URL
  });

  const link = ApolloLink.from([authLink, errorLink, uriLink]);

  const client: ApolloClient<any> = new ApolloClient({
    link,
    cache: new InMemoryCache()
  });

  return { client };
};
