const ElasticsearchService = require('../services/elasticsearch.service')

const insertElasticsearch = async (req, res, next) => {
    try {
        const response = await ElasticsearchService.insertElasticsearch(req?.body)
        const resposeBody = {
            status: response?.status,
            message: response?.message,
            body: response?.body
        }
        res.status(response?.status).json(resposeBody)
    }
    catch (error) {
        const errorBody = {
            status: 500,
            message: 'failed',
            body: error.toString()
        }
        res.status(500).json(errorBody)
    }
}

module.exports = { insertElasticsearch }