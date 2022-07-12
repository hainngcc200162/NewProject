const mongoose = require('mongoose');
const url = "mongodb+srv://Ngochai09252002:hai123@cluster0.pvw9ivp.mongodb.net/MyProject?retryWrites=true&w=majority"
mongoose.connect(url, { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,}, (err) => {
    if (!err) { console.log("MongoDB Connection Succeeded"); } else {
        console.log("An Error Occured");
    }
})
require('./supplier')
require('./product');
require('./category');