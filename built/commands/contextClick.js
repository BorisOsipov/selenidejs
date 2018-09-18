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
const selenium_webdriver_1 = require("selenium-webdriver");
class ContextClick {
    constructor(driver) {
        this.driver = driver;
    }
    async perform(element) {
        const webelement = await element.getWebElement();
        await this.driver.actions().click(webelement, String(selenium_webdriver_1.Button.RIGHT)).perform();
    }
    toString() {
        return 'contextClick';
    }
}
exports.ContextClick = ContextClick;
//# sourceMappingURL=contextClick.js.map