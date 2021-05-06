const connection = require('../../database/connection')
const String = require('../../functions/string-prototypes')

var fs = require('fs')
const md5 = require('md5')
var uniqid = require('uniqid')

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
                            .select(['store_id', 'name', 'image', 'description', 'phone', 'address', 'product'])
                
            return res.json({ lounge: lounge })
        } catch (e) {
            res.status(500).send({ code: 404, message: 'Failed to get your lounges.' });
        }
    },

    async getImage (req, res, next) {
        let token = req.body.token

        try {
            const user = await connection('user')
            .where('token', token)
            .select('user_id')
            .first()

            const lounge = await connection('store')
                            .where('user_id', user.user_id)
                            .select(['image', 'name'])
                            .whereNotNull("image")
                            .groupBy("store_id")
                            .havingNotNull('image')
                            .limit(6)
            return res.json({ lounge })
        } catch (e) {
            res.status(404).send({ code: 404, message: 'Failed to get the image of lounge.' });
        }
    },

    async uploadImage (req, res, next) {
        const {image, store_id} = req.body

        console.log(req.body)
        var store_name = req.body.store_name

        store_name = createSlug(store_name)
        
        
        var matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

        if (matches.length !== 3) {
            return new Error('Invalid input string');
        }

        response.type = matches[1];
        response.data = new Buffer(matches[2], 'base64');

        var nomePasta = store_name;
        
        var dir = 'src/images/lounge/' + nomePasta;

        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }

        var nameFile = uniqid() + '.png'

        var fullPath = dir + '/' + nameFile

        fs.writeFile(fullPath, response.data,  
            function(err, data) {
                if (err) {
                    console.log('err', err);
                }
        });

        return res.json({ name_file: nameFile, nome_pasta: nomePasta})
    },
    
    async register(request, response) {
        const {name, description, address, phone, products, token, name_file} = request.body

        let productsForSale = "";

        try {
            const user = await connection('user')
                            .where('token', token)
                            .select('user_id')
                            .first()

            const register = await connection('store').insert({
                            user_id: user.user_id,
                            name: name,
                            description: description,
                            address: 'Rua Turim 235 Indaial-SC',
                            phone: phone,
                            product: products,
                            reviews: 0,
                            image: name_file,
            })
            return response.json({ success: true })
        } catch (e) {
            return response.json({ error: true })
        }
    },

    async update(request, response) {
        const {name, description, address, phone, token, name_file} = request.body

        try {
            const user = await connection('user')
            .where('token', token)
            .select('user_id')
            .first()

            await connection('store')
                            .where('user_id', user.user_id)
                            .update({
                                name: request.body.name_store,
                                description: request.body.description_store,
                                address: request.body.address_store,
                                phone: request.body.phone_store
                            })
            return response.json({success: true})
        } catch (e) {
            return response.json({error: true})
        }
    },

    async delete(request, response) {
        const store_id = request.body.store_id

        const selectLounge = await connection('store')
                                .where('store_id', store_id)
                                .select('name')
                                .first()

        const delStore = await connection('store')
                                .where('store_id', store_id)
                                .del()

        if(delStore) {
            return response.json(selectLounge)
        } else {
            return response.json({ error: true })
        }
    }
}