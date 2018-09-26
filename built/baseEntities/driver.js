"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const condition_1 = require("../conditions/condition");
const fullpageScreenshot_1 = require("../queries/fullpageScreenshot");
const utils_1 = require("../utils");
const collection_1 = require("./collection");
const configuration_1 = require("./configuration");
const element_1 = require("./element");
const perform_1 = require("./helpers/perform");
const take_1 = require("./helpers/take");
const hookExecutor_1 = require("./hooks/hookExecutor");
const byWebElementLocator_1 = require("./locators/byWebElementLocator");
const byWebElementsLocator_1 = require("./locators/byWebElementsLocator");
const wait_1 = require("./wait");
class Driver {
    constructor(customConfiguration) {
        this.configuration = new configuration_1.Configuration(customConfiguration);
        this.wait = new wait_1.Wait(this, this.configuration, new hookExecutor_1.HookExecutor(this, this));
    }
    async open(url) {
        if (this.configuration.windowHeight && this.configuration.windowWidth) {
            await this.resizeWindow(this.configuration.windowWidth, this.configuration.windowHeight);
        }
        return perform_1.perform.open(url)(this);
    }
    async resizeWindow(width, height) {
        return perform_1.perform.resizeWindow(width, height)(this);
    }
    async close() {
        return perform_1.perform.close(this);
    }
    async quit() {
        return perform_1.perform.quit(this);
    }
    async refresh() {
        return perform_1.perform.refresh(this);
    }
    async acceptAlert() {
        return perform_1.perform.acceptAlert(this);
    }
    async url() {
        return take_1.take.url(this);
    }
    async title() {
        return take_1.take.title(this);
    }
    async pageSource() {
        return take_1.take.pageSource(this);
    }
    /* tslint:disable:ban-types */
    async executeScript(script, ...args) {
        return perform_1.perform.executeScript(script, ...args)(this);
    }
    /* tslint:enable:ban-types */
    async getTabs() {
        return take_1.take.tabs(this);
    }
    async nextTab() {
        return perform_1.perform.nextTab(this);
    }
    async previousTab() {
        return perform_1.perform.previousTab(this);
    }
    async switchToTab(tabId) {
        return perform_1.perform.switchToTab(tabId)(this);
    }
    async switchToFrame(frameElement) {
        return perform_1.perform.switchToFrame(frameElement)(this);
    }
    async switchToDefaultFrame() {
        return perform_1.perform.switchToDefaultFrame(this);
    }
    async clearCacheAndCookies() {
        return perform_1.perform.clearCacheAndCookies(this);
    }
    async screenshot() {
        return this.configuration.fullpageScreenshot
            ? new fullpageScreenshot_1.FullpageScreenshot().perform(this)
            : Buffer.from(await this.configuration.webdriver.takeScreenshot(), 'base64');
    }
    actions() {
        return this.configuration.webdriver.actions();
    }
    element(cssOrXpathOrBy) {
        const by = utils_1.Utils.toBy(cssOrXpathOrBy);
        const locator = new byWebElementLocator_1.ByWebElementLocator(by, this);
        return new element_1.Element(locator, this);
    }
    all(cssOrXpathOrBy) {
        const by = utils_1.Utils.toBy(cssOrXpathOrBy);
        const locator = new byWebElementsLocator_1.ByWebElementsLocator(by, this);
        return new collection_1.Collection(locator, this);
    }
    async should(condition, timeout) {
        return timeout
            ? this.wait.shouldMatch(condition, timeout)
            : this.wait.shouldMatch(condition);
    }
    async shouldNot(condition, timeout) {
        return this.should(condition_1.Condition.not(condition), timeout);
    }
    async is(condition, timeout) {
        return timeout
            ? this.wait.isMatch(condition, timeout)
            : this.wait.isMatch(condition);
    }
    async isNot(condition, timeout) {
        return this.is(condition_1.Condition.not(condition), timeout);
    }
    async findElements(locator) {
        return this.configuration.webdriver.findElements(locator);
    }
    async findElement(locator) {
        return this.configuration.webdriver.findElement(locator);
    }
    toString() {
        return 'browser';
    }
}
exports.Driver = Driver;
//# sourceMappingURL=driver.js.map