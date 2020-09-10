var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
    no_of_meals: {
        type: Number,
        required: true
    },
    no_of_days: {
        type: Number,
        required: true
    },
    start_date:{
        type: Date,
        required: true
    },
    end_date:{
        type: Date,
        required: true
    },
    total_amount: {
        type: String,
    },
    status: {
        type: String,
        default: "Placed",
    },
    user_id: {
        type: String,
        required: true
    },
    owner_id: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("order", OrderSchema, "orders");