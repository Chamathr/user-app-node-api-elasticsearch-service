const { Joi, Segments } = require('celebrate');

const elasticsearchValidation = {
    insertElasticsearch: {
        [Segments.BODY]: Joi.object().keys({
            index: Joi.string().required(),
            service: Joi.string().required(),
            action: Joi.string().required(),
            data: Joi.string().required()
        })
    }
}

module.exports = { elasticsearchValidation }