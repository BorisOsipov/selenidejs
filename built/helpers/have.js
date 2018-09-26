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
const conditions_1 = require("../conditions");
var have;
(function (have) {
    function exactText(value) {
        return conditions_1.Conditions.exactText(value);
    }
    have.exactText = exactText;
    function text(value) {
        return conditions_1.Conditions.text(value);
    }
    have.text = text;
    function attribute(attributeName, attributeValue) {
        return attributeValue === undefined
            ? conditions_1.Conditions.attribute(attributeName)
            : conditions_1.Conditions.atributeWithValue(attributeName, attributeValue);
    }
    have.attribute = attribute;
    function exactAttribute(attributeName, attributeValue) {
        return conditions_1.Conditions.attributeWithExactValue(attributeName, attributeValue);
    }
    have.exactAttribute = exactAttribute;
    function value(value) {
        return attribute('value', value);
    }
    have.value = value;
    function cssClass(cssClass) {
        return conditions_1.Conditions.cssClass(cssClass);
    }
    have.cssClass = cssClass;
    function size(size) {
        return conditions_1.Conditions.size(size);
    }
    have.size = size;
    function sizeGreaterThan(size) {
        return conditions_1.Conditions.sizeGreaterThan(size);
    }
    have.sizeGreaterThan = sizeGreaterThan;
    function texts(...texts) {
        return conditions_1.Conditions.texts(...texts);
    }
    have.texts = texts;
    function exactTexts(...texts) {
        return conditions_1.Conditions.exactTexts(...texts);
    }
    have.exactTexts = exactTexts;
    function url(urlPart) {
        return conditions_1.Conditions.url(urlPart);
    }
    have.url = url;
    function urlPart(urlPart) {
        return conditions_1.Conditions.urlPart(urlPart);
    }
    have.urlPart = urlPart;
    function tabsSize(size) {
        return conditions_1.Conditions.tabsSize(size);
    }
    have.tabsSize = tabsSize;
    function tabsSizeGreaterThan(size) {
        return conditions_1.Conditions.tabsSizeGreaterThan(size);
    }
    have.tabsSizeGreaterThan = tabsSizeGreaterThan;
})(have = exports.have || (exports.have = {}));
//# sourceMappingURL=have.js.map