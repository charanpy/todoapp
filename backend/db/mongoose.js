const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongo");

const connectDB = async () => {
            await mongoose.connect(db,
                        {
                                    useNewUrlParser: true,
                                    useCreateIndex: true,
                                    useUnifiedTopology: true
                        }).then(() => {
                                    console.log('DB CONNECTED')
                        }).catch(e => console.log("Connection Failed!", e))
}
module.exports = connectDB;
