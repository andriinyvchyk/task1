const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const users = require('./route/users');
const group = require('./route/group');


app.use(bodyParser.json());
app.use('/', users)
app.use('/', group)

mongoose.connect('mongodb+srv://darknes:sQG9pwzh8LgQYsp3@cluster0-iczo5.mongodb.net/shop?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('database connected')
    app.listen(process.env.PORT || 3000, () => console.log(`Server start on port 3000`));
})
.catch((error) => console.log(error));




module.exports = app;