require('../css/test.less');
require('../css/main.css');

// 按需加载的插件 必须使用 里面必须要var person = require("./person.js");
$("#load").click(function () {
    require.ensure(["./person.js","./student.js"], function(){
        var person = require("./person.js");
        var student = require("./student.js");
        $("#student").click(function () {
            var p= new student({name:'老王'});
            p._say();
            p._walk();
        })
        $("#person").click(function () {
            var p= new person({name:'wty'});
            p._say();
            p._walk();
        })
    });
})