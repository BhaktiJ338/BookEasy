const express = require('express')
const cors = require('cors')
const { default: mongoose } = require('mongoose')
const User = require('./models/User')
const Place = require('./models/Place')
const Booking = require('./models/Booking')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const jwt = require('jsonwebtoken')
require('dotenv').config()
const download = require('image-downloader');
const fs = require('fs');
const { resolve } = require('path')
const mime = require('mime-types');

const app = express()
const bcryptSalt = bcrypt.genSaltSync(10)
const bucket = 'bookeasy-website'

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173'
}));

app.use('/uploads', express.static(__dirname+'/uploads'));

mongoose.connect(process.env.MONGO_URL,  {useNewUrlParser:true});

async function uploadToS3(path, originalFilename, mimetype){
    const client = new S3Client ({
        region:'ap-south-1',
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
        }
    })
    const parts = originalFilename.split('.');
    const ext = parts[parts.length-1];
    const newFilename = Date.now() + '.' + ext

    await client.send(new PutObjectCommand({
        Bucket: bucket,
        Key: newFilename,
        Body: fs.readFileSync(path),
        ContentType: mimetype,
        ACL: 'public-read'
    }))

    return `https://${bucket}.s3.amazonaws.com/${newFilename}`;
}

function getUserDataUsingToken(req){
    return new Promise((resolve, reject)=>{
        jwt.verify(req.cookies.token, process.env.JWT_SECRET, {}, (err, user)=>{
            if(err) throw err;
            resolve(user)
        })
    })
}

app.post('/api/register', async(req,res)=>{
    mongoose.connect(process.env.MONGO_URL,  {useNewUrlParser:true});
    const {name, email, password} = req.body
    try{
        const user = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password, bcryptSalt)
        })
        res.json(user)
    }
    catch(e){
        res.status(422).json(e)
    }
   
});

app.post('/api/login', async (req, res)=>{
    mongoose.connect(process.env.MONGO_URL,  {useNewUrlParser:true});
    const {email, password} = req.body
    const foundUser = await User.findOne({email})

    if(!foundUser){
        res.json('Not found')
    }
    else{
        const passok = bcrypt.compareSync(password, foundUser.password)
        if(passok){
            jwt.sign({
                email:foundUser.email, 
                id:foundUser._id
            }, process.env.JWT_SECRET, {}, (err, token)=>{
                if(err) throw err
                res.cookie('token', token).json(foundUser);
            })
            
        }
        else {
            res.status(422).json('Incorect password')
        }
    }
});

app.get('/api/profile', async(req, res)=>{
    mongoose.connect(process.env.MONGO_URL,  {useNewUrlParser:true});
    const userData = await getUserDataUsingToken(req);
    if(!userData) res.json(null); 
    const {name, email, _id} = await User.findById(userData.id)
    res.json({name, email, _id});
});

app.post('/api/logout', (req,res)=>{
    res.cookie('token', '').json(true);
})

app.post('/api/uploadByLink', async(req,res)=>{
    const {link} = req.body;
    const imageName = 'photo' + Date.now() + '.jpg'; 
    await download.image({
        url:link,
        dest: '/tmp/' + imageName
    })
    const url = await uploadToS3('/tmp/'+imageName, imageName, mime.lookup('/tmp/' + imageName))
    res.json(url);
})

const photosMiddleware = multer({dest:'/tmp'})
app.post('/api/upload', photosMiddleware.array('photos', 100), async(req, res)=>{
    mongoose.connect(process.env.MONGO_URL,  {useNewUrlParser:true});
    const uploadedFiles = [];
    for(let i=0; i<req.files.length; i++){
        const {path, originalname, mimetype} = req.files[i];
        const url = await uploadToS3(path, originalname, mimetype)
        uploadedFiles.push(url)
    }
    res.json(uploadedFiles);
})

app.route('/api/places')
.post(async(req, res)=>{
    mongoose.connect(process.env.MONGO_URL,  {useNewUrlParser:true});
    const userData = await getUserDataUsingToken(req);
    if(!userData) res.json(null)
    const {
        title, address, photos, 
        description, perks, extraInfo, 
        checkIn, checkOut, maxGuests, price
    } = req.body;
   
    const placesDoc = await Place.create({
        owner:userData.id,
        title, address, photos, 
        description, perks, extraInfo, 
        checkIn, checkOut, maxGuests, price
    })
    res.json(placesDoc);
})
.put(async(req, res)=>{
    mongoose.connect(process.env.MONGO_URL,  {useNewUrlParser:true});
    const userData = await getUserDataUsingToken(req);
    if(!userData) res.json(null)
    const {
        id, title, address, photos, 
        description, perks, extraInfo, 
        checkIn, checkOut, maxGuests, price
      } = req.body;
    
    const placeDoc = await Place.findById(id); //place id

    if(userData.id === placeDoc.owner.toString()){
        placeDoc.set({
            title, address, photos, 
            description, perks, extraInfo, 
            checkIn, checkOut, maxGuests, price
        });
        await placeDoc.save();
        res.json('ok')
    }
})
.get(async(req, res)=>{
    mongoose.connect(process.env.MONGO_URL,  {useNewUrlParser:true});
    res.json(await Place.find());
});

app.get('/api/user-places', async(req, res)=>{
    mongoose.connect(process.env.MONGO_URL,  {useNewUrlParser:true});
    const userData = await getUserDataUsingToken(req);
    if(!userData) res.json(null)
    const {id} = userData;
    res.json(await Place.find({owner:id}))
})

app.get('/api/places/:id', async(req, res)=>{
    mongoose.connect(process.env.MONGO_URL,  {useNewUrlParser:true});
    const {id} = req.params;
    res.json(await Place.findById(id))
})

app.route('/api/bookings')
.post(async(req,res)=>{
    mongoose.connect(process.env.MONGO_URL,  {useNewUrlParser:true});
    const userData = await getUserDataUsingToken(req);
    if(!userData) res.josn
    const {place, checkIn, checkOut, guests, name, phone, price} = req.body;
    Booking.create({
        place, checkIn, checkOut, guests, name, phone, price, user:userData.id
    }).then((doc)=>{
        res.json(doc);
    }).catch((err)=>{
        throw err;
    })
})
.get(async(req, res)=>{
    mongoose.connect(process.env.MONGO_URL,  {useNewUrlParser:true});
    const userData = await getUserDataUsingToken(req);
    if(!userData) res.json(null)
    res.json(await Booking.find({user:userData.id}).populate('place'))
});

app.listen(3000, ()=>{
    console.log('listening on port 3000')
});