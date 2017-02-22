var CuraJS = require("./../build/CuraJS.js").CuraJS;

var slicer = new CuraJS();
slicer.load(function(err, name)
{
    console.log(name);
});
