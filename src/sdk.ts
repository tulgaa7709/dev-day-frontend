import { GraphQLClient } from "graphql-request";

import { SdkFunctionWrapper, getSdk } from "./graphql";

export interface GraphQLError extends Error {
  response: {
    errors: {
      message: string;
    }[];
  };
}

const errorHandler: SdkFunctionWrapper = (action) =>
  action().catch(async (err) => {
    const error = err.response.errors[0];
    throw new Error(error?.message);
  });

//  const { serverRuntimeConfig } = getConfig();

export const client = new GraphQLClient("http://localhost:4000/graphql");
const sdk = getSdk(client, errorHandler);

export default sdk;
