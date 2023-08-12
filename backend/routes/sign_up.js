const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = require("../db");

const router = express.Router();

router.post("/sign_up" , async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        const user  = await pool.query("SELECT * FROM users WHERE user_email = $1",[email]);
        if(user.rows.length!==0){
            return res.status(401).json("User already exists");
        }
        const hash =  bcrypt.hashSync(password+process.env.ADDON,process.env.SALT);
        const newUser = await pool.query("INSERT INTO users (user_name,user_email,user_password) VALUES ($1,$2,$3) RETURNING *",[name,email,hash]);
        const token = jwt.sign({email:newUser.rows[0].user_email }, process.env.JWT_SECRET,{expiresIn: '20s'});
        const setToken = await pool.query("INSERT INTO token_table VALUES ($1,$2) RETURNING * ",[newUser.rows[0].user_uid,token]);
        res.json({ token });
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

module.exports = router;