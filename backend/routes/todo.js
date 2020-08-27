const express = require("express");
const router = express.Router();

const Task = require("../models/Task");
const auth = require("../middleware/token")
//Post todoitem to a category

router.post("/:cate_id", auth, async (req, res) => {
            try {
                        const { item } = req.body;
                        const todo = await Task.findOne({ user: req.user.id })

                        const cateIndex = todo.task.map(cate => cate._id).indexOf(req.params.cate_id)

                        todo.task[cateIndex].todos.push({
                                    item
                        })
                        const send = todo.task[cateIndex].todos;
                        //check unfinished  

                        await todo.save();
                        const unfinished = todo.task[cateIndex].todos.filter(to => !to.completed)
                        todo.task[cateIndex].unfinished = unfinished.length
                        await todo.save()

                        return res.json({
                                    send
                        })
            }
            catch (e) {
                        console.error(e)
                        res.status(500).json({
                                    msg: "Server Error"
                        })
            }
})

router.delete("/:cate_id/:todo_id", auth, async (req, res) => {
            try {
                        const todo = await Task.findOne({ user: req.user.id })

                        const cateIndex = todo.task.map(cate => cate._id).indexOf(req.params.cate_id)

                        const todoIndex = todo.task[cateIndex].todos.map(to => to._id).indexOf(req.params.todo_id)

                        todo.task[cateIndex].todos.splice(todoIndex, 1);

                        console.log(todoIndex, cateIndex);

                        await todo.save();

                        return res.json({
                                    todo
                        })
            }
            catch (e) {
                        console.error(e)
                        return res.status(500).json({
                                    msg: "Server Error"
                        })
            }
})


router.put("/:cate_id/:todo_id", auth, async (req, res) => {
            try {
                        const todo = await Task.findOne({ user: req.user.id })

                        const cateIndex = todo.task.map(cate => cate._id).indexOf(req.params.cate_id)

                        const todoIndex = todo.task[cateIndex].todos.map(to => to._id).indexOf(req.params.todo_id)

                        todo.task[cateIndex].todos[todoIndex].completed = !todo.task[cateIndex].todos[todoIndex].completed;

                        const send = todo.task[cateIndex].todos[todoIndex]

                        await todo.save();
                        const unfinished = todo.task[cateIndex].todos.filter(to => !to.completed)
                        todo.task[cateIndex].unfinished = unfinished.length
                        await todo.save()
                        return res.json({
                                    send
                        })
            }
            catch (e) {
                        console.error(e)
                        return res.status(500).json({
                                    msg: "Server Error"
                        })
            }
})

router.get("/today", auth, async (req, res) => {
            try {

                        const todo = await Task.findOne({ user: req.user.id })

                        const cateIndex = todo.task.filter(cate => cate.Date.toString().slice(4, 15) == Date().toString().slice(4, 15)
                        )


                        return res.json({
                                    cateIndex
                        })
            }
            catch (e) {
                        console.error(e)
                        res.status(500).json({
                                    msg: "Server Error"
                        })
            }
})

module.exports = router;
