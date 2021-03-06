/// <reference types="node" />
import { ActionSequence, By } from 'selenium-webdriver';
import { Collection } from './collection';
import { DriverCondition } from './conditions/driverCondition';
import { Configuration } from './configuration';
import { Element } from './element';
import { Wait } from './wait';
export declare class Driver {
    readonly config: Configuration;
    readonly wait: Wait<Driver>;
    constructor(config?: Configuration);
    get(url: string): Promise<void>;
    close(): Promise<void>;
    quit(): Promise<void>;
    refresh(): Promise<void>;
    acceptAlert(): Promise<void>;
    url(): Promise<string>;
    title(): Promise<string>;
    pageSource(): Promise<string>;
    screenshot(): Promise<Buffer>;
    resizeWindow(width: number, height: number): Promise<void>;
    actions(): ActionSequence;
    element(cssOrXpathOrBy: string | By): Element;
    all(cssOrXpathOrBy: string | By): Collection;
    should(condition: DriverCondition, timeout?: number): Promise<Driver>;
    shouldNot(condition: DriverCondition, timeout?: number): Promise<Driver>;
    is(condition: DriverCondition, timeout?: number): Promise<boolean>;
    isNot(condition: DriverCondition, timeout?: number): Promise<boolean>;
    executeScript(script: string | Function, ...args: any[]): Promise<{}>;
    getTabs(): Promise<string[]>;
    nextTab(): Promise<void>;
    previousTab(): Promise<void>;
    switchToTab(tabId: string): Promise<void>;
    switchToFrame(frameElement: Element): Promise<void>;
    switchToDefaultFrame(): Promise<void>;
    clearCacheAndCookies(): Promise<void>;
    toString(): string;
}
