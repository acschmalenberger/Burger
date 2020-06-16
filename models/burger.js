var orm = (require("../config/orm.js"))

// create the code that will call the ORM functions using burger specific input for the ORM.
var burger = {
    all: function(cb){
        orm.selectAll("burgers", function(res){
            cb(res);
        });
    },
    create: function(coloumns, values, callback) {
        orm.insertOne("burgers", coloumns, values, function(res) {
            callback(res);
        });
    },
    update: function(objColVals, condition, callback) {
        orm.updateOne("burgers", objColVals, condition, function(res) {
        callback(res);
    });
},
}



//export file to be required elsewhere
module.exports = burger;