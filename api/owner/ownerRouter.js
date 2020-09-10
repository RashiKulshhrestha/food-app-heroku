const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check,validationResult } = require('express-validator');
const authOwner = require('../../middleware/authOwner');
const authUser = require('../../middleware/authUser');

const Owner = require('./ownerModel');
const Order = require('../order/orderModel')

// @route   Post api/owners
// @desc    Signup Owner
// @access  Public
router.post("/",
[
    check("service_name","Service Name field is required.").not().isEmpty(),
    check("owner_name","Owner Name field is required.").not().isEmpty(),
    check("email", "Email field is required.").isEmail(),
    check("mobile", "Mobile Number is required.").isLength({ min:10 ,max:10 }),
    check("password", "Password must be at least 8 characters.").isLength({ min:8 }),
    check("address", "Address field is required.").not().isEmpty(),
    check("city", "City field is required.").not().isEmpty(),
    check("postal_code", "Postal Code must be of 6 digits.").isLength({ min:6 ,max:6 })
],
async (req,res)=> {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { 
        service_name,
        owner_name,
        email,
        mobile,
        password,
        address,
        city,
        postal_code
    } = req.body;

    try {
        let owner = await Owner.findOne({ email });

        if(owner) {
            return res
            .status(400)
            .json({ errors: [{ msg: "Owner already exists."}] });
        }

        owner = new Owner({
            service_name,
            owner_name,
            email,
            mobile,
            password,
            address,
            city,
            postal_code
        });

        const salt = await bcrypt.genSalt(10);

        owner.password = await bcrypt.hash(password, salt);

        await owner.save();

        const payload = {
            owner: {
                id:owner.id
            },
        };

        jwt.sign(
            payload,
            config.get("jwtSecret"),
            { expiresIn: 360000 },
            (err, token) => {
                if(err) throw err;

                res.json({ token });
            }
        );
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//@route   PUT api/owners/:owner_id
//@desc    Add the description of meal
//@access  Private

router.put(
    "/:_id",
    async (req, res) => {
        try {
            const owner = await Owner.findOneAndUpdate({_id:req.params._id},
                {
                    $set:{
                        description: req.body.description
                    }
                });
            console.log(owner);
            await owner.save();

            res.send(owner);
        }
        catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

//@route   Get api/owners
//@desc    Get the list of owners
//@access  Private

router.get("/", async (req, res) => {
    //const { service_name, description}=req.body;
    try {
      const owners = await Owner.find({});
      res.json(owners);
    }
    catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
//@route   Get api/owners/:id

router.get("/:email",
async (req, res) => {
    try{
        const getowner = await Owner.findOne({email: req.params.email},{"_id":1});
        res.json(getowner);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//@route   Get api/owners/:_id/order
//desc     Get the orders of one owner
//access   Private
router.get("/:_id/order",
async (req, res) => {
    try{
        const orders = await Order.find({ ownerId : req.params._id});
        console.log(req.owner.name);
        res.json(orders);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//@route   Delete api/owners/:_id/
//desc     Delete one owner
//access   Public
router.delete("/:_id",
async (req, res) => {
    try{
        await Owner.findOneAndDelete(req.params.id);
        res.json({msg: "Owner deleted"})
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;