const ElasticsearchService = require('../services/elasticsearch.service')

const deleteIndex = async (req, res, next) => {
    try {
        const response = await ElasticsearchService.deleteIndex()
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

const createIndex = async (req, res, next) => {
    try {
        const response = await ElasticsearchService.createIndex()
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

const getElasticsearch = async (req, res, next) => {
    try {
        const response = await ElasticsearchService.getElasticsearch(req?.body)
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

module.exports = { insertElasticsearch, createIndex, deleteIndex, getElasticsearch }