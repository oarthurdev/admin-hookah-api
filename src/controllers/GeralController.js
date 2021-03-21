const connection = require('../database/connection')
const md5 = require('md5')

require("dotenv-safe").config()
const jwt = require('jsonwebtoken')

module.exports = {
    async dashboard (req, res, next) {
        let token = req.body.token
        let totalReview = 0

        try {
            const user = await connection('user')
            .where('token', token)
            .select('user_id')
            .first()

            const store = await connection('store')
            .where('user_id', user.user_id)
            .select('store_id')

            const countReview = await connection('product')
            .where('store_id', store.store_id)
            .select('reviews')

            countReview.forEach(Element => {
                totalReview += Element.reviews
            })

            const countLounge = await connection('store')
                            .where('user_id', user.user_id)
                            .count('user_id')
                            .first()

            const countProduct = await connection('product')
            .where('store_id', store.store_id)
            .count('product_id')
            .first()

            return res.json(
                { 'countLounge': countLounge,
                  'countProduct': countProduct,
                  'countReview': totalReview })
        } catch (e) {
            res.status(500).send({ message: 'Failed to get infos.' });
        }
    },

    async getPhoto (req, res, next) {
        let email = req.body.email

            const user = await connection('user')
            .where('email', email)
            .select('image')
            .first()
                
            return res.json({ profile_picture: user.image })
    },
}