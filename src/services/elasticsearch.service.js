const ElasticsearchLib = require('../lib/elasticsearch.lib')

const insertElasticsearch = async (elasticsearchData) => {
    try {
        console.log(elasticsearchData)
        // await LogLib.sendEmil(logData)
        return "success"
    }
    catch (error) {
        throw error
    }
}

module.exports = { insertElasticsearch }