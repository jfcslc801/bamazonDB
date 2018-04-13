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
    runSearch()
});


function runSearch() {
    connection.query("SELECT id, product_name, department_name, price, stock_quantityÏ FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantityÏ);
            console.log("-----------------------------------");


        }

        inquirer
            .prompt([
                {
                    name: "itemId",
                    type: "input",
                    message: "What is the item ID?"
                },
                {
                    name: "itemQty",
                    type: "input",
                    message: "provide qty?"
                }
            ])
            .then(function (answer) {

                // console.log("test")
            });


    });

}

// function runSearch() {

// }