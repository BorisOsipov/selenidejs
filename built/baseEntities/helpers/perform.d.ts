import { Actions } from '../actions';
export declare namespace perform {
    const click: typeof Actions.click;
    const contextClick: typeof Actions.contextClick;
    const doubleClick: typeof Actions.doubleClick;
    const hover: typeof Actions.hover;
    const pressKey: typeof Actions.pressKey;
    const pressEnter: (element: import("../element").Element) => Promise<any>;
    const pressEscape: (element: import("../element").Element) => Promise<any>;
    const pressTab: (element: import("../element").Element) => Promise<any>;
    const scrollTo: typeof Actions.scrollTo;
    const sendKeys: typeof Actions.sendKeys;
    const setValue: typeof Actions.setValue;
    const open: typeof Actions.open;
    const close: typeof Actions.close;
    const quit: typeof Actions.quit;
    const resizeWindow: typeof Actions.resizeWindow;
    const refresh: typeof Actions.refresh;
    const acceptAlert: typeof Actions.acceptAlert;
    const executeScript: typeof Actions.executeScript;
    const nextTab: typeof Actions.nextTab;
    const previousTab: typeof Actions.previousTab;
    const switchToTab: typeof Actions.switchToTab;
    const switchToFrame: typeof Actions.switchToFrame;
    const switchToDefaultFrame: typeof Actions.switchToDefaultFrame;
    const clearCacheAndCookies: typeof Actions.clearCacheAndCookies;
}
