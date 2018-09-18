export interface Command<T> {
    perform(entity: T): void | Promise<void>;
    toString(): string;
}
