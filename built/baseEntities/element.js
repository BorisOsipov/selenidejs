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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const selenium_webdriver_1 = require("selenium-webdriver");
const condition_1 = require("../conditions/condition");
const with_1 = require("../locators/with");
const utils_1 = require("../utils");
const collection_1 = require("./collection");
const perform_1 = require("./helpers/perform");
const take_1 = require("./helpers/take");
const elementActionHooks_1 = require("./hooks/elementActionHooks");
const hookExecutor_1 = require("./hooks/hookExecutor");
const byWebElementLocator_1 = require("./locators/byWebElementLocator");
const byWebElementsLocator_1 = require("./locators/byWebElementsLocator");
const wait_1 = require("./wait");
class Element {
    constructor(locator, driver) {
        this.locator = locator;
        this.driver = driver;
        this.wait = new wait_1.Wait(this, this.driver.configuration, new hookExecutor_1.HookExecutor(driver, this));
    }
    async click() {
        return perform_1.perform.click(this);
    }
    async setValue(value) {
        return perform_1.perform.setValue(value)(this);
    }
    async sendKeys(value) {
        return perform_1.perform.sendKeys(value)(this);
    }
    async doubleClick() {
        return perform_1.perform.doubleClick(this);
    }
    async hover() {
        return perform_1.perform.hover(this);
    }
    async contextClick() {
        return perform_1.perform.contextClick(this);
    }
    async pressEnter() {
        return perform_1.perform.pressEnter(this);
    }
    async pressEscape() {
        return perform_1.perform.pressEscape(this);
    }
    async pressTab() {
        return perform_1.perform.pressTab(this);
    }
    async pressKey(key) {
        return perform_1.perform.pressKey(key)(this);
    }
    async scrollTo() {
        return perform_1.perform.scrollTo(this);
    }
    async should(condition, timeout) {
        return this.wait.shouldMatch(condition, timeout);
    }
    async shouldNot(condition) {
        return this.should(condition_1.Condition.not(condition));
    }
    async is(condition, timeout) {
        return this.wait.isMatch(condition, timeout);
    }
    async isNot(condition) {
        return this.is(condition_1.Condition.not(condition));
    }
    async isVisible() {
        return this.getWebElement().then(result => result.isDisplayed(), err => false);
    }
    async isPresent() {
        return this.getWebElement().then(result => true, err => false);
    }
    async isAbsent() {
        return this.isPresent().then(isPresent => !isPresent);
    }
    async text() {
        return take_1.take.text(this);
    }
    async hasAttribute(attributeName) {
        return take_1.take.attribute(attributeName)(this).then(result => true, err => false);
    }
    async attribute(attributeName) {
        return take_1.take.attribute(attributeName)(this);
    }
    async innerHtml() {
        return take_1.take.innerHtml(this);
    }
    async outerHtml() {
        return take_1.take.outerHtml(this);
    }
    async value() {
        return take_1.take.value(this);
    }
    async getWebElement() {
        return this.locator.find();
    }
    parent() {
        return this.element(with_1.With.xpath('./..'));
    }
    followingSibling(predicate = '') {
        return this.element(with_1.With.xpath('./following-sibling::*' + predicate));
    }
    element(cssOrXpathOrBy) {
        const by = utils_1.Utils.toBy(cssOrXpathOrBy);
        const locator = new byWebElementLocator_1.ByWebElementLocator(by, this);
        return new Element(locator, this.driver);
    }
    all(cssOrXpathOrBy) {
        const by = utils_1.Utils.toBy(cssOrXpathOrBy);
        const locator = new byWebElementsLocator_1.ByWebElementsLocator(by, this);
        return new collection_1.Collection(locator, this.driver);
    }
    async equals(element) {
        return selenium_webdriver_1.WebElement.equals(await this.getWebElement(), await element.getWebElement());
    }
    async findElements(locator) {
        return this.getWebElement().then(root => root.findElements(locator));
    }
    async findElement(locator) {
        return this.getWebElement().then(root => root.findElement(locator));
    }
    toString() {
        return this.locator.toString();
    }
}
__decorate([
    elementActionHooks_1.ElementActionHooks
], Element.prototype, "click", null);
__decorate([
    elementActionHooks_1.ElementActionHooks
], Element.prototype, "setValue", null);
__decorate([
    elementActionHooks_1.ElementActionHooks
], Element.prototype, "sendKeys", null);
__decorate([
    elementActionHooks_1.ElementActionHooks
], Element.prototype, "doubleClick", null);
__decorate([
    elementActionHooks_1.ElementActionHooks
], Element.prototype, "hover", null);
__decorate([
    elementActionHooks_1.ElementActionHooks
], Element.prototype, "contextClick", null);
__decorate([
    elementActionHooks_1.ElementActionHooks
], Element.prototype, "pressEnter", null);
__decorate([
    elementActionHooks_1.ElementActionHooks
], Element.prototype, "pressEscape", null);
__decorate([
    elementActionHooks_1.ElementActionHooks
], Element.prototype, "pressTab", null);
__decorate([
    elementActionHooks_1.ElementActionHooks
], Element.prototype, "pressKey", null);
__decorate([
    elementActionHooks_1.ElementActionHooks
], Element.prototype, "scrollTo", null);
exports.Element = Element;
//# sourceMappingURL=element.js.map