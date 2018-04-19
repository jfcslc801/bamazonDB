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
    console.log("connected as id " + connection.threadId);
});


function runSearch() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("----------------------------------------------------------------------------------");
        console.log("------------------------------------ BAMazon -------------------------------------");
        console.log("----------------------------------------------------------------------------------");
        // consoles mySQL products from DB
        for (var i = 0; i < res.length; i++) {

            console.log("ID: " + res[i].id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price.toFixed(2) + " | " + "Stock: " + res[i].stock_quantity);
            console.log("----------------------------------------------------------------------------------");
        }
        // prompts user for input on sale id and quantity
        inquirer
            .prompt([
                {
                    name: "saleId",
                    type: "input",
                    message: "Welcome: ENTER PRODUCT ID TO BEGIN SHOPPING.",
                    validate: function (value) {
                        if (isNaN(value) === false && parseInt(value) <= res.length && parseInt(value) > 0) {
                            return true;
                        }
                        return false;
                    }
                },
                {
                    name: "itemQty",
                    type: "input",
                    message: "Please: ENTER THE QUANTITY FOR THE ITEM YOU ARE PURCHASING.",
                    validate: function (value) {
                        if (isNaN(value)) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                }
            ])
            .then(function (answer) {
                var purchase = (answer.saleId) - 1;
                var qtyBought = parseInt(answer.itemQty);
                var allPurchases = parseFloat(((res[purchase].price) * qtyBought).toFixed(2));


                //check if quantity is sufficient
                if (res[purchase].stock_quantity >= qtyBought) {
                    //after purchase, updates quantity in Products
                    connection.query("UPDATE products SET ? WHERE ?", [
                        { stock_quantity: (res[purchase].stock_quantity - qtyBought) },
                        { id: answer.saleId }
                    ], function (err, result) {
                        if (err) throw err;
                        console.log("\n");
                        console.log("---------------THANK YOU----------------------");
                        console.log("SUB TOTAL: $" + allPurchases.toFixed(2) + ".");
                        console.log("YOUR ITEMS WILL SHIP IN 3-5 BUSINESS DAYS.");
                    });

                    connection.query("SELECT * FROM products", function (err, res) {
                        if (err) throw err;

                        for (var i = 0; i < res.length; i++) {
                            if (res[i].department_name === res[purchase].department_name) {
                            }
                        }


                    });
                    //updates totalSales in products table    var allPurchases = parseFloat(((res[purchase].price) * qtyBought).toFixed(2));
                    connection.query("UPDATE products SET ? WHERE ?", [
                        { product_sales: (res[purchase].price * qtyBought).toFixed(2) },
                        { department_name: res[purchase].department_name }
                    ], function (err, res) {
                        if (err) throw err;
                        console.log("-PRESS ENTER TO CONTINUE----------------------");
                        console.log("-OR-----CTRL + C TO EXIT----------------------");
                    });


                } else {
                    console.log("Sorry, Insufficient quantity!");

                }
                reprompt();

            });

    });

}


function reprompt() {
    inquirer.prompt([{
        type: "confirm",
        name: "reply",
        message: "Would you like to purchase another item?"
    }]).then(function (ans) {
        if (ans.reply) {
            runSearch();
        } else {
            console.log("Thank you, Come again.");
        }
    });
}

runSearch()

