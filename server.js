const express = require('express');
const cors = require('cors');
const app = express();
var corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware
app.use((req, res, next) => {
  console.log('middleware time log: ', Date.now());
  next();
});

const requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};
app.use(requestTime);

// simple route
app.get('/', (req, res) => {
  let responseText = 'Hello World!<br>';
  responseText += `<small>Requested at: ${req.requestTime}</small>`;
  res.send(responseText);
});

require('./app/routes/tutorial.route')(app);

// set port, and listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
