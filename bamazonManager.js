var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "cangetin",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
});

function runSearch() {
    inquirer.prompt([{
        type: "list",
        name: "managerView",
        message: "Manager Menu",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "End Session"]
    }]).then(function (ans) {
        switch (ans.managerView) {
            case "View Products for Sale": viewProducts();
                break;
            case "View Low Inventory": viewLowInventory();
                break;
            case "Add to Inventory": addToInventory();
                break;
            case "Add New Product": addNewProduct();
                break;
            case "End Session": console.log("-----------------------------CTRL + C to End Session-----------------------------");
        }
    });
}


// lists every available item: the item IDs, names, prices, and quantities........................................................................................
function viewProducts() {
    connection.query('SELECT * FROM Products', function (err, res) {
        console.log("----------------------------------------------------------------------------------");
        console.log("------------------------------- Products for Sale --------------------------------");
        console.log("----------------------------------------------------------------------------------");
        if (err) throw err;
        // consoles mySQL products from DB
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price.toFixed(2) + " | " + "Stock: " + res[i].stock_quantity);
            console.log("----------------------------------------------------------------------------------");

        }
        console.log("------------------------------- Products for Sale --------------------------------");
        console.log("----------------------------------------------------------------------------------");
        runSearch();
    });
}

// List's all items with an inventory count lower than five ....................................................................................................
function viewLowInventory() {
    console.log("----------------------------------------------------------------------------------");
    console.log("--------------------------------- Low Inventory ----------------------------------");
    console.log("----------------------------------------------------------------------------------");

    connection.query('SELECT * FROM Products', function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity <= 5) {
                // console.log("--------------------------- Low Inventory ----------------------------");
                console.log("ID: " + res[i].id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price.toFixed(2) + " | " + "Stock: " + res[i].stock_quantity);
                console.log("----------------------------------------------------------------------------------");

            }

        }
        console.log("------------------------ Displaying Items Lower Than Five ------------------------");        
        console.log("----------------------------------------------------------------------------------");
        runSearch();
    });
}


function viewAddLowInventory() {
    connection.query('SELECT * FROM Products', function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity <= 5) {
                // console.log("--------------------------- Low Inventory ----------------------------");
                console.log("ID: " + res[i].id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price.toFixed(2) + " | " + "Stock: " + res[i].stock_quantity);
                console.log("----------------------------------------------------------------------------------");

            }

        }
        console.log("------------------------ Displaying Items Lower Than Five ------------------------");
        console.log("----------------------------------------------------------------------------------");

    });
}

// display a prompt that will let the manager "add more" of any item currently in the store...................................................................
function addToInventory() {
    console.log("----------------------------------------------------------------------------------");
    console.log("--------------------------------- Add Inventory ----------------------------------");
    console.log("----------------------------------------------------------------------------------");
    viewAddLowInventory();


    connection.query('SELECT * FROM Products', function (err, res) {
        if (err) throw err;
        var productArray = [];
        //pushes each item into an productArray
        for (var i = 0; i < res.length; i++) {
            productArray.push(res[i].product_name);
        }

        inquirer.prompt([{
            type: "list",
            name: "product",
            choices: productArray,
            message: "Which item would you like to add inventory?"
        }, {
            type: "input",
            name: "itemQty",
            message: "How much would you like to add?",
            validate: function (value) {
                if (isNaN(value) === false) { return true; }
                else { return false; }
            }
        }]).then(function (ans) {
            var currentQty;
            for (var i = 0; i < res.length; i++) {
                if (res[i].product_name === ans.product) {
                    currentQty = res[i].stock_quantity;
                }
            }
            connection.query('UPDATE Products SET ? WHERE ?', [
                { stock_quantity: currentQty + parseInt(ans.itemQty) },
                { product_name: ans.product }
            ], function (err, res) {
                if (err) throw err;
                console.log("\n");
                console.log('The quantity was updated.');
                console.log("\n");
                runSearch();
            });
        })
    });
}



// Allows the manager to add a completely new product to the store.
function addNewProduct() {
    var departmentName = [];

    //grab name of departments
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            departmentName.push(res[i].department_name);
        }
    })

    inquirer.prompt([{
        type: "input",
        name: "product",
        message: "Product: ",
        validate: function (value) {
            if (value) { return true; }
            else { return false; }
        }
    }, {
        type: "input",
        name: "id",
        message: "id:"
    }, {
        type: "list",
        name: "department",
        message: "Department: ",
        choices: departmentName
    }, {
        type: "input",
        name: "price",
        message: "Price: ",
        validate: function (value) {
            if (isNaN(value) === false) { return true; }
            else { return false; }
        }
    }, {
        type: "input",
        name: "quantity",
        message: "Quantity: ",
        validate: function (value) {
            if (isNaN(value) == false) { return true; }
            else { return false; }
        },

    }]).then(function (ans) {
        connection.query('INSERT INTO Products SET ?', {
            id: ans.id,
            product_name: ans.product,
            department_name: ans.department,
            price: ans.price,
            stock_quantity: ans.quantity
        }, function (err, res) {
            if (err) throw err;
            console.log("\n");
            console.log('Inventory Added Successfully!');
            console.log("\n");
        })
        runSearch();
    });
}

runSearch();
