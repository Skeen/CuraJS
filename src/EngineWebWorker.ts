import { IEngine, ErrorCallback, ReadCallback } from './common';

///<reference path="../typings/node/node.d.ts" />

import {EventEmitter} from 'events';

export class EngineWebWorker extends EventEmitter implements IEngine
{
    constructor()
    {
        // Setup the event emitter
        super();
    }

    load(callback : ErrorCallback) : void
    {
        callback("Not implemented!");
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
