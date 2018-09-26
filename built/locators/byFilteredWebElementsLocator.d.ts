import { WebElement } from 'selenium-webdriver';
import { Collection } from '../collection';
import { Element } from '../element';
import { Condition } from '../index';
import { Locator } from './locator';
export declare class ByFilteredWebElementsLocator implements Locator<Promise<WebElement[]>> {
    private readonly elementCondition;
    private readonly collection;
    constructor(condition: Condition<Element>, collection: Collection);
    find(): Promise<WebElement[]>;
    toString(): string;
}
