var engine = require("./../build/CuraEngineInternal.js");

var fs = require('fs');

fs.readFile("res/model-ascii.stl", "ascii", function(err, data)
{
    if(err)
    {
        console.error(err);
        process.exit(1);
    }

    engine.setup_callback('stdout', function(text)
    {
        console.log(text);
    });
    engine.setup_callback('status', function(text)
    {
        console.log(text);
    });
    engine.setup_callback('stderr', function(text)
    {
        console.log(text);
    });

    engine.write_file("a.stl", "utf8", data, function(err)
    {
        if(err)
        {
            console.error(err);
            process.exit(1);
        }

        engine.main(["-o", "a.gcode", "a.stl"], function(err)
        {
            if(err)
            {
                console.error(err);
                process.exit(1);
            }

            console.log();
            console.log("AFTER RUN");
            console.log();

            engine.read_file("a.gcode", "utf8", function(err, gcode)
            {
                if(err)
                {
                    console.error(err);
                    process.exit(1);
                }
             
                console.log(gcode);
                console.log("AFTER GCODE!");
                console.log();
            });
        });
    });
});

