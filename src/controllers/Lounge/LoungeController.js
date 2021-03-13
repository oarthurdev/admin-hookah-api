const connection = require('../../database/connection')

require("dotenv-safe").config()

module.exports = {
    async register(request, response) {
        const {loungeName, loungeDescription, address, phone, token} = request.body

        const user = await connection('[dbo].[user]')
                           .where('token', token)
                           .select('user_id')
                           .first()

        const register = await connection('store').insert({
            user_id: user.user_id,
            name: loungeName,
            description: loungeDescription,
            address: address,
            phone: phone,
            reviews: 0
        })
        
        return response.json({ register })
    }
}