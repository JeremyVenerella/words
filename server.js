require('dotenv').config();
const app = require('./express');
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
    console.log('conntected to Mongo');
});

app.listen(PORT, () => {
    console.log('server is running on port 5000');
})

