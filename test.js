function addToInventory() {
    console.log("----------------------------------------------------------------------------------");
    console.log("--------------------------------- Add Inventory ----------------------------------");
    console.log("----------------------------------------------------------------------------------");

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
                console.log('The quantity was updated.');
                start();
            });
        })
    });
}
