/*import './common/env';
import Server from './common/server';
import routes from './routes';

export default new Server()
  .router(routes)
  .listen(process.env.PORT);*/

import Express from 'express';
import './common/env';
import * as bodyParser from 'body-parser';
import fetch from 'node-fetch';
import cors from 'cors';

const app = new Express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.post('/api/v1/ruleSet', (request, response, next) => {
  const body = JSON.parse(Object.keys(request.body)[0]);
  console.log(body);
  fetch('http://localhost:5984/rulesets',
    {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body) },
  );
  response.sendStatus(200);
});
app.get('/api/v1/ruleSet', (request, response, next) => {
  fetch('http://localhost:5984/rulesets/_all_docs?include_docs=true&decending=true&limit=1',
    {
      method: 'get',
      headers: {
        'Content-type': 'application/json',
      }},
  ).then(couchResponse => {
    return couchResponse.json();
  }).then(json => {
    response.send(json.rows[0].doc);
  });
});

app.listen(process.env.PORT);
