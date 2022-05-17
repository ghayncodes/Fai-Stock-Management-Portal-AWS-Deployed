const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Item Id: ID (unique)
// Item Name: String (Milk ex)
// QuantityOnShelf: Number (1,2,3etc)
// QuantityOnWarehouse: Number (1,2,3etc)
// ThresholdOnShelf: Number (ConstantNumber)
// ThresholdOnWarehouse: Number (ConstantNumber)
// ItemSold: Number (How many times it got sold)  //

// Define Item Schema
const itemSchema = new Schema({
    name: String,
    quantityOnShelf: {
        type: Number,
        required: true 
    },
    quantityInWarehouse: {
        type: Number,
        required: true 
    },
    shelfThreshold: {
        type: Number,
        immutable: true,
        required: true 
    },
    warehouseThreshold: {
        type: Number,
        immutable: true,
        required: true 
    },
    quantitySold: Number,
    imageURL: String
});

// Define Item ongoose model based on above schema and export it
module.exports = mongoose.model('Item', itemSchema);
