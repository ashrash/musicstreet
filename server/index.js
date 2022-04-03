const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const { logger } = require('./lib/winston');
const { store } = require('./service/nftService');

const upload = multer();

const routes = require('./routes');

const app = express();
require('./config/mongodb');

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.resolve(__dirname, '../dist/')));

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/store', upload.single('file'), async (req, res) => {
  const { file } = req;
  const data = await store(file);
  return res.status(200).json(data);
});

routes(app);

// app.get('*', (req, res) => {
//   res.render('index');
// });

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
  if (error) {
    logger.error(error);
  } else {
    logger.info(`==> 🌎 Listening on port ${PORT}. Open up http://localhost:${PORT}/ in your browser.`);
  }
});
