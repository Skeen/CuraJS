import { IEngine, ErrorCallback, ReadCallback } from './common';

///<reference path="../typings/node/node.d.ts" />

import {EventEmitter} from 'events';

export class EngineNode extends EventEmitter implements IEngine
{
    constructor()
    {
        // Setup the event emitter
        super();
    }

    load(callback : ErrorCallback) : void
    {
        var exec = require('child_process').exec;
        exec('echo "Hello"', function(err, stdout, stderr)
        {
            callback(stdout);
        });
    }

    main(argv : Array<string>, callback : ErrorCallback) : void
    {
        callback("Not implemented!");
    }

    write_file(name : string, data_encoding : string, data : any, callback : ErrorCallback) : void
    {
        callback("Not implemented!");
    }

    read_file(name : string, data_encoding : string, callback : ReadCallback)
    {
        callback("Not implemented!");
    }
}
