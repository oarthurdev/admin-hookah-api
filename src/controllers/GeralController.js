const connection = require('../database/connection')
const md5 = require('md5')

require("dotenv-safe").config()
const jwt = require('jsonwebtoken')

module.exports = {
    async dashboard (req, res, next) {
        console.log(req.headers.user_id)
        const countLounge = await connection('[dbo].[store]')
        .where('user_id', email)
        .select('count(*)')
        .first()

        return res.json({ count: countLounge })
    }
}