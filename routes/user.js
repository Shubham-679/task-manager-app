const express = require("express");
const User = require("../model/userModel");
const router = express.Router();
const bcrypt = require('bcrypt');
const auth = require('../middlewares/auth')
const multer = require("multer");


router.get('/me' , auth , async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(201).send(users)
    } catch (error) {
        res.status(500)
    }
})

router.post('/' , async (req, res) => {
    const user = new User(req.body)
    try {
        const salt = await bcrypt.genSalt(10);  
        user.password = await bcrypt.hash(user.password , salt);
        await user.save();
        const token = await user.generateAuthToken();
        res.header('x-auth-token', token).status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
})

router.post('/login',  async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken();
        res.status(201).send({ user , token});
    } catch (e) {
        console.log(e);
        res.status(400).send(e)
    }
})

router.get('/logout', auth, async (req, res)=>{
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token != req.token)
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(400).send()
    }
})
router.patch('/me', auth, async(req, res)=>{

    const updates = Object.keys(req.body)
    
    const allowedUpdate = ['name', 'age', 'email', 'password' ]
    const isValidoperation = updates.every((update)=> allowedUpdate.includes(update))
    
    if(!isValidoperation){
        return res.status(400).send({err:"invalid updates"})
    }
    try {
        // const user = await User.findById(req.params.id)
        updates.forEach(update => req.user[update] = req.body[update])
        const salt = await bcrypt.genSalt(10);  
        req.user.password = await bcrypt.hash(req.user.password , salt);
       
        await req.user.save()
        console.log(req.user)
        // const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators:true})
        // if (!user) {
        //      return res.status(404).send()
        // }
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/me',auth,  async (req, res)=>{

    try {
        console.log("inside delete method")
        // const user = await User.findByIdAndDelete(req.user._id)
        // if(!user){
        //     res.status(404).send('user not found')
        // }
        // res.send(user)
        await req.user.remove()
        res.send(req.user)
        console.log("delete method complete")


    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public' );
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' +file.originalname )
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
router.put('/me/profileImg', auth ,  upload.single('img'), async (req, res, next) => {
    const link = req.protocol + '://' + req.get('host')
        req.user.img = link + '/public/' + req.file.filename;
        await req.user.save()
        res.send(req.user)
})


module.exports = router ;