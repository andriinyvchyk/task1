const express = require('express');
const router = express.Router();
const cors = require('cors')
const Users = require('../models/users')
const jwt = require('jsonwebtoken');
const secretKey = 'testTusk';

router.use(cors())

router.get('/api/getbyid/users/edit/:id', cors(), async(req, res) =>{
    try{
        const subscribers = await Users.findById({ '_id': req.params.id })
        res.status(201).json(subscribers)
    }catch (err){
        res.status(500).json({ message: err.message })
    }
})
router.get('/api/get/users', cors(), async (req, res) => {
    try {
        const subscribers = await Users.find()
        res.status(201).json(subscribers)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
router.post('/api/auth', cors(), async (req, res) => {
    users = await Users.findOne({ login: req.body.login })
    try {
        if (users == null) return res.status(400).json({ success: false, msg: "Not found User" })
        else {
            if (users.password == req.body.password) {
                const token = jwt.sign(users.toJSON(), secretKey, {
                    expiresIn: 3600
                });
                res.status(201).json({
                    success: true,
                    token: 'JWT' + token,
                    users: {
                        id: users._id,
                        login: users.login
                    }
                })
            }
            else res.status(400).json({ success: false, msg: "wrong password" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

router.delete('/api/users/delete/:id', cors(), async (req, res) => {
    try {
        await Users.findByIdAndRemove(req.params.id);
        res.status(201);
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
})
router.post('/api/add/users', cors(), async (req, res) => {
    const subscriber = new Users({
        login: req.body.login,
        password: req.body.password,
        status: req.body.status
    })
    users = await Users.findOne({ login: req.body.login })
    try {
        if (users == null) {
            const newSubscriber = await subscriber.save()
            res.status(201).json(newSubscriber)
        }
        else return res.status(400).json({ message: 'login is' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})
router.patch('/api/users/edit-update/:id', cors(), async(req, res) =>{
    try {
        const subscribers = await Users.findByIdAndUpdate(req.params.id, { $set: req.body })
        res.status(201).json(subscribers)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
module.exports = router;