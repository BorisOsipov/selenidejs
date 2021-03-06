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
const condition_1 = require("./conditions/condition");
const element_1 = require("./element");
const byFilteredWebElementsLocator_1 = require("./locators/byFilteredWebElementsLocator");
const byIndexedWebElementLocator_1 = require("./locators/byIndexedWebElementLocator");
const wait_1 = require("./wait");
class Collection {
    constructor(locator, driver) {
        this.locator = locator;
        this.driver = driver;
        this.wait = new wait_1.Wait(this, driver.config);
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
    get(index) {
        return new element_1.Element(new byIndexedWebElementLocator_1.ByIndexedWebElementLocator(index, this), this.driver);
    }
    first() {
        return this.get(0);
    }
    filter(condition) {
        return new Collection(new byFilteredWebElementsLocator_1.ByFilteredWebElementsLocator(condition, this), this.driver);
    }
    filterBy(condition) {
        return this.filter(condition);
    }
    findBy(condition) {
        return new Collection(new byFilteredWebElementsLocator_1.ByFilteredWebElementsLocator(condition, this), this.driver)
            .get(0);
    }
    async size() {
        return (await this.getWebElements()).length;
    }
    async count() {
        return this.size();
    }
    async texts() {
        const result = [];
        for (let i = 0; i < await this.size(); i++) {
            result.push(await this.get(i).text());
        }
        return result;
    }
    async getWebElements() {
        return this.locator.find();
    }
    toString() {
        return this.locator.toString();
    }
}
exports.Collection = Collection;
//# sourceMappingURL=collection.js.map