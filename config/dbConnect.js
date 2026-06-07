const mongoose = require('mongoose')

exports.dbConnect = async () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => {console.log("database connected successfully.")})
    .catch((error) => {
        console.log(error.message);
        process.exit(1);
    })
}