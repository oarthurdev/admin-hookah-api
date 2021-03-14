const connection = require('../../database/connection')

require("dotenv-safe").config()

module.exports = {
    async register(request, response) {
        const {loungeName, loungeDescription, address, phone, products, token} = request.body

        let productsForSale = "";
        products.forEach(element => {
            productsForSale += element.text + ','
        });

        const user = await connection('[dbo].[user]')
                           .where('token', token)
                           .select('user_id')
                           .first()

        
        try{
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
        } catch(e) {
            return response.json({ success: false })
        }
    }
}