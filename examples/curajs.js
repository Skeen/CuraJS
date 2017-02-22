var CuraJS = require("./../build/node/CuraJS.js").CuraJS;

var slicer = new CuraJS();
slicer.load(function(err, name)
{
    console.log(err, name);
});
