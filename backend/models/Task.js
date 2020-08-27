const mongoose = require("mongoose");

//getTime
const time = require("../time/time");


const TaskSchema = new mongoose.Schema({
            user: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'User'
            },

            task: [
                        {
                                    name: {
                                                type: String,
                                                required: true
                                    },
                                    Date: {
                                                type: Date,
                                                default: Date.now()
                                    },
                                    unfinished: {
                                                type: Number,
                                                default: 0
                                    }, email: {
                                                type: mongoose.Schema.Types.String,
                                                ref: 'User'
                                    },
                                    todos: [{
                                                item: {

                                                            type: String
                                                },
                                                date: {
                                                            type: Date,
                                                            default: Date.now()
                                                },
                                                time: {
                                                            type: String,
                                                            default: time.getTime()
                                                },
                                                completed: {
                                                            type: Boolean,
                                                            default: false
                                                }
                                    }]
                        }
            ]
})

module.exports = Task = mongoose.model("Task", TaskSchema);
