var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OwnerSchema = new Schema({
    service_name: {
        type: String,
        required: true,
        unique: true
    },
    owner_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        default: "No description here.."
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postal_code: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model('owner', OwnerSchema, 'owners');