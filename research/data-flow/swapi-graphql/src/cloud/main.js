/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE-examples file in the root directory of this source tree.
 */

import express from 'express';
import graphqlHTTP from 'express-graphql';
import swapiSchema from '../schema';


const app = express();

// Requests to /graphql redirect to /
app.all('/graphql', (req, res) => res.redirect('/'));

app.use('/', graphqlHTTP(() => ({
  schema: swapiSchema,
  graphiql: true
})));

app.listen(8080)

console.log(`Running on http://localhost:${8080}`)
