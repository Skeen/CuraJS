///<reference path="../typings/index.d.ts" />

import {EventEmitter} from 'events';

/**
 * Interface for the underlying JavaScript engine
 */
export interface IEngine extends EventEmitter
{
    /**
     * Do whatever necessary to make the engine ready
     */
    load(callback : ErrorCallback);

    main(argv : Array<string>, callback : ErrorCallback) : void;

    write_file(name : string, data_encoding : string, data : any, callback : ErrorCallback) : void;

    read_file(name : string, data_encoding : string, callback : ReadCallback);
}

export interface ErrorCallback
{
    (error ?: string) : void;
}

export interface ReadCallback
{
    (error ?: string, value ?: any) : void;
}
