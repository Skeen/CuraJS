var engine = require("./../build/CuraEngineInternal.js");

var fs = require('fs');

fs.readFile("res/model-binary.stl", "ascii", function(err, data)
{
    if(err)
    {
        console.error(err);
        process.exit(1);
    }

    engine.emitter.on('stdout', function(text)
    {
        console.log(text);
    });

    engine.emitter.on('status', function(text)
    {
        console.log(text);
    });

    engine.emitter.on('stderr', function(text)
    {
        console.log(text);
    });

    engine.write_file("a.stl", "utf8", data);
    engine.main(["-o", "a.gcode", "a.stl"]);

    console.log();
    console.log("AFTER RUN");
    console.log();

    var gcode = engine.read_file("a.gcode", "utf8");

    console.log(gcode);

    console.log("AFTER GCODE!");
    console.log();
});

