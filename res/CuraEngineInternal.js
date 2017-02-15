const EventEmitter = require('events');
var emitter = new EventEmitter();

// Module configured by:
// http://kripken.github.io/emscripten-site/docs/api_reference/module.html#module
var Module = {};
Module['noInitialRun'] = true;
Module['noExitRuntime'] = true;
Module['setStatus'] = function(text)
{
    emitter.emit('status', text);
}
Module['print'] = function(text)
{
    emitter.emit('stdout', text);
}
Module['printErr'] = function(text)
{
    emitter.emit('stderr', text);
}

// NOTE: res/CuraJS-Engine.js will inserted here, during build:
//
// INSERT-CURA-ENGINE-COMPILED
//
// NOTE: At this point we're back in CuraEngineInternal.js

module.exports = {
    emitter: emitter,

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

    write_file : function(name, data_encoding, data) {
        try {
            FS.writeFile(name, data, { encoding: data_encoding});
        }
        catch(err) {
            Module['setStatus']("Invalid attempt at writing file: " + err);
        }
    },

    // Read the gcode output from the virtual file system
    read_file: function(name, data_encoding) {
        try {
            return FS.readFile(name, { encoding: data_encoding});
        }
        catch(err) {
            Module['setStatus']("Invalid attempt at reading file: " + err);
            return undefined;
        }
    }
};
