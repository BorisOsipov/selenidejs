import { Element } from '../baseEntities/element';
import { Command } from './command';
export declare class SendKeys implements Command<Element> {
    private readonly value;
    constructor(value: string | number);
    perform(element: Element): Promise<void>;
    toString(): string;
}
