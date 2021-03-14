const connection = require('../database/connection')
const md5 = require('md5')

require("dotenv-safe").config()
const jwt = require('jsonwebtoken')

module.exports = {
    async dashboard (req, res, next) {
        let token = req.body.token

        try {
            const user = await connection('[dbo].[user]')
            .where('token', token)
            .select('user_id')
            .first()

            const countLounge = await connection('[dbo].[store]')
                            .where('user_id', user.user_id)
                            .count('user_id')
                            .first()

            return res.json({ count: countLounge })
        } catch (e) {
            res.status(500).send({ message: 'Failed to get infos about lounges.' });
        }
    }
}