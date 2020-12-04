const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    email: {
        type: String,
    },
    adminID: {
        type: String,
    },
});


adminSchema.statics.findAdmin = async function(adminID){
    const admin = await Admin.findOne({adminID});
    console.log(admin);
    if(!admin)
        return;
    return admin;
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;