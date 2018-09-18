import { Driver } from '..';
import { Element } from '../baseEntities/element';
import { Command } from './command';
export declare class SetValueByJs implements Command<Element> {
    private readonly value;
    private readonly driver;
    constructor(driver: Driver, value: string | number);
    perform(element: Element): Promise<void>;
    toString(): string;
}
