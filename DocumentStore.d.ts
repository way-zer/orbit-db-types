declare module "orbit-db-docstore" {
    import Store from "orbit-db-store";

    export default class DocumentStore<T extends { _id: string }> extends Store {
        get(key: string, caseSensitive?: boolean): T[]
        query(filter: (doc: T) => boolean, options?: { fullOp: boolean }): T[]

        batchPut(docs: T[]): Promise<void>
        put(doc: T): Promise<string>
        putAll(doc: T | T[]): Promise<string>

        del(key: any): Promise<string>;
    }
}
