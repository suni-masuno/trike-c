/*import './common/env';
import Server from './common/server';
import routes from './routes';

export default new Server()
  .router(routes)
  .listen(process.env.PORT);*/

import Express from 'express';
import './common/env';
import * as bodyParser from 'body-parser';

const app = new Express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('*', (request, response, next) => {
  console.log(request.body);
});

app.listen(process.env.PORT);
