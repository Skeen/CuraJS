var callbacks = {};
var fire_callback = function(name, text)
{
    var callback = callbacks[name];
    if(callback)
    {
        callback(text);
    }
}

// Module configured by:
// http://kripken.github.io/emscripten-site/docs/api_reference/module.html#module
var Module = {};
Module['noInitialRun'] = true;
Module['noExitRuntime'] = true;
Module['setStatus'] = function(text)
{
    fire_callback('status', text);
}
Module['print'] = function(text)
{
    fire_callback('stdout', text);
}
Module['printErr'] = function(text)
{
    fire_callback('stderr', text);
}

// NOTE: res/CuraJS-Engine.js will inserted here, during build:
//
// INSERT-CURA-ENGINE-COMPILED
//
// NOTE: At this point we're back in CuraEngineInternal.js

module.exports = {
    setup_callback: function(name, callback) {
        callbacks[name] = callback;
    },

    // Call the main function of the engine
    main: function(argv, callback) {
        try {
            //Module['run'](argv);
            Module['callMain'](argv);
            callback(undefined);
        }
        catch(err) {
            callback("Error while running main!" + err);
        }
    },

    write_file : function(name, data_encoding, data, callback) {
        try {
            FS.writeFile(name, data, { encoding: data_encoding});
            callback(undefined);
        }
        catch(err) {
            callback("Invalid attempt at writing file: " + err);
        }
    },

    // Read the gcode output from the virtual file system
    read_file: function(name, data_encoding, callback) {
        try {
            var contents = FS.readFile(name, { encoding: data_encoding});
            callback(undefined, contents);
        }
        catch(err) {
            callback("Invalid attempt at reading file: " + err);
        }
    }
};
