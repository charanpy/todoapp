const nodemailer = require("nodemailer");

const Task = require("../models/Task");

exports.getTask = async () => {
            const Tasks = await Task.find({})
            const findCategory = Tasks.map(tasks => {
                        return (tasks.task.filter(email => {
                                    if (email.unfinished > 0 && email.Date.toString().slice(4, 15) == Date().toString().slice(4, 15)) {
                                                return email
                                    }
                        })).flat().map(mail => mail.email)
            })
            const uniqueEmail = new Set(findCategory.flat())
            const email = Array.from(uniqueEmail);
            email.map(mail => sendMail(mail))

}




// Send Mail function using Nodemailer 
const sendMail = async (mail) => {
            let mailTransporter = nodemailer.createTransport({
                        service: "gmail",
                        auth: {
                                    user: "test@gmail.com",
                                    pass: ""
                        }
            });


            let mailDetails = {
                        from: "charandp243@gmail.com",
                        to: mail,
                        subject: "Todo Task",
                        text: "Hey! You forgot to finish task"
            };



            mailTransporter.sendMail(mailDetails,
                        function (err, data) {
                                    if (err) {
                                                console.log("Error Occurs", err);
                                    } else {
                                                console.log("Email sent successfully");
                                    }
                        });
}




