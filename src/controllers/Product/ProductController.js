const connection = require('../../database/connection')

require("dotenv-safe").config()

module.exports = {
    async getAll (req, res, next) {
        let token = req.body.token

        try {
            const user = await connection('[dbo].[user]')
            .where('token', token)
            .select('user_id')
            .first()

            const lounge = await connection('[dbo].[store]')
                            .where('user_id', user.user_id)
                            .select(['store_id', 'name'])
                
            return res.json({ lounge: lounge })
        } catch (e) {
            res.status(500).send({ code: 404, message: 'Failed to get your lounges.' });
        }
    },

    async register(request, response) {
        const {name, description, price, lounge_id} = request.body
        
        if (name == "" || description == "") {
            return response.json({ isEmpty: true })
        }

        const register = await connection('product').insert({
            store_id: 1,
            name: name,
            description: description,
            price: price,
            reviews: 0
        })
        
        return response.json({ register })
    },

    async uploadImage (req, res, next) {
        const image = req.body.image

        console.log(image)
    },
}