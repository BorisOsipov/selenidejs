import { Actions } from '../actions';
export declare namespace take {
    const text: typeof Actions.text;
    const attribute: typeof Actions.attribute;
    const innerHtml: (element: import("../element").Element) => Promise<string>;
    const outerHtml: (element: import("../element").Element) => Promise<string>;
    const value: (element: import("../element").Element) => Promise<string>;
    const screenshot: typeof Actions.screenshot;
    const url: typeof Actions.url;
    const title: typeof Actions.title;
    const pageSource: typeof Actions.pageSource;
    const tabs: typeof Actions.tabs;
}
