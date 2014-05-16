define(function(require){

    var doT = require("doT");

    return {
        row : doT.template(require("text!templates/row.tpl"))
    };
});
