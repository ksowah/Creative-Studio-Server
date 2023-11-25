import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createServer } from 'http';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import MongoDB from "./config"
import {resolvers} from './apollo';
import dotenv from 'dotenv';
import { typeDefs } from "./apollo"

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const schema = makeExecutableSchema({ typeDefs, resolvers });

const httpServer = createServer(app);

const server = new ApolloServer({
    schema,
    context: ({ req }) => ({ req }),
    persistedQueries: false,
    plugins: [
        // Proper shutdown for the HTTP server.
        // @ts-ignore
        ApolloServerPluginDrainHttpServer({ httpServer }),
    
        // Proper shutdown for the WebSocket server.
        {
          async serverWillStart() {
            return {
              async drainServer() {
                await serverCleanup.dispose();
              },
            };
          },
        },
      ],
});

const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

const serverCleanup = useServer({ schema }, wsServer);

  async function startServer() {
    await server.start();
  
    server.applyMiddleware({ app });
  
    MongoDB();

    const PORT = process.env.PORT || 4000; 

    httpServer.listen({ port: PORT }, () =>
      console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`)
    );
  }

  startServer();
