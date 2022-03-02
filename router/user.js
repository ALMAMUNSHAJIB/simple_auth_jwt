const router = require('express').Router();
const User =  require('../model/User');
const bcrypt =  require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/verifyToken');

router.get('/',auth, async(req, res) => {
    res.send('I am from user');
});

router.post('/signin', async(req, res) => {
    try{
        const {firstName, email, password} = req.body;
        if(!(firstName && email && password)){
            res.status(400).json({
                message: "All input is required"
            });
        }

        const oldUser = await User.findOne({email});

        if(oldUser){
            return res.status(400).json({
                message: "User already register!!"
           });
        }

        const hashPassword = await bcrypt.hash(req.body.password, 10);

        const user =  await User.create({
            firstName,
            email: email.toLowerCase(),
            password: hashPassword

        });

        //create token 
       const token = jwt.sign(
           {user_id: user._id, email},
           process.env.JWT_TOKEN,
           {
               expiresIn: '2h'
           }
       );

       user.token = token;

       res.status(201).json({
           data: user,
           message: "Insterd was success"
       })

    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "Signin failed!!"
        })
    }
});

router.post('/login', async(req, res) => {
   try{
       const {email, password} = req.body;
       if(!(email && password)){
          res.status(400).json({message: "All input required"});
       }

       const user = await User.findOne({email});
       const isValidPassword = await bcrypt.compare(password, user.password);

       if(user && isValidPassword){
           const token = jwt.sign(
               {user_id: user._id, email},
               process.env.JWT_TOKEN,
               {
                   expiresIn: '2h'
               }
           )
           user.token = token;
           res.status(200).json(user);
       }

        res.status(400).json({
           message: "Invaild Credentails"
       })


   }catch(err){
       console.log(err);
       res.status(500).json({
           message: "Authnicatied failed!!"
       });
   }
})

module.exports = router;