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

import { ActionSequence, By, WebElement } from 'selenium-webdriver';
import { Condition } from '../conditions/condition';
import { DriverCondition } from '../conditions/driverCondition';
import { FullpageScreenshot } from '../queries/fullpageScreenshot';
import { Utils } from '../utils';
import { Collection } from './collection';
import { Configuration } from './configuration';
import { Element } from './element';
import { perform } from './helpers/perform';
import { take } from './helpers/take';
import { HookExecutor } from './hooks/hookExecutor';
import { ByWebElementLocator } from './locators/byWebElementLocator';
import { ByWebElementsLocator } from './locators/byWebElementsLocator';
import { SearchContext } from './SearchContext';
import { Wait } from './wait';


export class Driver implements SearchContext {

    readonly configuration: Configuration;
    readonly wait: Wait<Driver>;

    constructor(customConfiguration: Configuration) {
        this.configuration = new Configuration(customConfiguration);
        this.wait = new Wait(this, this.configuration, new HookExecutor<Driver>(this, this));
    }

    async open(url: string) {
        if (this.configuration.windowHeight && this.configuration.windowWidth) {
            await this.resizeWindow(this.configuration.windowWidth, this.configuration.windowHeight);
        }
        return perform.open(url)(this);
    }

    async resizeWindow(width: number, height: number) {
        return perform.resizeWindow(width, height)(this);
    }

    async close() {
        await this.configuration.webdriver.close();
    }

    async quit() {
        await this.configuration.webdriver.quit();
    }

    async refresh() {
        return perform.refresh(this);
    }

    async acceptAlert() {
        return perform.acceptAlert(this);
    }

    async url(): Promise<string> {
        return take.url(this);
    }

    async title(): Promise<string> {
        return take.title(this);
    }

    async pageSource(): Promise<string> {
        return take.pageSource(this);
    }

    /* tslint:disable:ban-types */
    async executeScript(script: string | Function, ...args: any[]) {
        return perform.executeScript(script, ...args)(this);
    }

    /* tslint:enable:ban-types */

    async getTabs() {
        return take.tabs(this);
    }

    async nextTab() {
        return perform.nextTab(this);
    }

    async previousTab() {
        return perform.previousTab(this);
    }

    async switchToTab(tabId: string) {
        return perform.switchToTab(tabId)(this);
    }

    async switchToFrame(frameElement: Element) {
        return perform.switchToFrame(frameElement)(this);
    }

    async switchToDefaultFrame() {
        return perform.switchToDefaultFrame(this);
    }

    async clearCacheAndCookies() {
        return perform.clearCacheAndCookies(this);
    }

    async screenshot(): Promise<Buffer> {
        return this.configuration.fullpageScreenshot
            ? new FullpageScreenshot().perform(this)
            : Buffer.from(await this.configuration.webdriver.takeScreenshot(), 'base64');
    }

    actions(): ActionSequence {
        return this.configuration.webdriver.actions();
    }

    element(cssOrXpathOrBy: string | By): Element {
        const by = Utils.toBy(cssOrXpathOrBy);
        const locator = new ByWebElementLocator(by, this);
        return new Element(locator, this);
    }

    all(cssOrXpathOrBy: string | By): Collection {
        const by = Utils.toBy(cssOrXpathOrBy);
        const locator = new ByWebElementsLocator(by, this);
        return new Collection(locator, this);
    }

    async should(condition: DriverCondition, timeout?: number): Promise<Driver> {
        return timeout
            ? this.wait.shouldMatch(condition, timeout)
            : this.wait.shouldMatch(condition);
    }

    async shouldNot(condition: DriverCondition, timeout?: number): Promise<Driver> {
        return this.should(Condition.not(condition), timeout);
    }

    async is(condition: DriverCondition, timeout?: number): Promise<boolean> {
        return timeout
            ? this.wait.isMatch(condition, timeout)
            : this.wait.isMatch(condition);
    }

    async isNot(condition: DriverCondition, timeout?: number): Promise<boolean> {
        return this.is(Condition.not(condition), timeout);
    }

    async findElements(locator: By): Promise<WebElement[]> {
        return this.configuration.webdriver.findElements(locator);
    }

    async findElement(locator: By): Promise<WebElement> {
        return this.configuration.webdriver.findElement(locator);
    }

    toString() {
        return 'browser';
    }

}
