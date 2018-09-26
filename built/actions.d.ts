/// <reference types="node" />
import { Driver } from './driver';
import { Element } from './element';
export declare namespace Actions {
    function click(element: Element): Promise<Element>;
    function contextClick(element: Element): Promise<Element>;
    function doubleClick(element: Element): Promise<Element>;
    function hover(element: Element): Promise<Element>;
    function pressKey(key: string): (element: Element) => Promise<any>;
    const pressEnter: (element: Element) => Promise<any>;
    const pressEscape: (element: Element) => Promise<any>;
    const pressTab: (element: Element) => Promise<any>;
    function scrollTo(element: Element): Promise<Element>;
    function sendKeys(value: string | number): (element: Element) => Promise<any>;
    function setValue(value: string | number): (element: Element) => Promise<any>;
    function text(element: Element): Promise<any>;
    function attribute(attributeName: string): (element: Element) => Promise<string>;
    function open(url: string): (driver: Driver) => Promise<any>;
    function resizeWindow(width: number, height: number): (driver: Driver) => Promise<any>;
    function refresh(driver: Driver): Promise<any>;
    function acceptAlert(driver: Driver): Promise<any>;
    function url(driver: Driver): Promise<any>;
    function title(driver: Driver): Promise<any>;
    function pageSource(driver: Driver): Promise<any>;
    function executeScript(script: string | Function, ...args: any[]): (driver: Driver) => Promise<any>;
    function tabs(driver: Driver): Promise<any>;
    function nextTab(driver: Driver): Promise<any>;
    function previousTab(driver: Driver): Promise<any>;
    function switchToTab(tabId: string): (driver: Driver) => Promise<any>;
    function switchToFrame(frameElement: Element): (driver: Driver) => Promise<any>;
    function switchToDefaultFrame(driver: Driver): Promise<any>;
    function clearCacheAndCookies(driver: Driver): Promise<any>;
    function screenshot(driver: Driver): Promise<Buffer>;
    function close(driver: Driver): Promise<any>;
    function quit(driver: Driver): Promise<any>;
}
