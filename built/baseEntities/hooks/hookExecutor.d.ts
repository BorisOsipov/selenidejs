import { Error } from 'tslint/lib/error';
import { Driver } from '../driver';
export declare class HookExecutor<T> {
    private readonly driver;
    private readonly configuration;
    private readonly entity;
    constructor(driver: Driver, entity: T);
    executeOnFailureHooks(error: Error): Promise<void>;
    private executeCommonOnFailureHooks;
    private executeOnEntityFailureHooks;
    private executeOnElementFailureHooks;
    private executeOnCollectionFailureHooks;
    private tryExecuteHook;
}
