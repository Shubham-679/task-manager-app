const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const mongoose  = require('mongoose');
const users = require('./routes/user');
const tasks = require('./routes/task');
const cors = require('cors');
require('dotenv/config');

app.use(cors());
app.use(express.json());
app.use('/users' , users);
app.use('/tasks', tasks);
app.use('/public', express.static('public'));

app.use(express.static(path.join(__dirname, 'build')));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

mongoose.connect(process.env.mongoUri,{
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex : true,
     useFindAndModify: false
})
.then(()=>{console.log(`Connected to mongoDB`)})
.catch(()=>{console.log(`Connection failed`)})

app.listen(port, () => {
    console.log(`Server is up and running on PORT ${port}`)
})