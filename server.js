require('./models/db');
var express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');
const productController = require('./controller/productController');
const supplierController = require('./controller/supplierController');
const categoryController = require('./controller/categoryController');

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.set('views', path.join(__dirname, '/views/'))
app.use(express.static(path.join(__dirname, 'public')));


app.engine('hbs', expressHandlebars({
    extname: 'hbs',
    defaultLayout: 'mainLayout',
    layoutsDir: __dirname + '/views/layouts/',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}))


app.get('/', function (req, res) {
    res.render('../views/home')
})

app.set('view engine', 'hbs');

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("Server is listening on Port 3000");
})

app.use('/product', productController);
app.use('/supplier', supplierController);
app.use('/category', categoryController);

