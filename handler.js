import 'babel-polyfill';
import { graphqlLambda, graphiqlLambda } from 'apollo-server-lambda';
import lambdaPlayground from 'graphql-playground-middleware-lambda';
import { makeExecutableSchema } from 'graphql-tools';
import { decodeToken } from './services/auth';
// import { schema } from './schema';
// import { resolvers } from './resolvers';
import './config/db';

import schema from './graphql/schema';
import resolvers from './graphql/resolvers';

async function auth(headers) {
  try {
    const token = headers.authorization;
    if (token != null && token.length > 20) {
      return await decodeToken(token);
    }
    return null;
  } catch (error) {
    throw error;
  }
}

const myGraphQLSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
  logger: console,
});

exports.graphqlHandler = function graphqlHandler(event, context, callback) {
  function callbackFilter(error, output) {
    // eslint-disable-next-line no-param-reassign
    output.headers['Access-Control-Allow-Origin'] = '*';
    callback(error, output);
  }

  auth(event.headers).then(user => {
    const handler = graphqlLambda({
      schema: myGraphQLSchema,
      tracing: true,
      context: {
        user,
      },
    });
    return handler(event, context, callbackFilter);
  });
};

// for local endpointURL is /graphql and for prod it is /stage/graphql
exports.playgroundHandler = lambdaPlayground({
  endpoint: process.env.REACT_APP_GRAPHQL_ENDPOINT
    ? process.env.REACT_APP_GRAPHQL_ENDPOINT
    : '/production/graphql',
});

exports.graphiqlHandler = graphiqlLambda({
  endpointURL: process.env.REACT_APP_GRAPHQL_ENDPOINT
    ? process.env.REACT_APP_GRAPHQL_ENDPOINT
    : '/production/graphql',
});
