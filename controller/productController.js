const express = require('express');
const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const Supplier = mongoose.model('Supplier');
const Category = mongoose.model('Category');
const router = express.Router();

router.get("/addproduct", (req, res) => {
    Supplier.find(function (err, supplier) {
        Category.find(function(err, category) {
         res.render("product/addOrEdit", {
            viewTitle: "Insert Employee",
            supplier: supplier,
            category: category,
        })
    })
})
})

router.post("/addproduct", (req, res) => {
    if (req.body._id == "") {
        insertRecord(req, res);
    }
    else {
        updateRecord(req, res);
    }
})

function insertRecord(req, res) {
    var product = new Product();
    product.name = req.body.name;
    product.category = req.body.category;
    product.supplier = req.body.supplier;
    product.price = req.body.price;
    product.description = req.body.description;

    product.save((err, doc) => {
        if (!err) {
            res.redirect('/product');
        }
        else {
            if (err.name == "ValidationError") {
                handleValidationError(err, req.body);
                res.render("product/addOrEdit", {
                    viewTitle: "Insert Product",
                    product: req.body
                })
            }
            console.log("Error occured during record insertion" + err);
        }
    })
}

function updateRecord(req, res) {
    Product.findOneAndUpdate({ _id: req.body._id, }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.redirect('/product');
        }
        else {
            if (err.name == "ValidationError") {
                handleValidationError(err, req.body);
                res.render("product/addOrEdit", {
                    viewTitle: 'Update product',
                    product: req.body
                });
            }
            else {
                console.log("Error occured in Updating the records" + err);
            }
        }
    })
}

router.get('/', (req, res) => {
    Product.find((err, docs) => {
        if (!err) {
            res.render("product/list", {
                list: docs
            })
        }
    })
})

router.get('/:id', (req, res) => {
    Product.findById(req.params.id, (err, doc) => {
        Supplier.find(function(err, supplier) {
            Category.find(function(err, category) {
            res.render("product/addOrEdit", {
                viewTitle: "Update Product",
                product: doc,
                supplier: supplier,
                category: category,
            })
    })
})
})
})

router.get('/delete/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/product');
        }
        else {
            console.log("An error occured during the Delete Process" + err);
        }
    })
})

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'name':
                body['nameError'] = err.errors[field].message;
                break;
            case 'supplier':
                body['supplierError'] = err.errors[field].message;
                break;
            
            default:
                break;
        }
    }
}

module.exports = router;