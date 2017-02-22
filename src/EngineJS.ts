import { IEngine, ErrorCallback, ReadCallback } from './common';

///<reference path="../typings/node/node.d.ts" />

import {EventEmitter} from 'events';

export class EngineJS extends EventEmitter implements IEngine
{
    private internal : any;

    constructor()
    {
        // Setup the event emitter
        super();
    }

    load(callback : ErrorCallback) : void
    {
        // Load the engine
        this.internal = require("./../build/CuraEngineInternal.js");
        this.emit('loaded');
        // Setup event emission
        this.internal.setup_callback('status', function(text)
        {
            this.emit('status', text);
        });
        this.internal.setup_callback('stdout', function(text)
        {
            this.emit('stdout', text);
        });
        this.internal.setup_callback('stderr', function(text)
        {
            this.emit('stderr', text);
        });
        callback(undefined);
    }

    main(argv : Array<string>, callback : ErrorCallback) : void
    {
        this.internal.main(argv, callback);
    }

    write_file(name : string, data_encoding : string, data : any, callback : ErrorCallback) : void
    {
        this.internal.write_file(name, data_encoding, data, callback);
    }

    read_file(name : string, data_encoding : string, callback : ReadCallback)
    {
        this.internal.read_file(name, data_encoding, callback);
    }
}
