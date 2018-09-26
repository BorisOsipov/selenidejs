export declare class Condition<T> {
    static create<T>(description: string, func: (T: any) => Promise<void>): Condition<T>;
    static not<T>(condition: Condition<T>): Condition<T>;
    private readonly func;
    private readonly description;
    private constructor();
    matches(entity: T): Promise<void>;
    and(...conditions: Array<Condition<T>>): Condition<T>;
    or(...conditions: Array<Condition<T>>): Condition<T>;
    toString(): string;
}
