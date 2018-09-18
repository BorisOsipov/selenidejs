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

import { By, Key, WebElement } from 'selenium-webdriver';
import { Click } from '../commands/click';
import { ClickByJs } from '../commands/clickByJs';
import { ContextClick } from '../commands/contextClick';
import { DoubleClick } from '../commands/doubleClick';
import { Hover } from '../commands/hover';
import { PerformActionOnVisible } from '../commands/performActionOnVisible';
import { PressKey } from '../commands/pressKey';
import { ScrollIntoView } from '../commands/scrollIntoView';
import { SendKeys } from '../commands/sendKeys';
import { SetValue } from '../commands/setValue';
import { SetValueByJs } from '../commands/setValueByJs';
import { Condition } from '../conditions/condition';
import { ElementCondition } from '../conditions/elementCondition';
import { be } from '../conditions/helpers/be';
import { With } from '../locators/with';
import { Utils } from '../utils';
import { Collection } from './collection';
import { Driver } from './driver';
import { ElementActionHooks } from './hooks/elementActionHooks';
import { HookExecutor } from './hooks/hookExecutor';
import { ByWebElementLocator } from './locators/byWebElementLocator';
import { ByWebElementsLocator } from './locators/byWebElementsLocator';
import { Locator } from './locators/locator';
import { SearchContext } from './SearchContext';
import { Wait } from './wait';


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
    async click() {
        await new PerformActionOnVisible(new HookExecutor<Element>(this.driver, this), new Click()).perform(this);
    }

    @ElementActionHooks
    async clickByJS() {
        await new PerformActionOnVisible(new HookExecutor<Element>(this.driver, this), new ClickByJs(this.driver)).perform(this);
    }

    @ElementActionHooks
    async setValue(value: string | number) {
        await new PerformActionOnVisible(new HookExecutor<Element>(this.driver, this), new SetValue(value)).perform(this);
    }

    @ElementActionHooks
    async setValueByJS(value: string | number) {
        await new PerformActionOnVisible(new HookExecutor<Element>(this.driver, this), new SetValueByJs(this.driver, value)).perform(this);
    }

    @ElementActionHooks
    async sendKeys(value: string | number) {
        await new PerformActionOnVisible(new HookExecutor<Element>(this.driver, this), new SendKeys(value)).perform(this);
    }

    @ElementActionHooks
    async doubleClick() {
        await new PerformActionOnVisible(new HookExecutor<Element>(this.driver, this), new DoubleClick(this.driver)).perform(this);
    }

    @ElementActionHooks
    async hover() {
        await new PerformActionOnVisible(new HookExecutor<Element>(this.driver, this), new Hover(this.driver)).perform(this);
    }

    @ElementActionHooks
    async contextClick() {
        await new PerformActionOnVisible(new HookExecutor<Element>(this.driver, this), new ContextClick(this.driver)).perform(this);
    }

    @ElementActionHooks
    async pressEnter() {
        await new PerformActionOnVisible(new HookExecutor<Element>(this.driver, this), new PressKey(Key.ENTER)).perform(this);
    }

    @ElementActionHooks
    async pressEscape() {
        await new PerformActionOnVisible(new HookExecutor<Element>(this.driver, this), new PressKey(Key.ESCAPE)).perform(this);
    }

    @ElementActionHooks
    async pressTab() {
        await new PerformActionOnVisible(new HookExecutor<Element>(this.driver, this), new PressKey(Key.TAB)).perform(this);
    }

    @ElementActionHooks
    async scrollIntoView() {
        await new PerformActionOnVisible(new HookExecutor<Element>(this.driver, this), new ScrollIntoView(this.driver)).perform(this);
    }

    async should(condition: ElementCondition, timeout?: number): Promise<Element> {
        return this.wait.shouldMatch(condition, timeout);
    }

    async shouldNot(condition: ElementCondition): Promise<Element> {
        return this.should(Condition.not(condition));
    }

    async is(condition: ElementCondition, timeout?: number): Promise<boolean> {
        return this.wait.isMatch(condition, timeout);
    }

    async isNot(condition: ElementCondition): Promise<boolean> {
        return this.is(Condition.not(condition));
    }

    async isVisible(): Promise<boolean> {
        return this.getWebElement().then(result => result.isDisplayed(), err => false);
    }

    async isPresent(): Promise<boolean> {
        return this.getWebElement().then(result => true, err => false);
    }

    async isAbsent(): Promise<boolean> {
        return this.isPresent().then(result => !result);
    }

    async text(): Promise<string> {
        await this.should(be.visible);
        return (await this.getWebElement()).getText();
    }

    async hasAttribute(attributeName: string): Promise<boolean> {
        return this.getWebElement().then(result => result.getAttribute(attributeName) !== null, err => false);
    }

    async attribute(attributeName: string): Promise<string> {
        return this.getWebElement().then(result => result.getAttribute(attributeName), err => '');
    }

    async innerHtml(): Promise<string> {
        return this.attribute('innerHTML');
    }

    async outerHtml(): Promise<string> {
        return this.attribute('outerHTML');
    }

    async value(): Promise<string> {
        return this.attribute('value');
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

    visibleElement(cssSelector: string): Element {
        return this.all(cssSelector).findBy(be.visible);
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
