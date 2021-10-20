import {DatabaseTypes} from "orbit-db";

export interface ICreateOptions extends IOpenOptions0 {
    /**
     * Overwrite an existing database (Default: false)
     */
    overwrite?: boolean;
}

interface IOpenOptions0 {
    /**will override accessController*/
    accessControllerAddress?: string;
    accessController?: {
        /**
         * Name of custom AccessController
         * @default ipfs
         */
        type?: string

        [key: string]: any
    };

    /**
     * f set to true, will throw an error if the database can't be found locally. (Default: false)
     */
    localOnly?: boolean;

    /**
     * The directory where data will be stored (Default: uses directory option passed to OrbitDB constructor or ./orbitdb if none was provided).
     */
    directory?: string;

    /**
     * A supported database type (i.e. eventlog or an added custom type).
     * Required if create is set to true.
     * Otherwise it's used to validate the manifest.
     * You ony need to set this if using OrbitDB#open
     */
    type?: TStoreType;

    /**
     * Replicate the database with peers, requires IPFS PubSub. (Default: true)
     */
    replicate?: boolean;
}

export type IOpenOptions = ({ create: true, type: TStoreType } & ICreateOptions) | IOpenOptions0

export interface IStoreOptions extends ICreateOptions, IOpenOptions {
    Index?: any;
}

// c.f. https://github.com/orbitdb/orbit-db/blob/master/API.md#orbitdbdatabasetypes
export type TStoreType = keyof DatabaseTypes;

//export {ICreateOptions, IOpenOptions, IStoreOptions};
