var express = require('express');
var router = express.Router();
const ElasticsearchController = require('../controllers/elasticsearch.controller')
const { celebrate } = require('celebrate');
const elasticsearch = require('../validations/elasticsearch.validation')

router.post('/insert', [celebrate(elasticsearch.elasticsearchValidation.insertElasticsearch)], ElasticsearchController.insertElasticsearch);

module.exports = router;
