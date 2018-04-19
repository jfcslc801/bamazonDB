var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    //Username
    user: "root",

    //Password
    password: "cangetin",
    database: "bamazonDB"
});

// **********************************************************************************************************
// CONNECTION 
// **********************************************************************************************************
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});



// **********************************************************************************************************
// FUNCTION  
// **********************************************************************************************************
function runSearch() {
    // Display all of the items available for sale: ids, names, and prices of products for sale.
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        console.log("----------------------------------------------------------------------------------");
        console.log("----------------------------------------------------------------------------------");
        console.log("------------------------------------ BAMazon -------------------------------------");
        console.log("----------------------------------------------------------------------------------");
        console.log("----------------------------------------------------------------------------------");

        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price.toFixed(2) + " | " + "Stock: " + res[i].stock_quantity);
            console.log("----------------------------------------------------------------------------------");
        }
        // prompts user for input on sale id and quantity
        console.log("----------------------------------------------------------------------------------");
        console.log("----------------------------------------------------------------------------------");
        inquirer
            .prompt([
                {
                    name: "saleId",
                    type: "input",
                    message: "Enter Product ID to continue----------------------------------------------------",
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
                    message: "Enter Product QTY to continue---------------------------------------------------",
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
                        console.log("----------------------------------------------");
                        console.log("----------------------------------------------");
                        console.log("-----------------BAMazom----------------------");
                        console.log("*           135 M St, SLC, UTAH              *");
                        console.log("*              801-867-5309                  *"); 
                        console.log("*                                            *");
                        console.log("* SUB TOTAL: $" + allPurchases.toFixed(2) + "                          *");
                        console.log("*                                            *");
                        console.log("* Ships in 3-5 BUSINESS DAYS.                *");                        
                        console.log("----------------------------------------------");
                        console.log("----------------------------------------------");
                        
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

                        reprompt();

                    });


                } else {
                    console.log("----------------------------------------------------------------------------------");
                    console.log("------------------------Sorry, Insufficient quantity!-----------------------------");
                    console.log("----------------------------------------------------------------------------------");

                    reprompt();


                }

            });

    });

}


function reprompt() {
    inquirer.prompt([{
        type: "confirm",
        name: "reply",
        message: "Would you like to purchase another item?----------------------------------------",
    }]).then(function (ans) {
        if (ans.reply) {
            runSearch();
        } else {
            console.log("----------------------------------------------------------------------------------");
            console.log("------------------------------Thank You, Come Again!------------------------------");
            console.log("----------------------------------------------------------------------------------");
        }
    });
}

runSearch()

