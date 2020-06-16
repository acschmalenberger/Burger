
var connection = require("./connection.js");


function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

  // Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
            value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
        }
    }
    // translate array of strings to a single comma-separated string
    return arr.toString();
}

var orm = {
    selectAll: function(tableInput,cb){
        var queryString ="SELECT * FROM " +tableInput + ";";
        connection.query(queryString, function(err,result){
            if (err) throw err;
            console.log("orm response", result);
            cb(result);
        })
    },

    insertOne: function(table, coloumns, values, callback){
        var queryString ="INSERT INTO "+ table;
        
        queryString += " (";
        queryString += coloumns.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(values.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, values, function(err,result){
            if (err) throw err;
            console.log(result);
            callback(result)
        })
    },

    updateOne: function(table, objColVals, condition, callback){
        var queryString ="UPDATE "+ table;
        
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;
        
        console.log(queryString);

        connection.query(queryString, function(err,result){
            if (err) {
                throw err;
            }
            callback(result)
        })
    },
}

module.exports = orm;