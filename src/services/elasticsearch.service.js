require('dotenv').config();
const axios = require('axios');
const ElasticsearchLib = require('../lib/elasticsearch.lib')
const ElasticsearchConfig = require('../config/elasticsearch.config')

const elasticsearchUrl = ElasticsearchConfig.ELASTICSEARCH_URL
const elasticsearchIndex = ElasticsearchConfig.ELASTICSEARCH_INDEX
const elasticsearchUsername = ElasticsearchConfig.ELASTICSEARCH_USERNAME
const elasticsearchPassword = ElasticsearchConfig.ELASTICSEARCH_PASSWORD

const createIndex = async () => {
    try {

        const requestUrl = `${elasticsearchUrl}/${elasticsearchIndex}`

        const requestConfig = {
            headers: {
                'Content-Type': 'application/json'
            },
            auth: {
                username: elasticsearchUsername,
                password: elasticsearchPassword
            }
        }
        const requestBody = {
            "settings": {
                "number_of_shards": 1,
                "number_of_replicas": 0
            },
            "mappings": {
                "properties": {
                    "index": { "type": "text" },
                    "service": { "type": "text" },
                    "action": { "type": "text" },
                    "data": { "type": "text" },
                    "timestamp": { "type": "date" }
                }
            }
        }

        const response = await axios.put(requestUrl, requestBody, requestConfig)

        if (response?.status === 200) {
            const resposeBody = {
                status: 200,
                message: 'Successfully created the index',
                body: 'Successfully created the index'
            }
            return resposeBody
        }
        else {
            const resposeBody = {
                status: 500,
                message: 'Something went wrong',
                body: 'Something went wrong'
            }
            return resposeBody
        }
    }
    catch (error) {
        console.log(error)
        throw error
    }
}

const deleteIndex = async () => {
    try {

        const requestUrl = `${elasticsearchUrl}/${elasticsearchIndex}`

        const requestConfig = {
            headers: {
                'Content-Type': 'application/json'
            },
            auth: {
                username: elasticsearchUsername,
                password: elasticsearchPassword
            }
        }

        const response = await axios.delete(requestUrl, requestConfig)

        if (response?.status === 200) {
            const resposeBody = {
                status: 200,
                message: 'Successfully deleted the index',
                body: 'Successfully deleted the index'
            }
            return resposeBody
        }
        else {
            const resposeBody = {
                status: 500,
                message: 'Something went wrong',
                body: 'Something went wrong'
            }
            return resposeBody
        }
    }
    catch (error) {
        throw error
    }
}

const insertElasticsearch = async (elasticsearchData) => {
    try {
        const resposeBody = await ElasticsearchLib.insertElasticsearch(elasticsearchData)
        return resposeBody
    }
    catch (error) {
        throw error
    }
}

const getElasticsearch = async (elasticsearchData) => {
    try {
        const resposeBody = await ElasticsearchLib.getElasticsearch(elasticsearchData)
        return resposeBody
    }
    catch (error) {
        throw error
    }
}

module.exports = { insertElasticsearch, createIndex, deleteIndex, getElasticsearch }