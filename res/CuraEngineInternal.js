// Module configured by:
// http://kripken.github.io/emscripten-site/docs/api_reference/module.html#module
var Module = {};
Module['noInitialRun'] = true;
Module['noExitRuntime'] = true;
Module['setStatus'] = function(a)
{
    console.log(a);
}
Module['onRuntimeInitialized'] = function(a)
{
    console.log("Runtime Initialized");
}

// NOTE: res/CuraJS-Engine.js will inserted here, during build:
//
// INSERT-CURA-ENGINE-COMPILED
//
// NOTE: At this point we're back in CuraEngineInternal.js

module.exports = {
    // Call the main function of the engine
    main: function(argv) {
        try {
            //Module['run'](argv);
            Module['callMain'](argv);
        }
        catch(err) {
            Module['setStatus']("Error while running main!" + err);
        }
    },

    save_x : function(data, data_encoding) {
        try {
            FS.writeFile('a.stl', data, { encoding: data_encoding});
        }
        catch(err) {
            Module['setStatus']("Invalid attempt at writing a.stl!" + err);
        }
    },

    // Save an ascii stl file to the virtual file system
    save_ascii: function(ascii) {
        this.save_x(ascii, 'utf8');
    },
    save_binary: function(binary) {
        this.save_x(binary, 'binary');
    },

    // Read the gcode output from the virtual file system
    get_gcode: function() {
        try {
            return FS.readFile('a.gcode', { encoding: 'utf8' });
        }
        catch(err) {
            Module['setStatus']("Invalid attempt at reading a.gcode!" + err);
            return "";
        }
    }
};
