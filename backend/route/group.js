const express = require('express');
const router = express.Router();
const cors = require('cors')
const Group = require('../models/group')


router.use(cors())

router.get('/api/get/group', cors(), async (req, res) => {
    try {
        const subscribers = await Group.find()
        res.status(201).json(subscribers)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
router.post('/api/add/group', cors(), async (req, res) => {
    group = await Group.findOne({ title: req.body.data })
    try {
        if (group == null) {
            const subscriber = new Group({
                title: req.body.data,
                users: [ req.body.user ]
            })
            const newSubscriber = await subscriber.save()
            res.status(201).json(newSubscriber)
        }
        else {
            return res.status(400).json({ success: false, msg: "is group" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})
router.get('/api/getbyid/group/edit/:id', cors(), async (req, res) => {
    try {
        const subscribers = await Group.findById({ '_id': req.params.id })
        res.status(201).json(subscribers)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
router.patch('/api/group/edit-update/:id', cors(), async (req, res) => {
    console.log(req.body)
    try {
        console.log(req.params.id)

        if(req.body.user == undefined){
            console.log('тут?')

            // const subscribers = await Group.findByIdAndUpdate(req.params.id, { $set: req.body.data })
            Group.findByIdAndUpdate(req.params.id, { $set: { title: req.body.data} })
            .then((list) => res.status(201).json(list))
            .catch((error) => console.log(error))

            // res.status(201).json(subscribers)
        }
        else{
            console.log('не тут')
            const subscribers = await Group.findByIdAndUpdate(req.params.id, { $set: { title: req.body.data} , $addToSet: { 'users': [req.body.user] }})
            res.status(201).json(subscribers)
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
router.delete('/api/group/delete/:id', cors(), async (req, res) => {
    try {
        await Group.findByIdAndRemove(req.params.id);
        res.status(201);
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
})

module.exports = router;