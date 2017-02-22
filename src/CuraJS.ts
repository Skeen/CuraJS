import { ErrorCallback, IEngine } from "./common"

import { EngineNode } from "./EngineNode";
import { EngineJS } from "./EngineJS";
import { EngineWebWorker } from "./EngineWebWorker";

var isNode = require('detect-node');

/**
 * Interface for JavaScript slicer
 */
class CuraJS
{
    /**
     * Reference to an IEngine instance.
     * The engine used is picked automatically.
     */
     private engine : IEngine;
    
     constructor()
     {
     }

    /**
     * Queries whether the underlying JavaScript engine has been loaded.
     *
     * @returns Whether it has been loaded or not.
     */
     is_loaded() : boolean
     {
         return this.engine != undefined;
     }

    /**
     * Load the underlying JavaScript slicer engine.
     *
     * This call should be considered costly and should only be done once.
     * Additionally it may take a while to complete.
     *
     * Automatically loads the best engine available.
     *
     * @param callback Callback function, for when the engine has finished loading.
     */
     load(callback ?: ErrorCallback) : void
     {
        // Ensure ww haven't already loaded an engine
        if(this.is_loaded())
        {
            callback("Engine already loaded!");
            return;
        }
        // Check if we're running within node.js
        if(isNode)
        {
            this.engine = new EngineNode();
        }
        else // Assume we're running the browser
        {
            // WebWorkers are supported
            if(!! (<any>window).Worker)
            {
                this.engine = new EngineWebWorker();
            }
            else
            {
                this.engine = new EngineJS();
            }
        }
        // Load the engine itself
        this.engine.load(callback);
    }

    /**
     * Override slicer configuration parameters.
     *
     * If this function isn't called, default parameters will be utilized.
     * Multiple calls do TODO
     *
     * @param override Object containing the options to override and their values.
     */
    load_config(override ?: Object) : void
    {
        return;
    }

    /**
     * Get slicer configuration parameters.
     *
     * This function returns the current slicer configuration.
     *
     * @returns Object containing configurations parameters.
     */
    get_config() : Object
    {
        return {};
    }

/*
    // Run the emscripten cura engine, with the commandlines in argv.
    // Callback when finished running (sync mode = callback just before return)
    raw_run(argv ?: string[], callback ?: Function) : void;
    // Run the emscripten cura engine, passing default commandline arguments.
    // Callback when finished running (sync mode = callback just before return)
    run(callback ?: Function) : void;

    // Get the captured stdout/stderr/status of last run
    get_stdout() : string;
    get_stderr() : string;
    get_status() : string;

    // Get the resulting gcode of last run (functional assuming calls via run())
    get_gcode() : string;

    // Save an ascii STL model for next execution, callback when saved
    save_ascii_model(ascii : string, callback ?: Function) : void;
    // Save a binary STL model for next execution, callback when saved
    save_binary_model(binary : Uint8Array, callback ?: Function) : void;
   */

}
