const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');
const bcrypt = require('bcrypt');
const PORT = process.env.PORT || 3001

// ************************** Models *******************************
const Product = require('./models/product');
const User = require('./models/user');
const Collection = require('./models/collection');
const Review = require('./models/review');

// ***************** Database Connection Setup ***************************
mongoose.connect("mongodb://localhost:27017/softwareDb", {useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!!!");
    console.log(err);
  });

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

// **************** Routes **********************************


// software routes **************
app.get('/api/softwares', async(req, res) => {
    const softwares = await Product.find({});
    res.send({softwares})
})

app.get('/api/softwares/:id', async(req, res) => {
    const software = await Product.findById(req.params.id);
    res.send({software});
})

// user routes *****************
app.post('/api/register', async(req, res) => {
    const user = new User(req.body);
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    res.send({email: user.email, username: user.username, id: user._id})
})

app.post('/api/login', async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if(!user){
        res.send({error: 'No User Found!'})
        return;
    };
    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) {
        res.send({error: 'User or password does not matched!'})
        return;
    }
    res.send({email: user.email, username: user.username, id: user._id});
})

// collection routes **************
app.post('/api/collection/create', async(req, res) => {
    const newCollection = new Collection(req.body);
    await newCollection.save()
    res.send({collection: newCollection})
})

app.get('/api/collection/:id', async(req, res) => {
    const collections = await Collection.find({userId: req.params.id});
    res.send({collections: collections})
})

app.delete('/api/collection/:id', async(req, res) => {
    const removedItem = await Collection.deleteOne({softwareId: req.params.id});
    res.send({msg: 'deleted'})
})

// Review routes *********************

app.get('/api/software-reviews/:id', async(req, res) => {
    const {id} = req.params;
    const reviews = await Review.find({ softwareId: id })
    res.send({ reviews: reviews }) 
})

app.post('/api/create-review', async (req, res) => {
    const review = new Review(req.body)
    await review.save();
    res.send(review)
})

// search API *************************

app.post('/api/search', async(req, res) => {
    const {searchText, platfrom, } = req.body;
    let q = {name: searchText};
    if(platfrom) {
        q.platfrom = platform;
    }
    if(sort) {
        const softwares = await Product.find(q).sort();
    } else {
        const softwares = await Product.find(q);
    }
   
    res.send(softwares)
})

// listening to PORT ***************
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})