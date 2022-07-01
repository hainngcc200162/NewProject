const express = require('express');
const mongoose = require('mongoose');
const Supplier = mongoose.model('Supplier');
const router = express.Router();

router.get("/addsupplier", (req, res) => {
    res.render("supplier/spaddOrEdit", {
        viewTitle: "Insert Supplier"
    })
})

router.post("/addsupplier", (req, res) => {
    if (req.body._id == "") {
        insertRecord(req, res);
    }
    else {
        updateRecord(req, res);
    }
})

function insertRecord(req, res) {
    var supplier = new Supplier();
    supplier.spname = req.body.spname;
    supplier.spaddress = req.body.spaddress;


    supplier.save((err, doc) => {
        if (!err) {
            res.redirect('/supplier');
        }
        else {
            if (err.name == "ValidationError") {
                handleValidationError(err, req.body);
                res.render("supplier/spaddOrEdit", {
                    viewTitle: "Insert Supplier",
                    supplier: req.body
                })
            }
            console.log("Error occured during record insertion" + err);
        }
    })
}

function updateRecord(req, res) {
    Supplier.findOneAndUpdate({ _id: req.body._id, }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.redirect('/supplier');
        }
        else {
            if (err.name == "ValidationError") {
                handleValidationError(err, req.body);
                res.render("supplier/spaddOrEdit", {
                    viewTitle: 'Update supplier',
                    supplier: req.body
                });
            }
            else {
                console.log("Error occured in Updating the records" + err);
            }
        }
    })
}

router.get('/', (req, res) => {
    Supplier.find((err, docs) => {
        if (!err) {
            res.render("supplier/splist", {
                list: docs
            })
        }
    })
})

router.get('/:id', (req, res) => {
    Supplier.findById(req.params.id, (err, doc) => {
            res.render("supplier/spaddOrEdit", {
                viewTitle: "Update Supplier",
                supplier: doc 
            })
    })
})

router.get('/delete/:id', (req, res) => {
    Supplier.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/supplier');
        }
        else {
            console.log("An error occured during the Delete Process" + err);
        }
    })
})

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'spname':
                body['spnameError'] = err.errors[field].message;
                break;
            case 'spaddress':
                body['spaddressError'] = err.errors[field].message;
                break;
            
            default:
                break;
        }
    }
}

module.exports = router;