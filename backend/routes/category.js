const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Task = require("../models/Task");

const auth = require("../middleware/token");
const time = require("../time/time");
//create a category for task(name for task)
router.post("/", auth, async (req, res) => {
            try {
                        const { name } = req.body;
                        console.log(req.user);

                        const cate = await Task.findOne({ user: req.user.id })
                        const emailid = await User.findById({ _id: req.user.id })

                        if (!cate) {

                                    console.log("s", emailid)
                                    const createCategoryForUser = new Task({
                                                user: req.user.id,

                                    })

                                    createCategoryForUser.task.unshift({ name: name, email: emailid.email })

                                    await createCategoryForUser.save()
                                    return res.status(200).json({
                                                createCategoryForUser
                                    })
                        }


                        cate.task.unshift({ name: name, email: emailid.email })

                        await cate.save()
                        return res.status(200).json({
                                    cate
                        })


            } catch (e) {
                        console.log(e)

                        return res.status(500).json({
                                    msg: "Server Error"
                        })
            }
})

//get all categories of user
router.get("/", auth, async (req, res) => {
            try {
                        const user = await Task.findOne({ user: req.user.id })
                        if (!user) {
                                    return res.status(404).json({
                                                error: "Please create category"
                                    })
                        }


                        return res.status(200).json(user.task)

            } catch (e) {
                        console.log(e);
                        return res.status(500).json({
                                    msg: "Server Error"
                        })
            }
})

//delete category by id

router.delete("/:id", auth, async (req, res) => {
            try {
                        const cate = await Task.findOne({ user: req.user.id })
                        const removeIndex = cate.task.map(cat => cat._id).indexOf(req.params.id)
                        cate.task.splice(removeIndex, 1)
                        await cate.save()

                        return res.status(200).json({
                                    cate
                        })
            }
            catch (e) {
                        return res.status(500).json({
                                    msg: 'Server error'
                        })
            }
})

//find category by id

router.get("/:id", auth, async (req, res) => {
            try {
                        const cate = await Task.findOne({ user: req.user.id })
                        const findCategory = cate.task.map(category => category._id).indexOf(req.params.id)

                        console.log(findCategory)

                        return res.json(
                                    cate.task[findCategory]
                        )

            } catch (e) {
                        return res.status(500).json({
                                    msg: "Server Error"
                        })
            }
})

//change name of category
router.put("/:id", auth, async (req, res) => {
            try {
                        const { name } = req.body;
                        const cate = await Task.findOne({ user: req.user.id })
                        const updateIndex = cate.task.map(category => category._id).indexOf(req.params.id);

                        cate.task[updateIndex].name = name;
                        await cate.save();
                        return res.json({
                                    cate

                        })

            }
            catch (e) {
                        console.error(e)
                        return res.status(500).json({
                                    msg: "Server Error"
                        })
            }
})





module.exports = router;