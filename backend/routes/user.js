const express = require("express");
const router = express.Router();

const auth = require("../middleware/token");
const User = require("../models/User");

router.get("/me", auth, async (req, res) => {

            try {
                        const user = await User.findById({ _id: req.user.id }).select("-password")
                        console.log(user)
                        if (user) {
                                    return res.status(200).json({

                                                user
                                    })
                        }


            } catch (e) {
                        console.log(e);
                        return res.status(500).json({
                                    msg: "Server Error"
                        })
            }

})

module.exports = router;