const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check,validationResult } = require('express-validator');

const User = require('./userModel');
const authOwner = require('../../middleware/authOwner');

// @route   Post api/users
// @desc    Signup User
// @access  Public
router.post("/",
[
    check("name","Name field is required.").not().isEmpty(),
    check("email", "Email field is required.").isEmail(),
    check("mobile", "Mobile Number is required.").isLength({ min:10 ,max:10 }),
    check("password", "Password must be at least 8 characters.").isLength({ min:8 }),
],
async (req,res)=> {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, mobile, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if(user) {
            return res
            .status(400)
            .json({ errors: [{ msg: "User already exists."}] });
        }

        user = new User({
            name,
            email,
            mobile,
            password,
         });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id:user.id
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

//@route   Get api/users
//@desc    Get the list of users
//@access  Private

router.get("/", async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    }
    catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });


  //@route   Get api/users/:email

router.get("/:email",
async (req, res) => {
    try{
        const getuser = await User.findOne({email: req.params.email},{"_id":1});
        res.json(getuser);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//@route   Delete api/users/:_id/
//desc     Delete one user
//access   Public
router.delete("/:_id",
async (req, res) => {
    try{
        await User.findOneAndDelete(req.params.id);
        res.json({msg: "User deleted"})
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});
module.exports = router;