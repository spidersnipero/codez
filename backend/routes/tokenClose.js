
const express = require('express');
const jwt = require("jsonwebtoken");
const pool = require("../db");

const router = express.Router();

router.post("/sign_out", async (req, res) => {
    try {
        const {token} = req.body;
        // console.log(reg.body)
        await pool.query("delete from token_table where user_token = $1", [token]);
        res.json({done:true});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}
);

module.exports = router;