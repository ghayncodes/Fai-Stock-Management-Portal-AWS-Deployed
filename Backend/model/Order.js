const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Order Id: ID (unique)
// Item: String (Milk ex)  
// quantity: Number (1,2,3etc)
// Order Issue Date: Date (ex2/9/2021)
// Expected Delivery Date: Date  (ex2/9/2021)
// Order Status: String (Active, Completed, Delayed, Confirmed)  

// Define Order Schema
const orderSchema = new Schema({
    orderStatus: String,
    item:{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }, 
    quantity: {
        type: Number,
        immutable: true,
        required: true 
    },
    orderIssueDate: {
        type: Date,
        immutable: true,
        required: true,
        default: () => Date.now()
    },
    expectedDelivery: {
        type: Date,
        immutable: true,
        required: true,
    }
});

// Define Order model based on above schema and export it
module.exports = mongoose.model('Order', orderSchema);
