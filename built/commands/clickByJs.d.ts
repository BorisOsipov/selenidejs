import { Driver } from '..';
import { Element } from '../baseEntities/element';
import { Command } from './command';
export declare class ClickByJs implements Command<Element> {
    private readonly driver;
    constructor(driver: Driver);
    perform(element: Element): Promise<void>;
    toString(): string;
    private static getClickOnElementWithOffsetScript;
}
