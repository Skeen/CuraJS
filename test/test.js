var assert = require('assert');

describe('CuraEngineInternal', function()
{
    // TODO: Test against native binary?
    // TODO: Test more scenarios.

    var collect_streams_main = function(engine, argv, callback)
    {
        // Collect stdout
        var stdout = "";
        engine.setup_callback("stdout", function(text)
        {
            stdout += text + "\n";
        });
        // ... and stderr
        var stderr = "";
        engine.setup_callback("stderr", function(text)
        {
            stderr += text + "\n";
        });
        // ... and status
        var stats = "";
        engine.setup_callback("status", function(text)
        {
            stats += text + "\n";
        });
        // Run engine without arguments
        engine.main([], function(err)
        {
            callback(err, stdout, stderr, stats);
        });
    }

    describe('Running without input file', function()
    {
        var engine;

        before(function(before_done) {
            engine = require("./../build/CuraEngineInternal.js");
            before_done();
        });

        it('should print information when run without args', function(done)
        {
            collect_streams_main(engine, [], function(err, stdout, stderr, stats)
            {
                // Check no errors occured during execution
                if(err) { done(err); return; }

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

                done();
            });
        });

        it('should output gcode header when run without args', function(done)
        {
            engine.main(["-o", "a.gcode"], function(err)
            {
                if(err) { done(err); return; }

                var gcode = engine.read_file("a.gcode", "utf8", function(err, gcode)
                {
                    if(err) { done(err); return; }

                    // Check that it starts as we expect
                    assert(gcode.startsWith(";Generated with Cura_SteamEngine DEV_WEB"),
                            "Expected gcode to have Cura header");
                    // Check the size of gcode
                    assert(gcode.split('\n').length < 20,
                            "Expected less than 20 lines in gcode file header");

                    // TODO: Check invariants about gcode header
                    
                    done();
                });
            });
        });

        it('should output customizable end gcode, when given by configuration', function(done)
        {
            // Write the endCode in the configuration file
            engine.write_file("default.cfg", "utf8", "endCode = ; TEST END GCODE", function(err)
            {
                if(err) { done(err); return; }

                engine.main(["-o", "a.gcode"], function(err)
                {
                    if(err) { done(err); return; }

                    engine.read_file("a.gcode", "utf8", function(err, gcode)
                    {
                        if(err) { done(err); return; }

                        // Check gcode
                        //-------------
                        var gcode_arr = gcode.split('\n');
                        // Check that it has the end gcode
                        assert.equal(gcode_arr[gcode_arr.length-2], // Second last line
                                "; TEST END GCODE",
                                "Expected gcode end to be in output");

                        done();
                    });
                });
            });
        });
    });

    var test_suite = function(filename)
    {
        return function()
        {
            var engine;

            before(function(before_done)
            {
                engine = require("./../build/CuraEngineInternal.js");
                // Load testing 3D model
                var fs = require('fs');
                fs.readFile(filename, 'ascii', function(err, stl_file)
                {
                    if(err) { before_done(err); return; }

                    engine.write_file("a.stl", "utf8", stl_file, function(err)
                    {
                        if(err) { before_done(err); return; }

                        before_done();
                    });
                });
            });

            it('should not throw error when reading non-existant files', function(done)
            {
                engine.read_file("NO_EXIST", "utf8", function(err, stl_file)
                {
                    if(err) done();
                    else done("Read non existing file, without error");
                });
            });

            it('should read the input file', function(done)
            {
                engine.read_file("a.stl", "utf8", function(err, stl_file)
                {
                    if(err) done(err);
                    else done();
                });
            });

            it('should output gcode when run', function(done)
            {
                // Run slicer
                engine.main(["-o", "a.gcode", "a.stl"], function(err)
                {
                    if(err) { done(err); return; }

                    // Grab output
                    engine.read_file("a.gcode", "utf8", function(err, gcode)
                    {
                        if(err) { done(err); return; }

                        // Check that it starts as we expect
                        assert(gcode.startsWith(";Generated with Cura_SteamEngine DEV_WEB"),
                                "Expected gcode to have Cura header");
                        // Check the size of gcode
                        assert(gcode.split('\n').length > 1500,
                                "Expected more than 1500 lines in gcode file output");

                        // TODO: Check invariants about gcode
                        
                        done();
                    });
                });
            });
        };
    }

    describe('Running with binary STL', test_suite("res/model-binary.stl"));
    describe('Running with ASCII STL', test_suite("res/model-ascii.stl"));
});
