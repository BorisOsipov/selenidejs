import { Element } from '../baseEntities/element';
import { Command } from './command';
export declare class PressKey implements Command<Element> {
    private readonly key;
    constructor(key: string);
    perform(element: Element): Promise<void>;
    toString(): string;
}
