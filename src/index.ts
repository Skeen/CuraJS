/**
 * Interface for JavaScript slicer
 */
interface ICuraJS
{
    /**
     * Queries whether the underlying JavaScript engine has been loaded.
     *
     * @returns Whether it has been loaded or not.
     */
    is_loaded() : boolean;

    /**
     * Load the underlying JavaScript slicer engine.
     *
     * This call should be considered costly and should only be done once.
     * Additionally it may take a while to complete.
     *
     * @param callback Callback function, for when the engine has finished loading.
     */
    load(callback ?: Function) : void;

    /**
     * Override slicer configuration parameters.
     *
     * If this function isn't called, default parameters will be utilized.
     * Multiple calls do TODO
     *
     * @param override Object containing the options to override and their values.
     */
    load_config(override ?: Object) : void;

    /**
     * Get slicer configuration parameters.
     *
     * This function returns the current slicer configuration.
     *
     * @returns Object containing configurations parameters.
     */
    get_config() : Object;

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
 
