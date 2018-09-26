// Copyright 2018 Knowledge Expert SA
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { By, WebElement } from 'selenium-webdriver';
import { Collection } from './collection';
import { Condition } from './condition';
import { Driver } from './driver';
import { perform } from './helpers/perform';
import { take } from './helpers/take';
import { ElementActionHooks } from './hooks/elementActionHooks';
import { HookExecutor } from './hooks/hookExecutor';
import { ByWebElementLocator } from './locators/byWebElementLocator';
import { ByWebElementsLocator } from './locators/byWebElementsLocator';
import { Locator } from './locators/locator';
import { SearchContext } from './locators/searchContext';
import { Utils } from './utils';
import { Wait } from './wait';
import { With } from './with';


export class Element implements SearchContext {

    private readonly driver: Driver;
    private readonly locator: Locator<Promise<WebElement>>;
    private readonly wait: Wait<Element>;

    constructor(locator: Locator<Promise<WebElement>>, driver: Driver) {
        this.locator = locator;
        this.driver = driver;
        this.wait = new Wait<Element>(this, this.driver.configuration, new HookExecutor<Element>(driver, this));
    }

    @ElementActionHooks
    async click(): Promise<Element> {
        return perform.click(this);
    }

    @ElementActionHooks
    async setValue(value: string | number): Promise<Element> {
        return perform.setValue(value)(this);
    }

    @ElementActionHooks
    async sendKeys(value: string | number): Promise<Element> {
        return perform.sendKeys(value)(this);
    }

    @ElementActionHooks
    async doubleClick(): Promise<Element> {
        return perform.doubleClick(this);
    }

    @ElementActionHooks
    async hover(): Promise<Element> {
        return perform.hover(this);
    }

    @ElementActionHooks
    async contextClick(): Promise<Element> {
        return perform.contextClick(this);
    }

    @ElementActionHooks
    async pressEnter(): Promise<Element> {
        return perform.pressEnter(this);
    }

    @ElementActionHooks
    async pressEscape(): Promise<Element> {
        return perform.pressEscape(this);
    }

    @ElementActionHooks
    async pressTab(): Promise<Element> {
        return perform.pressTab(this);
    }

    @ElementActionHooks
    async pressKey(key: string): Promise<Element> {
        return perform.pressKey(key)(this);
    }

    @ElementActionHooks
    async scrollTo(): Promise<Element> {
        return perform.scrollTo(this);
    }

    async should(condition: Condition<Element>, timeout?: number): Promise<Element> {
        return this.wait.shouldMatch(condition, timeout);
    }

    async shouldNot(condition: Condition<Element>): Promise<Element> {
        return this.should(Condition.not(condition));
    }

    async is(condition: Condition<Element>, timeout?: number): Promise<boolean> {
        return this.wait.isMatch(condition, timeout);
    }

    async isNot(condition: Condition<Element>): Promise<boolean> {
        return this.is(Condition.not(condition));
    }

    async isVisible(): Promise<boolean> {
        return this.getWebElement().then(result => result.isDisplayed(), err => false);
    }

    async isPresent(): Promise<boolean> {
        return this.getWebElement().then(result => true, err => false);
    }

    async isAbsent(): Promise<boolean> {
        return this.isPresent().then(isPresent => !isPresent);
    }

    async text(): Promise<string> {
        return take.text(this);
    }

    async hasAttribute(attributeName: string): Promise<boolean> {
        return take.attribute(attributeName)(this).then(result => true, err => false);
    }

    async attribute(attributeName: string): Promise<string> {
        return take.attribute(attributeName)(this);
    }

    async innerHtml(): Promise<string> {
        return take.innerHtml(this);
    }

    async outerHtml(): Promise<string> {
        return take.outerHtml(this);
    }

    async value(): Promise<string> {
        return take.value(this);
    }

    async getWebElement(): Promise<WebElement> {
        return this.locator.find();
    }

    parent(): Element {
        return this.element(With.xpath('./..'));
    }

    followingSibling(predicate: string = ''): Element {
        return this.element(With.xpath('./following-sibling::*' + predicate));
    }

    element(cssOrXpathOrBy: string | By): Element {
        const by = Utils.toBy(cssOrXpathOrBy);
        const locator = new ByWebElementLocator(by, this);
        return new Element(locator, this.driver);
    }

    all(cssOrXpathOrBy: string | By): Collection {
        const by = Utils.toBy(cssOrXpathOrBy);
        const locator = new ByWebElementsLocator(by, this);
        return new Collection(locator, this.driver);
    }

    async equals(element: Element) {
        return WebElement.equals(await this.getWebElement(), await element.getWebElement());
    }

    async findElements(locator: By): Promise<WebElement[]> {
        return this.getWebElement().then(root => root.findElements(locator));
    }

    async findElement(locator: By): Promise<WebElement> {
        return this.getWebElement().then(root => root.findElement(locator));
    }

    toString(): string {
        return this.locator.toString();
    }

}
