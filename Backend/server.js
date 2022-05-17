// Node.js Express server file
const express = require('express');
require('dotenv').config();


// Mongoose to establish connection to MongoDB
const mongoose = require('mongoose');
const Order = require('./model/Order');
const Item = require('./model/Item');
const { ObjectId } = require('bson');

const app = express();

// Web pages
app.use(express.static('Frontend'));

// Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Middleware Func To add three days for Expected Delivery Date
Date.prototype.addDays = function() {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + 3);
    console.log(date);
    return date;
}

// For broswer workaround of not allowing different server from client (local host)
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
    res.setHeader('Access-Control-allow-Headers', 'Content-Type, Authorization');
    // This request cannot be handled in graphql therefore return a state of 200
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    // Otherwise
    next();
});

dbHandler = async (operation, x, y, result) => {
    const logOperation = new Operation({
        operation: operation,
        numbers: [x, y],
        result: result,
    });

    await logOperation.save().then(() => console.log("Successfully logged " + operation + " operation in db!"));
}

checkStockLevels = function(quantity, threshold, status) {
    if(quantity == threshold || quantity >= threshold * 0.7 ) {
        status = "Full Stock";
    }
    else if (quantity < threshold * 0.7 || quantity >= 0 ) {
        status = "Low Stock";
    }
    else if (quantity == 0) {
        status = "Out of Stock";
    }
    return status;
}

// Main entry point to client
app.get('/', (req, res) => {
    res.render('index')
    console.log(req);
});

// REST API for DB Create OP using POST
app.post('/reorderItem', async (req, res) => {
    let itemId = ObjectId( req.body.ID );
    let quantity = Number( req.body.quantity );

    // To check if there is a duplicate order existing in Active order already
    const duplicate= await Order.findOne({
            orderStatus: "Active",
            item: itemId,
    }) 

    // If there are no duplicate orders it will send the order otherwise it will return a message 
    if(!duplicate) {
        await Order.insertMany({
            orderStatus: "Active",
            item: itemId,
            quantity: quantity,
            expectedDelivery: new Date(Date.now()).addDays(),
            orderIssueDate: new Date(Date.now())
        })
        .then( data => { 
            console.log("DB response for reordering is: ", data);
            res.send({"message": "Order has been sent successfully!"});            
        })
        .catch( err => console.log("Error something happened while retreiving redorder data: ", err) )
    }   
    else {
        console.log("Order already there!");
        res.send({"message": "There is an active order for this item already!"});         
    }
}) 
   
// REST API for DB Update OP using PUT
app.put('/updateOrderStatus', async (req, res) => {
    let newStatus =  req.body.status;
    let listOfOrders= req.body.list;

    // For each order update its status
    listOfOrders.map( async (order) =>  { 
        await Order.updateOne({
            _id: order
        }, {
            orderStatus: newStatus
        })
        .then( data => { 
            console.log("Orders updated", data);
            res.send({"message": `Orders have been updated to ${newStatus} successfully!`});            
        })
        .catch( err => console.log("Error something happened while updating orders status: ", err) );
    })  
})

// REST API for DB Read OP using GET
app.get('/getStockLevels', async (req, res) => {
    const items = [];

    await Item.find()
    .then( data => { 
        console.log("Data found for Stock Levels: ", data);
        data.map((item) => {
            const itemInfo = {
                _id: "",
                name: "",
                shelfStatus: "",
                warehouseStatus: "",
                quantitySold: 0,
            }
            itemInfo._id = item._id;
            itemInfo.name = item.name;
            itemInfo.shelfStatus = checkStockLevels(item.quantityOnShelf, item.shelfThreshold);
            itemInfo.warehouseStatus = checkStockLevels(item.quantityInWarehouse, item.warehouseThreshold);
            itemInfo.quantitySold = item.quantitySold;
            items.push(itemInfo);
        })
        console.log("This is modified result: ", items)
        res.send({"result": items});            
    })
    .catch( err => console.log("Error something happened while retreiving Stock Levels: ", err) )
})

// REST API for DB Read OP using POST
app.get('/getActiveOrders', async (req, res) => {

    await Order.find({ orderStatus: "Active" })
    .then(data => { 
        console.log("Data found for Active Orders: ", data);
        res.send({"result": data});
    })
    .catch( err => console.log("Error something happened while retreiving active orders: ", err) )
})

// REST API for DB Read OP using POST
app.get('/getDelayedOrders', async (req, res) => {
   
    await Order.find({ orderStatus: "Delayed" })
    .then(data => { 
        console.log("Data found for Delayed Orders: ", data);
        res.send({"result": data});
    })
    .catch( err => console.log("Error something happened while retreiving delayed orders: ", err) )
})

// REST API for DB Read OP using POST
app.get('/getCompletedOrders', async (req, res) => {
   
    await Order.find({ orderStatus: "Completed" })
    .then(data => { 
        console.log("Data found for Completed orders: ", data);
        res.send({"result": data});
    })
    .catch( err => console.log("Error something happened while retreiving data: ", err) )
})

// REST API for DB Read OP using POST
app.get('/getMostPurchased', async (req, res) => {
    
    await Item.find().sort({quantitySold:-1}).limit(1)
    .then( data => { 
        console.log("The highest quantity sold is for: ", data);
        res.send({"item": data});            
    })
    .catch( err => console.log("Error something happened while retreiving most purchased item: ", err) )
})

// REST API for DB Fetching using GET
app.get('/getLeastPurchased', async (req, res) => {
    
    await Item.find().sort({quantitySold:+1}).limit(1)
    .then( data => { 
        console.log("The lowest quantity sold is for: ", data);
        res.send({"item": data});            
    })
    .catch( err => console.log("Error something happened while retreiving least purchased item: ", err) )
})

// Connect to MongoDB Atlas Database via Mongoose Module then run server after successful connection
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cloudproject.urb9v.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true}
)
.then(() => {
    console.log("Server successfully connected to DB!")
    app.listen(process.env.PORT);
    console.log("Server Listening on Port: ", process.env.PORT);
})
.catch( err => {
    console.log("Oops! Something happended while trying to connect to DB: ", err);
});