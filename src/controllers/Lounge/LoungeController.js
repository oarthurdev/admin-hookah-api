const connection = require('../../database/connection')

require("dotenv-safe").config()

module.exports = {
    async getAll (req, res, next) {
        let token = req.body.token

        try {
            const user = await connection('user')
            .where('token', token)
            .select('user_id')
            .first()

            const lounge = await connection('store')
                            .where('user_id', user.user_id)
                            .select(['store_id', 'name'])
                
            return res.json({ lounge: lounge })
        } catch (e) {
            res.status(500).send({ code: 404, message: 'Failed to get your lounges.' });
        }
    },
    
    async register(request, response) {
        const {loungeName, loungeDescription, address, phone, products, token} = request.body

        let productsForSale = "";
        products.forEach(element => {
            productsForSale += element.text + ','
        });

        const user = await connection('user')
                           .where('token', token)
                           .select('user_id')
                           .first()

        console.log(user)
        console.log(token)
            const register = await connection('store').insert({
            user_id: user.user_id,
            name: loungeName,
            description: loungeDescription,
            address: address,
            phone: phone,
            product: productsForSale,
            reviews: 0
        })
        
            return response.json({ success: true })
    }
}