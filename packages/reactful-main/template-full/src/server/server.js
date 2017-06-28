import fs from 'fs';
import path from 'path';
import express from 'express';
import config from 'server/config';
import serverRenderer from 'renderers/server';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import serialize from 'serialize-javascript';

const app = express();
app.enable('trust proxy');
app.use(morgan('common'));

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.locals.serialize = serialize;
app.locals.gVars = require('../../.reactful.json');

app.get('/', async function slashHandler(req, res) {
  try {
    const vars = await serverRenderer();
    res.render('index', vars);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(config.port, config.host, function listenHandler() {
  fs.writeFileSync(
    path.resolve('.reactful.json'),
    JSON.stringify(
      { ...app.locals.gVars, host: config.host, port: config.port },
      null,
      2
    )
  );

  console.info(`Running on ${config.host}:${config.port}...`);
});
