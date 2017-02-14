var engine = require("./../build/CuraEngineInternal.js");

var fs = require('fs');

fs.readFile("res/model.stl", "ascii", function(err, data)
{
    if(err)
    {
        console.error(err);
        process.exit(1);
    }

    engine.save_ascii(data);
    engine.main(["-o", "a.gcode", "a.stl"]);

    console.log();
    console.log("AFTER RUN");
    console.log();

    var gcode = engine.get_gcode();

    console.log(gcode);

    console.log("AFTER GCODE!");
    console.log();
});

