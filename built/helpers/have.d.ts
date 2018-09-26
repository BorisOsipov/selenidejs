export declare namespace have {
    function exactText(value: string | number): import("../condition").Condition<import("../element").Element>;
    function text(value: string | number): import("../condition").Condition<import("../element").Element>;
    function attribute(attributeName: string, attributeValue?: string | number): import("../condition").Condition<import("../element").Element>;
    function exactAttribute(attributeName: string, attributeValue: string | number): import("../condition").Condition<{}>;
    function value(value: string | number): import("../condition").Condition<import("../element").Element>;
    function cssClass(cssClass: string): import("../condition").Condition<import("../element").Element>;
    function size(size: number): import("../condition").Condition<{}>;
    function sizeGreaterThan(size: number): import("../condition").Condition<{}>;
    function texts(...texts: string[]): import("../condition").Condition<{}>;
    function exactTexts(...texts: string[]): import("../condition").Condition<{}>;
    function url(urlPart: string): import("../condition").Condition<{}>;
    function urlPart(urlPart: string): import("../condition").Condition<{}>;
    function tabsSize(size: number): import("../condition").Condition<{}>;
    function tabsSizeGreaterThan(size: number): import("../condition").Condition<{}>;
}
