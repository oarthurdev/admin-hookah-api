const connection = require('../database/connection')
const md5 = require('md5')
const jwt = require('jsonwebtoken');
var uniqid = require('uniqid');
var fs = require('fs')

module.exports = {
    async verifyJWT(req, res, next){
        var token = req.headers['authorization']

        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
        
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
            console.log(err)
          if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
          
          // se tudo estiver ok, salva no request para uso posterior
          req.user_id = decoded.id;
          next();
        });
      },

    async login (req, res, next) {
        var email = req.body.email
        var pwd = req.body.password
        pwd = md5(pwd)

        if (email == "" || pwd == "") {
            return response.json({ isEmpty: true })
        } 

        const user = await connection('user')
        .where('email', email)
        .select('*')
        .first()

        if(user == undefined) {
            return res.json({ noExist: true })
        } 

        else if(email == user.email && pwd == user.password){
            const id = user.user_id
            const email = user.email

            var token = jwt.sign({ 
                user:{
                    'id': id,
                    'email': email
                }}, process.env.SECRET, {
                    expiresIn: Math.floor(Date.now() / 1000) + (60 * 60) // never expire
                })

            await connection('user')
            .update('token', token)
            .where('user_id', user.user_id)

            return res.json({ auth: true, token: token, email: user.email })
        } else {
            return res.json({ auth: false, code: 401 })
        }
    },
    
    async profile (req, res) {
        var {email, password, passwordR, passwordRR} = req.body

        if((password == '' || passwordR == '' || passwordRR == '') ||
           (password != '' || passwordR == '' || passwordRR == '')) {
            res.json(true)
        } else {
            const user = await connection('user')
            .where('email', email)
            .select('password')
            .first()

            if(md5(password) != user.password) {
                res.json({ diffPass:true })
            }
            else if(passwordR != passwordRR) {
                res.json({ diffPass2:true })
            } else {
                await connection('user')
                .update('password', md5(passwordR) )
                .where('email', email)

                res.json( true)
            }
        }
    },

    async logout (req, res) {
        var token = req.body.token
        await connection('user')
              .update('token', null)
              .where('token', token)
        res.json({ auth: false, token: null })
    },
    
    async register(request, response) {
        const {name, email, phone, password, rpassword} = request.body
        
        if(name == "" || email == "" || phone == "" || password == "" || rpassword == "" || phone == null) {
            return response.json({ empty: true})
        } else {
            const user = await connection('user')
            .where('email', email)
            .select('user_id')
            .first()

            if(!user) {
                if(rpassword == password) {
                    const register = await connection('user').insert({
                    email: email,
                    password: md5(password),
                    name: name,
                    phone: phone,
                    activated: true,
                    image: 'default.png',
                    role_id: 3
                })

                return response.json({ register })
            } else {
                return response.json({ diffPass: true})
            }
        } else {
            return response.json({ emailExist: true})
        }
    }
},
async uploadImage (req, res, next) {
    const {image, email} = req.body

    var userPicture = email


    userPicture = createSlug(userPicture)
    
    var matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');
    
    var dir = 'src/images/user/';

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    var nameFile = md5(email) + '.png'

    var fullPath = dir + '/' + nameFile

    fs.writeFile(fullPath, response.data,  
        function(err, data) {
            if (err) {
                console.log('err', err);
            }
    });

    await connection('user')
            .update('image', nameFile )
            .where('email', email)

    return res.json({ name_file: nameFile})
}
   
}