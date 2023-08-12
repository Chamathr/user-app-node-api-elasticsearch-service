const { Client } = require('@elastic/elasticsearch');
require('dotenv').config();

const client = new Client({ node: process.env.ELASTICSEARCH_URL });

const insertElasticsearch = async (elasticsearchData) => {
    try {
        const response = await client.index({
            index: elasticsearchData?.index,
            body: elasticsearchData
        });

        const resposeBody = {
            status: 200,
            message: 'Successfully inserted',
            body: response
        }
        return resposeBody
    } catch (error) {
        throw error
    }
}

const getElasticsearch = async (elasticsearchData) => {
    try {
        const response = await client.search({
            index: elasticsearchData["index-key"],
            body: {
                query: {
                    match_all: {}
                }
            }
        });

        if (response?.hits?.hits?.length) {
            const resposeBody = {
                status: 200,
                message: 'Successfully fetched',
                body: response?.hits?.hits
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
    } catch (error) {
        throw error
    }
}

module.exports = { insertElasticsearch, getElasticsearch }