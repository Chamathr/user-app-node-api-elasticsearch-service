const { Client } = require('@elastic/elasticsearch');
require('dotenv').config();

const client = new Client({
    node: process.env.ELASTICSEARCH_URL,
    auth: {
        apiKey: {
            username: process.env.ELASTICSEARCH_USERNAME,
            password: process.env.ELASTICSEARCH_PASSWORD,
        }
    }
});

const insertElasticsearch = async (elasticsearchData) => {
    try {
        const response = await client.index({
            index: elasticsearchData?.index,
            body: {
                timeStamp: new Date(),
                ...elasticsearchData
            }
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
        let searchQuery = {}
        const matchArr = []
        if (!elasticsearchData?.serviceKey && !elasticsearchData?.actionKey) {
            searchQuery.match_all = {}
        }
        else {
            if (elasticsearchData?.serviceKey) {
                matchArr.push(
                    {
                        match: {
                            service: elasticsearchData?.serviceKey
                        }
                    }
                )
            }
            if (elasticsearchData?.actionKey) {
                matchArr.push(
                    {
                        match: {
                            action: elasticsearchData?.actionKey
                        }
                    }
                )
            }
            searchQuery.bool = {}
            searchQuery.bool.must = matchArr
        }

        const response = await client.search({
            index: elasticsearchData?.indexKey,
            query: searchQuery,
            sort: [
                { timeStamp: 'desc' }
            ]
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
                status: 404,
                message: 'Not found',
                body: 'Not found'
            }
            return resposeBody
        }
    } catch (error) {
        throw error
    }
}

module.exports = { insertElasticsearch, getElasticsearch }