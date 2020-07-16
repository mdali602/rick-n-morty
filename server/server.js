/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import fs from 'fs';
import path from 'path';
import express from 'express';

import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from '../src/App';

const PORT = 8000;
const app = express();

app.use('*/$', (req, res, nex) => {
  fs.readFile(
    path.resolve('./build/index.html'),
    'utf-8',
    (err, data) => {
      if (err) {
        console.log('TCL: err', err);
        return res.status(500).send('Some Error happened');
      }
      return res.send(
        data.replace(
          '<div id="root"></div>',
          `<div id="root">${ReactDOMServer.renderToString(
            <App />,
          )}</div>`,
        ),
      );
    },
  );
});

app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.listen(PORT, () => {
  console.log(`App launched at port: ${PORT}`);
});
