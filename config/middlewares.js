const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors')

module.exports = app => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(express.static(__dirname + '/public'));
  app.use('/uploads', express.static('uploads'));
 app.use(cors());
}
