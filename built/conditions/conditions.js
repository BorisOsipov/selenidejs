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
const conditionDoesNotMatchError_1 = require("../errors/conditionDoesNotMatchError");
const utils_1 = require("../utils");
const condition_1 = require("./condition");
var Conditions;
(function (Conditions) {
    /* tslint:disable:object-literal-shorthand */
    /* tslint:disable:no-invalid-this */
    /* tslint:disable:no-invalid-this */
    /* tslint:disable:only-arrow-functions */
    Conditions.present = condition_1.Condition.create('be present', async function (element) {
        await element.getWebElement().catch(error => {
            throw new conditionDoesNotMatchError_1.ConditionDoesNotMatchError('be present');
        });
    });
    Conditions.absent = condition_1.Condition.create('be absent', async function (element) {
        await element.getWebElement().then(result => {
            throw new conditionDoesNotMatchError_1.ConditionDoesNotMatchError('be absent');
        }, error => {
        });
    });
    Conditions.focused = condition_1.Condition.create('be focused', async function (element) {
        const driver = utils_1.Utils.getDriver(element);
        const script = 'return document.activeElement';
        const currentElement = await element.getWebElement();
        const focusedElement = await driver.executeScript(script);
        if (!focusedElement) {
            throw new conditionDoesNotMatchError_1.ConditionDoesNotMatchError('be focused');
        }
        if (!selenium_webdriver_1.WebElement.equals(focusedElement, currentElement)) {
            throw new conditionDoesNotMatchError_1.ConditionDoesNotMatchError('be focused');
        }
    });
    Conditions.visible = condition_1.Condition.create('be visible', async function (element) {
        try {
            const webelement = await element.getWebElement();
            if (!await webelement.isDisplayed()) {
                throw new Error();
            }
        }
        catch (error) {
            throw new conditionDoesNotMatchError_1.ConditionDoesNotMatchError('be visible');
        }
    });
    Conditions.hidden = condition_1.Condition.create('be hidden', async function (element) {
        const webelement = await element.getWebElement();
        if (await webelement.isDisplayed()) {
            throw new conditionDoesNotMatchError_1.ConditionDoesNotMatchError('be hidden');
        }
    });
    function text(text) {
        return condition_1.Condition.create(`have text '${text}'`, async function (element) {
            let actualText;
            try {
                const webelement = await element.getWebElement();
                actualText = await webelement.getText();
            }
            catch (ignored) {
            }
            if (!actualText.includes((String(text)))) {
                throw new conditionDoesNotMatchError_1.ConditionDoesNotMatchError(`have text '${text}', but was '${actualText}'`);
            }
        });
    }
    Conditions.text = text;
    function exactText(text) {
        return condition_1.Condition.create(`have exact text '${text}'`, async function (element) {
            let actualText;
            try {
                const webelement = await element.getWebElement();
                actualText = await webelement.getText();
            }
            catch (ignored) {
            }
            if (actualText !== String(text)) {
                throw new conditionDoesNotMatchError_1.ConditionDoesNotMatchError(`have exact text '${text}', but was '${actualText}'`);
            }
        });
    }
    Conditions.exactText = exactText;
    function attribute(attributeName) {
        return condition_1.Condition.create(`have attribute '${attributeName}'`, async function (element) {
            let attribute;
            try {
                const webelement = await element.getWebElement();
                attribute = await webelement.getAttribute(attributeName);
            }
            catch (ignored) {
            }
            if (attribute === null) {
                throw new conditionDoesNotMatchError_1.ConditionDoesNotMatchError(`have attribute '${attributeName}'`);
            }
        });
    }
    Conditions.attribute = attribute;
    Conditions.selected = condition_1.Condition.create('be selected', async function (element) {
        let attribute;
        try {
            const webelement = await element.getWebElement();
            attribute = await webelement.getAttribute('selected');
        }
        catch (ignored) {
        }
        if (attribute === null) {
            throw new conditionDoesNotMatchError_1.ConditionDoesNotMatchError(this.toString());
        }
    });
    function atributeWithValue(attributeName, attributeValue) {
        return condition_1.Condition.create(`have attribute '${attributeName}' with value '${attributeValue}'`, async function (element) {
            let actualValue;
            try {
                actualValue = await element.attribute(attributeName);
            }
            catch (ignored) {
            }
            if (!actualValue.includes(attributeValue)) {
                throw new conditionDoesNotMatchError_1.ConditionDoesNotMatchError(`${this.toString()}, but was '${actualValue}'`);
            }
        });
    }
    Conditions.atributeWithValue = atributeWithValue;
    function attributeWithExactValue(attributeName, attributeValue) {
        return condition_1.Condition.create(`have attribute '${attributeName}' with exact value '${attributeValue}'`, async function (element) {
            let actualValue;
            try {
                actualValue = await element.attribute(attributeName);
            }
            catch (ignored) {
            }
            if (String(attributeValue) !== actualValue) {
                throw new conditionDoesNotMatchError_1.ConditionDoesNotMatchError(`${this.toString()}, but was '${actualValue}'`);
            }
        });
    }
    Conditions.attributeWithExactValue = attributeWithExactValue;
    function cssClass(cssClass) {
        return condition_1.Condition.create(`have css class '${cssClass}'`, async function (element) {
            let actualCssClass;
            try {
                actualCssClass = await element.attribute('class');
            }
            catch (ignored) {
            }
            if (!actualCssClass.split(' ').includes(cssClass)) {
                throw new conditionDoesNotMatchError_1.ConditionDoesNotMatchError(`${this.toString()}, but was '${actualCssClass}'`);
            }
        });
    }
    Conditions.cssClass = cssClass;
    function size(size) {
        return condition_1.Condition.create(`have size '${size}'`, async function (collection) {
            let actualCollectionSize;
            try {
                actualCollectionSize = await collection.size();
            }
            catch (ignored) {
            }
            if (size !== actualCollectionSize) {
                throw new conditionDoesNotMatchError_1.ConditionDoesNotMatchError(`${this.toString()}, but was '${actualCollectionSize}'`);
            }
        });
    }
    Conditions.size = size;
    function sizeGreaterThan(size) {
        return condition_1.Condition.create(`have size more than '${size}'`, async function (collection) {
            let actualCollectionSize;
            try {
                actualCollectionSize = await collection.size();
            }
            catch (ignored) {
            }
            if (size >= actualCollectionSize) {
                throw new conditionDoesNotMatchError_1.ConditionDoesNotMatchError(`${this.toString()}, but was '${actualCollectionSize}'`);
            }
        });
    }
    Conditions.sizeGreaterThan = sizeGreaterThan;
    function texts(...texts) {
        return condition_1.Condition.create(`have exact texts '${texts}'`, async function (collection) {
            const actualTexts = [];
            let success = false;
            try {
                const actualElements = await collection.getWebElements();
                for (const webElement of actualElements) {
                    actualTexts.push(await webElement.getText());
                }
                if (texts.length !== actualTexts.length) {
                    throw new Error();
                }
                for (let i = 0; i < texts.length; i++) {
                    if (!actualTexts[i].includes(String(texts[i]))) {
                        throw new Error();
                    }
                }
                success = true;
            }
            catch (ignored) {
            }
            if (!success) {
                throw new conditionDoesNotMatchError_1.ConditionDoesNotMatchError(`${this.toString()}, but was '${actualTexts}'`);
            }
        });
    }
    Conditions.texts = texts;
    function exactTexts(...texts) {
        return condition_1.Condition.create(`have exact texts '${texts}'`, async function (collection) {
            const actualTexts = [];
            let success;
            try {
                const actualElements = await collection.getWebElements();
                for (const webElement of actualElements) {
                    actualTexts.push(await webElement.getText());
                }
                if (texts.length !== actualTexts.length) {
                    throw new Error();
                }
                for (let i = 0; i < texts.length; i++) {
                    if (actualTexts[i] !== texts[i]) {
                        throw new Error();
                    }
                }
                success = true;
            }
            catch (ignored) {
            }
            if (!success) {
                throw new conditionDoesNotMatchError_1.ConditionDoesNotMatchError(`${this.toString()}, but was '${actualTexts}'`);
            }
        });
    }
    Conditions.exactTexts = exactTexts;
    function urlPart(urlPart) {
        return condition_1.Condition.create(`have url part '${urlPart}'`, async function (driver) {
            let actualUrl;
            try {
                actualUrl = await driver.configuration.webdriver.getCurrentUrl();
            }
            catch (ignored) {
            }
            if (!actualUrl.includes(urlPart)) {
                throw new conditionDoesNotMatchError_1.ConditionDoesNotMatchError(`${this.toString()}, but was '${actualUrl}'`);
            }
        });
    }
    Conditions.urlPart = urlPart;
    function url(url) {
        return condition_1.Condition.create(`have url '${url}'`, async function (driver) {
            let actualUrl;
            try {
                actualUrl = await driver.configuration.webdriver.getCurrentUrl();
            }
            catch (ignored) {
            }
            if (actualUrl !== url) {
                throw new conditionDoesNotMatchError_1.ConditionDoesNotMatchError(`${this.toString()}, but was '${actualUrl}'`);
            }
        });
    }
    Conditions.url = url;
    function tabsSize(size) {
        return condition_1.Condition.create(`have tabs size '${size}'`, async function (driver) {
            let tabs = [];
            try {
                tabs = await driver.configuration.webdriver.getAllWindowHandles();
            }
            catch (ignored) {
            }
            if (tabs.length !== size) {
                throw new conditionDoesNotMatchError_1.ConditionDoesNotMatchError(`${this.toString()}, but was ${tabs.length}`);
            }
        });
    }
    Conditions.tabsSize = tabsSize;
    function tabsSizeGreaterThan(size) {
        return condition_1.Condition.create(`have tabs size greater than '${size}'`, async function (driver) {
            let tabs = [];
            try {
                tabs = await driver.configuration.webdriver.getAllWindowHandles();
            }
            catch (ignored) {
            }
            if (tabs.length <= size) {
                throw new conditionDoesNotMatchError_1.ConditionDoesNotMatchError(`${this.toString()}, but was ${tabs.length}`);
            }
        });
    }
    Conditions.tabsSizeGreaterThan = tabsSizeGreaterThan;
})(Conditions = exports.Conditions || (exports.Conditions = {}));
//# sourceMappingURL=conditions.js.map