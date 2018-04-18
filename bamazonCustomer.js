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
                    message: "What is the item ID?",
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
                    message: "provide qty?",
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
                    ], function (err, res) {
                        if (err) throw err;
                        console.log("Your total is $" + allPurchases.toFixed(2) + ". Your item's will ship to you in 3-5 business days.");
                    });

                    connection.query("SELECT * FROM products", function (err, department_name_res) {
                        if (err) throw err;
                        var index;
                        for (var i = 0; i < department_name_res.length; i++) {
                            if (department_name_res[i].department_name === res[purchase].department_name) {
                                index = i;
                            }
                        }


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

