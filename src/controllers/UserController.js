const connection = require('../database/connection')
const md5 = require('md5')
const jwt = require('jsonwebtoken');

module.exports = {
    async verifyJWT(req, res, next){
        var token = req.headers['x-access-token'];
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
        
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
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

        const user = await connection('[dbo].[user]')
        .where('email', email)
        .select('*')
        .first()

        if(email == user.email && pwd == user.password){
            const id = user.user_id
            
            var token = jwt.sign({ id }, process.env.SECRET, {
                expiresIn: 3600 // expires in 1 hour
            })

            console.log(token)

            await connection('[dbo].[user]')
            .update('token', token)
            .where('user_id', user.user_id)

            return res.json({ auth: true, token: token, user_id: user.user_id })
        } else {
            return res.json({ auth: false, message: 500 })
        }
    },
    
    async logout (req, res) {
        var token = req.body.token
        await connection('[dbo].[user]')
              .update('token', null)
              .where('token', token)
        res.json({ auth: false, token: null })
    },
    
    async register(request, response) {
        const {email, password, phone, name} = request.body
        
        // const encryptedPassword = md5(password)
        
        const user = await connection('[dbo].[user]')
        .where('email', email)
        .select('user_id')
        .first()

        if(!user) {
            const register = await connection('user').insert({
            email: email,
            password: md5(password),
            name: name,
            phone: phone,
            activated: true
        })
        return response.json({ register })
    } else {
        return response.json({ emailExist: true})
    }
}   
}