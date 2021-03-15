const connection = require('../../database/connection')
var fs = require('fs')
const md5 = require('md5')
var uniqid = require('uniqid');

require("dotenv-safe").config()

module.exports = {
    async register(request, response) {
        const {name, description, price, category, lounge_id} = request.body
        
        if (name == "" || description == "") {
            return response.json({ isEmpty: true })
        }

        const register = await connection('product').insert({
            store_id: 1,
            category_id: category.value,
            name: name,
            description: description,
            price: price,
            reviews: 0
        })
        
        return response.json({ register })
    },

    async uploadImage (req, res, next) {
        const {image, store_id, product_name} = req.body

        var matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

        if (matches.length !== 3) {
            return new Error('Invalid input string');
        }

        response.type = matches[1];
        response.data = new Buffer(matches[2], 'base64');

        var nomePasta = store_id + '_' + product_name;
        var dir = 'src/images/product/' + nomePasta.trim();

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
    }
}