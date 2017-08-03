/**
 * Created by bernardwilliams on 7/22/17.
 */

var mysql = require('mysql');

var DataLayer = function () {
    var orderHeader = {};
    var orderID = 0;

    this.connection = mysql.createConnection(({
        host: 'te2sow.cciiqdjd26sf.us-east-1.rds.amazonaws.com',
        port: '3306',
        user: 'maria',
        password: '12Password34',
        database: 'bamazon'
    }));

    this.connection.connect(function (err) {
        if (err) throw err;

    });
    var connection = this.connection;

    /**
     * This function returns an array of orders and their associated items
     *
     */
    this.getOrders = function () {
        this.connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err;
            console.log(res);
        });
    };

    /**
     * This function submits an order
     *
     */
    this.addNewOrder = function (order) {

        orderHeader.order_date = order.order_date;
        orderHeader.customer_name = order.customer_name;
        orderHeader.order_status = 'new';
        orderHeader.total_value = order.total_value;

        this.connection
            .query('INSERT INTO orders SET ?', orderHeader,
                function (error, results, fields) {
                    if (error) throw error;
                    orderID = results.insertId;
                    console.log(results.insertId);
                    console.log("Order added");
                    addOrderItems(order.orderItems);

                });
    };

    // var addOrderItems = function (orderItems) {
    //     //TODO Get the product price to use to calculate the value of the order line item.
    //
    //     //Loop through each item on the order object and submit it.
    //     for (var i = 0; i < orderItems.length; i++) {
    //         var item = orderItems[i];
    //         var orderItem = {};
    //         orderItem.order_id = orderID;
    //         orderItem.qty = item.qty;
    //         orderItem.remarks = item.remarks;
    //         orderItem.product_id = item.prodID;
    //         console.log(JSON.stringify(orderItem, null, 2));
    //         connection
    //             .query('INSERT INTO order_items SET ?', orderItem,
    //                 function (error, results, fields) {
    //                     if (error) throw error;
    //                     console.log(results.insertId);
    //                     console.log("Order items added");
    //                 });
    //     };
    //
    // }

    /**
     * This function returns an array of items matching the requested department name
     *
     */
    this.getMatches = function (searchObj, callback) {
        this.connection.query({
                sql: "SELECT * FROM people where useflag = 1 and gender = ?",
                values: [searchObj.gender]
            },
            function (err, res) {
                if (err) throw err;
                callback(res);
            });
    };

    this.getProductByID = function (prodID) {
        var products = [];
        this.connection.query({
                sql: "SELECT ID, short_name, unit_price, department FROM products where ID = ?",
                values: [prodID]
            },
            function (err, res) {
                if (err) throw err;
                // instantiate

                for (var i = 0; i < res.length; i++) {
                    products.push({
                        id: res[i].ID,
                        short_name: res[i].short_name,
                        unit_price: res[i].unit_price,
                        department: res[i].department
                    })

                }
                console.log(JSON.stringify(products));
                return products;

            });

    };


    this.close = function () {
        this.connection.end(function () {
            console.log('---------- Connection closed --------');
        });
    }
};

module.exports = DataLayer;