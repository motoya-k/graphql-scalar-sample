export abstract class BaseEntityManager<TData> {
    abstract getAll(): Promise<TData[]>;
    abstract getById(id: string): Promise<TData>;
    abstract create(data: TData): Promise<TData>;
    abstract update(id: string, data: TData): Promise<TData>;
    abstract delete(id: string): Promise<void>;
}
