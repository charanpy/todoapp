const express = require("express");
const router = express.Router();
const User = require("../models/User");
const config = require("config");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


//register
router.post("/register", [
    check("name", "Name should be length of atleast 3 character").isLength({ min: 3 }),
    check("email", "Email is required").isEmail(),
    check("password", "Password should atleast be length of 6").isLength({ min: 6 })
], async (req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: errors.array()[0].msg
            })
        }

        const { name, email, password } = req.body;
        console.log(name, email, password)

        const checkUser = await User.findOne({ email })
        if (checkUser) {
            return res.status(400).json({
                error: "User already exist!"
            })
        }

        let user = new User({
            name,
            email,
            password
        })
        user.password = await bcrypt.hash(password, config.get("salt"))
        await user.save()
        res.json({ user })

    }
    catch (e) {
        console.log(e)
        return res.status(500).json({
            error: "Server error"
        })
    }
})

//login

router.post("/login", [
    check("email", "Please enter valid email id").isEmail(),
    check("password", "Password is required").not().isEmpty()
], async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.json({
                error: "Invalid Credentials"
            })
        }
        const payload = {
            user: {
                id: user._id
            }
        }

        //compare hash password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                error: "Invalid Credentials"
            })
        }

        //jwt
        jwt.sign(payload,
            config.get('jwtSecret'),

            { expiresIn: Date.now() + 9999 },
            (err, token) => {
                if (err) {
                    throw err
                }
                return res.json({ token, user })
            })



    } catch (e) {
        console.log(e)
        res.status(500).json({
            msg: "Server Error"
        })
    }
})

module.exports = router;