const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middlewere/fetchuser')

const JWT_SECRET = "ParthApp";

// Rout 1: Create a User using: POST "/api/auth/createuser". No login require 
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 charecters').isLength({ min: 5 }),
    ], async (req, res)=>{
        let status = 0; 
        // Validation error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status:status, errors: errors.array() });
        }

        // Check for unique email
        try{
            let user = await User.findOne({email: req.body.email});
            if(user){
                return res.status(400).json({ status:status, error: "sorry a user with this email alredy exists"});
            }

            var salt = await bcrypt.genSaltSync(10);
            const secPassword = await bcrypt.hashSync(req.body.password, salt);

            // Create new User
            user= await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPassword,
            });

            const data = {
                user: {
                    id:user.id
                }
            };
            const authtoken = jwt.sign(data, JWT_SECRET);
            status = 1;
            res.json({status:status, authtoken: authtoken});
        } catch (error){
            res.status(500).json({ status:status, error: "Internal server error"});
        }
})

// Rout 2: Authenticate a User using: POST "/api/auth/login". No login require 
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be blank').exists(),
    ], async (req, res)=>{
        let status = 0;
        // Validation error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status:status, errors: errors.array() });
        }

        const {email, password} = req.body;
        try{
            // Check user Exist
            let user = await User.findOne({email});
            if(!user){
                return res.status(400).json({status:status, error: "Please try to login with correct credentials"})
            }

            // Check Password
            const passwordCompare = await bcrypt.compare(password, user.password);
            if(!passwordCompare){
                return res.status(400).json({status:status, error: "Please try to login with correct credentials"})
            }

            const data = {
                user: {
                    id:user.id
                }
            };
            const authtoken = jwt.sign(data, JWT_SECRET);
            status = 1;
            res.json({status:status, authtoken: authtoken});

        } catch (error){
            res.status(500).json({ status:status, error: "Internal server error"});
        }
})

// Rout 3: Get loggedin user detail using: POST "/api/auth/getuser". No login require 
router.post('/getuser', fetchuser , async (req, res)=>{
        try{
            const userId = req.user.id;
            const user = await User.findById(userId).select("-password");
            res.json({ status: 1, user: user});
        } catch (error){
            res.status(500).json({ status:0, error: "Internal server error"});
        }
})

module.exports = router;