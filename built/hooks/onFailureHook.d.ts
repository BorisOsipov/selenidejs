import { Collection } from '../collection';
import { Driver } from '../driver';
import { Element } from '../element';
import { Condition } from '../index';
export declare type OnFailureHook = (<T extends Driver | Element | Collection>(lastError: Error, entity: T, condition?: Condition<T>) => void | Promise<void>);
