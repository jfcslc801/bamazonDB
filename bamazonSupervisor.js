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
        name: "superVisorView",
        message: "Supervisor View Menu",
        choices: ["View Product Sales by Department", "Create New Department", "End Session"]
    }]).then(function (ans) {
        switch (ans.superVisorView) {
            case "View Product Sales by Department": viewProductsByDepartment();
                break;
            case "Create New Department": createNewDepartment();
                break;
            case "End Session": console.log("-----------------------------CTRL + C to End Session-----------------------------");
        }
    });
}

runSearch();




//view product sales by department
function viewProductsByDepartment() {
    console.log("----------------------------------------------------------------------------------");
    console.log("---------------------------------  ----------------------------------");
    console.log("----------------------------------------------------------------------------------");
    //prints the items for sale and their details
    connection.query('SELECT * FROM Departments', function (err, res) {
        if (err) throw err;
        console.log('>>>>>>Product Sales by Department<<<<<<');
        console.log('----------------------------------------------------------------------------------------------------')

        for (var i = 0; i < res.length; i++) {
            console.log("Department ID: " + res[i].DepartmentID + " | " + "Department Name: " + res[i].DepartmentName + " | " + "Over Head Cost: " + (res[i].OverHeadCosts).toFixed(2) + " | " + "Product Sales: " + (res[i].TotalSales).toFixed(2) + " | " + "Total Profit: " + (res[i].TotalSales - res[i].OverHeadCosts).toFixed(2));
            console.log('--------------------------------------------------------------------------------------------------')
        }
        start();
    })
}
