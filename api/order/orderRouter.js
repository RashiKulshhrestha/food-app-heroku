const express = require('express');
const router = express.Router();
const Order = require('./orderModel');
const { check, validationResult } = require("express-validator");

//@route   Post api/order
//@desc    Order add by User
//@access  Private
// router.post(
//     "/:id",
//     [auth],
//     async (req, res ) =>{
//         const {
//             no_of_meals,
//             no_of_days,
//             total_amount,
//             status
//         } = req.body
//     try{
//         const order = await Order.findOne(req.params.id)
//         .populate("user", ["name"], "owner", ["name"])
        
        
//     }
//     }
// ) 

router.post("/",
[
    check("no_of_meals", "Please enter a valid numbers of meals.").not().isEmpty(),
    check("start_date", "Start date is required.").not().isEmpty(),
    check("end_date", "End date is required.").not().isEmpty(),
  ],
async(req,res)=>{
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{
        const { 
            no_of_meals,
            no_of_days,
            start_date,
            end_date,
            total_amount,
            user_id,
            owner_id
        } = req.body;
        
        order = new Order({
            no_of_meals,
            no_of_days,
            start_date,
            end_date,
            total_amount,
            user_id,
            owner_id
        });
        await order.save();
        res.json({ msg: "Order Successfull"})
    }
    catch(err){ 
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.get("/",
async (req, res) => {
    try{
        const orders = await Order.find();
        res.json(orders);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.get("/:id",
async (req, res) => {
    try{
        const owner = req.params.id;
        const order = await Order.find({owner_id: owner});
        res.json(order);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//@route   Get api/order/:id
//@desc    Get User's Order
//@access  Private

router.get("/:id",
 async (req, res) => {
     try{
         const user = req.params.id;
         const order = await Order.find({user: user}, {"owner":1, "no_of_meals":1, "no_of_days":1});
         res.json(order);
     }
     catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
 });

//@route   Put api/order/:id
//@desc    Update ORDER Status
//@access  Private 
router.put(
    "/:id",
    async (req, res) => {
        try {
            const order = await Order.findOneAndUpdate(req.params.id,
                {
                    $set:{
                        status: req.body.status
                    }
                });
            console.log(order);
            await order.save();

            res.send(order);
        }
        catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

module.exports = router;