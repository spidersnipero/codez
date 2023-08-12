const express = require('express');
const jwt = require("jsonwebtoken");
const pool = require("../db");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/sign_in", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1 ", [email]);
        if (user.rows.length === 0) {
            return res.status(401).json("This email is not registered");
        }
        const hash =  bcrypt.hashSync(password+process.env.ADDON,process.env.SALT);
        const validPassword = (hash===user.rows[0].user_password);

        if (!validPassword) {
            return res.status(401).json("Invalid Credentials");
        }
        const iftoken = await pool.query("SELECT * FROM token_table WHERE user_uid = $1 ", [user.rows[0].user_uid]);
        if(iftoken.rows.length!==0){
            res.json({token:iftoken.rows[0].token});
        }
        const token = jwt.sign({email:user.rows[0].user_email,password:user.rows[0].user_password }, process.env.JWT_SECRET,{expiresIn: '20s'});
        const setToken = await pool.query("INSERT INTO token_table VALUES ($1,$2) RETURNING * ",[user.rows[0].user_uid,token]);
        res.json({token });
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
}
);

module.exports = router;