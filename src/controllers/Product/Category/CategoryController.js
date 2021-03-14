const connection = require('../../../database/connection')
const md5 = require('md5')

require("dotenv-safe").config()
const jwt = require('jsonwebtoken')

module.exports = {
    async getCategory (req, res, next) {
        var categoryReturn = []

        try {
            const category = await connection('[dbo].[category]')
            .select(['category_id', 'name'])

            category.forEach(element => {
                categoryReturn.push({
                    value: element.category_id,
                    text: element.name
                })
            })
            return res.json({ categoryReturn })
        } catch (e) {
            res.status(500).send({code: 500, message: 'Failed to get category.' });
        }
    }
}