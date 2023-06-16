const Customer = require('../models/Customer')
const mongoose = require('mongoose')

/***
 * Customer routes
 * Homepage
 */

exports.homepage = async (req, res) => {
    const messages = await req.flash('info')
        const locals = {
            title: "NodeJs",
            description: "User management system"
        }
        // pagination
        let perPage = 12
        let page = req.query.page || 1

        try {
            const customers = await Customer.aggregate([{ $sort: { updatedAt: -1 }}])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec()
            const count = await Customer.count()

            res.render('index', { locals, messages, customers, current: page, pages: Math.ceil(count / perPage) })

        } catch (error) {
            console.log(error)
        }
}



// with limit
// exports.homepage = async (req, res) => {
//     const messages = await req.flash('info')
//         const locals = {
//             title: "NodeJs",
//             description: "User management system"
//         }

//         try {
//             const customers = await Customer.find({}).limit(22)
//             res.render('index', { locals, messages, customers })

//         } catch (error) {
//             console.log(error)
//         }
// }

/***
 * GET /
 * New Customer Form
 */

exports.addCustomer = async (req, res) => {
   
    const locals = {
        title: "Add New Customer",
        description: "Free User management system"
    }
    res.render('customer/add', locals)
}
/**
 * POST /
 * Create New Customer
 */
exports.postCustomer = async (req, res) => {
    console.log(req.body);
  
    const newCustomer = new Customer({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      details: req.body.details,
      tel: req.body.tel,
      email: req.body.email,
    });
  
    try {
      await Customer.create(newCustomer);
      await req.flash("info", "New customer has been added.");
  
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };
