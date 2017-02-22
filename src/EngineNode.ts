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
    }

    main(argv : Array<string>, callback : ErrorCallback) : void
    {
    }

    write_file(name : string, data_encoding : string, data : any, callback : ErrorCallback) : void
    {
    }

    read_file(name : string, data_encoding : string, callback : ReadCallback)
    {
    }
}
