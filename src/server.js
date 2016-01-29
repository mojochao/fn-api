import Express from 'express';
import GraphHTTP from 'express-graphql';
import Schema from './schema';

// Define server configuration.

const APP_PORT = 3000;

// Create server.

const app = Express();
app.use('/graphql', GraphHTTP({
  schema: Schema,
  pretty: true,
  graphiql: true
}));

// Start server.

app.listen(APP_PORT, ()=> {
  console.log(`App listening on port ${APP_PORT}`);
});
