var assert = require('assert');

/*
var oneShotListener = function(emitter, eventname, callback)
{
    var handler = function()
    {
        callback.apply(this, arguments);

        emitter.removeListener(eventname, handler);
    }

    emitter.addListener(eventname, handler);
}
*/

describe('CuraEngineInternal', function()
{
    describe('Running', function()
    {
        it('should load the engine', function() {
            var engine = require("./../build/CuraEngineInternal.js");
        });

        it('should print information when run without args', function()
        {
            var engine = require("./../build/CuraEngineInternal.js");

            // Collect stdout
            var stdout = "";
            engine.emitter.on("stdout", function(text)
            {
                stdout += text + "\n";
            });
            // ... and stderr
            var stderr = "";
            engine.emitter.on("stderr", function(text)
            {
                stderr += text + "\n";
            });
            // Run engine without arguments
            engine.main([]);
            
            // Check stderr
            //-------------
            var stderr_arr = stderr.split('\n');
            // Check that we've got version string
            assert.equal(stderr_arr[0],
                    "Cura_SteamEngine version DEV_WEB",
                    "Expected stderr to have version header");
            // Check that we've got copyright string
            assert.equal(stderr_arr[1],
                    "Copyright (C) 2014 David Braam",
                    "Expected stderr to have copyright header");
            // Check that we've got license string
            assert.equal(stderr_arr[3],
                    "This program is free software: you can redistribute it and/or modify",
                    "Expected stderr to have license header");
            // Check that no configuration is used
            assert.equal(stderr_arr[15],
                    "Default config \'default.cfg\' not used",
                    "Expected stderr to have configuration line");
            
            // Check stdout
            //-------------
            var stdout_arr = stdout.split('\n');
            // Check that we've got some gcodes
            assert.deepEqual([stdout_arr[0], stdout_arr[5].substr(0,3), stdout_arr[9].substr(0,3)],
                    ['M107', 'G91', 'M84'],
                    "Expected stdout to have gcode header");
        });

        it('should output gcode header when run without args', function()
        {
            var engine = require("./../build/CuraEngineInternal.js");

            engine.main(["-o", "a.gcode"]);

            var gcode = engine.read_file("a.gcode", "utf8");
            // Check that it starts as we expect
            assert(gcode.startsWith(";Generated with Cura_SteamEngine DEV_WEB"),
                    "Expected gcode to have Cura header");
            // Check the size of gcode
            assert(gcode.split('\n').length < 20,
                    "Expected less than 20 lines in gcode file header");

            // TODO: Check invariants about gcode header
        });

        it('should output gcode when run with stl file', function()
        {
            var engine = require("./../build/CuraEngineInternal.js");

            // Load testing 3D model
            var fs = require('fs');
            var stl_file = fs.readFileSync("res/model.stl", "ascii");

            // Write file to file system
            engine.write_file("a.stl", "utf8", stl_file);
            // Run slicer
            engine.main(["-o", "a.gcode", "a.stl"]);
            // Grab output
            var gcode = engine.read_file("a.gcode", "utf8");

            // Check that it starts as we expect
            assert(gcode.startsWith(";Generated with Cura_SteamEngine DEV_WEB"),
                    "Expected gcode to have Cura header");
            // Check the size of gcode
            assert(gcode.split('\n').length > 1500,
                    "Expected more than 1500 lines in gcode file output");

            // TODO: Check invariants about gcode
        });
    });
});
