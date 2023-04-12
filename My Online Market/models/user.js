const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    // year: {
    //     type: Number,
    //     required: true,
    //     // min: 1,
    //     // max: 4,
    // },
    password: {
        type: String,
        required: true,
    },
    cart: {
        items: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: 'Product'
                }
            }
        ]
    }
});


module.exports = mongoose.model('User', userSchema);