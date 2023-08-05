const healthCheck = async (req, res, next) => {
    try {
        const responseBody = {
            status: 200,
            message: "success",
            body: "service is working fine"
        }
        res.status(200).json(responseBody)
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

module.exports = { healthCheck }