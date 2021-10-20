/// <reference path="./LogEntry.d.ts" />
// noinspection JSUnusedGlobalSymbols

declare module "orbit-db" {
    import CounterStore from "orbit-db-counterstore";
    import KeyValueStore from "orbit-db-kvstore";
    import FeedStore from "orbit-db-feedstore";
    import EventStore from "orbit-db-eventstore";
    import DocumentStore from "orbit-db-docstore";
    import Storage from "orbit-db-storage-adapter";
    import Store from "orbit-db-store";
    import Cache from "orbit-db-cache";
    import {Identity} from "orbit-db-identity-provider";
    import * as IPFS from "ipfs";
    import Keystore from "orbit-db-keystore";
    import Pubsub from "orbit-db-pubsub";
    import {IOpenOptions} from "./DBOptions";

    export interface DatabaseTypes {
        counter: CounterStore,
        eventlog: EventStore,
        feed: FeedStore,
        docstore: DocumentStore,
        keyvalue: KeyValueStore
    }

    class OrbitDBAddress {
        constructor(public root: string, public path: string)
        toString(): string
        static isValid(address): boolean
        static parse(address): OrbitDBAddress
        static join(...paths): string
    }

    class OrbitDB {
        identity: Identity;
        id: string;
        directory: string;

        storage: Storage;
        stores: object;
        caches: {
            [dir: string]: { cache: Cache, handlers: Set<any> }
        };
        keystore: Keystore;

        _ipfs: IPFS;
        _pubsub: Pubsub;

        constructor(ipfs: IPFS, identity: Identity, options?: {
            peerId?: string,
            keystore?: Keystore
        });

        get cache(): Cache

        /**
         * Creates and returns an instance of OrbitDB.
         * @param ipfs
         * @param options Other options:
         * <ul>
         * <li>directory (string): path to be used for the database files. By default it uses './orbitdb'.</li>
         * <li>peerId (string): By default it uses the base58 string of the ipfs peer id.</li>
         * <li>keystore (Keystore Instance) : By default creates an instance of Keystore.</li>
         * <li>cache (Cache Instance) : By default creates an instance of Cache. A custom cache instance can also be used.</li>
         * <li>identity (Identity Instance): By default it creates an instance of Identity</li>
         * </ul>
         */
        static createInstance(ipfs: IPFS, options?: {
            offline?: boolean
            id?: string,//peerId
            directory?: string,
            storage?: Storage,
            keystore?: Keystore,
            identity?: Identity,
            cache?: Cache<any>,
        }): Promise<OrbitDB>

        create(name: string, type: TStoreType, options?: ICreateOptions): Promise<Store>;

        open(address: string, options?: IOpenOptions): Promise<Store>;

        disconnect(): Promise<void>;
        /**@see disconnect*/
        stop(): Promise<void>;

        feed<T>(address: string, options?: IStoreOptions): Promise<FeedStore<T>>;
        log<T>(address: string, options?: IStoreOptions): Promise<EventStore<T>>;
        eventlog<T>(address: string, options?: IStoreOptions): Promise<EventStore<T>>;
        keyvalue<T>(address: string, options?: IStoreOptions): Promise<KeyValueStore<T>>;
        /**@see keyvalue*/
        kvstore<T>(address: string, options?: IStoreOptions): Promise<KeyValueStore<T>>;
        counter(address: string, options?: IStoreOptions): Promise<CounterStore>;
        /**@see docstore*/
        docs<T>(address: string, options?: IStoreOptions): Promise<DocumentStore<T>>;
        docstore<T>(address: string, options?: IStoreOptions): Promise<DocumentStore<T>>;

        determineAddress(name: string, type: TStoreType, options?: ICreateOptions): Promise<OrbitDBAddress>

        static get databaseTypes(): keyof DatabaseTypes
        static isValidType(type: TStoreType): boolean;
        static addDatabaseType(type: string, store: typeof Store): void;
        static getDatabaseTypes(): DatabaseTypes;
        static isValidAddress(address: string): boolean;
        static parseAddress(address: string): OrbitDBAddress;
    }

    export = OrbitDB;
}
