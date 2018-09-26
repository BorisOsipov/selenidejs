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

import { Conditions } from '../conditions';


export namespace have {

    export function exactText(value: string | number) {
        return Conditions.exactText(value);
    }

    export function text(value: string | number) {
        return Conditions.text(value);
    }

    export function attribute(attributeName: string, attributeValue?: string | number) {
        return attributeValue === undefined
            ? Conditions.attribute(attributeName)
            : Conditions.atributeWithValue(attributeName, attributeValue);
    }

    export function exactAttribute(attributeName: string, attributeValue: string | number) {
        return Conditions.attributeWithExactValue(attributeName, attributeValue);
    }

    export function value(value: string | number) {
        return attribute('value', value);
    }

    export function cssClass(cssClass: string) {
        return Conditions.cssClass(cssClass);
    }

    export function size(size: number) {
        return Conditions.size(size);
    }

    export function sizeGreaterThan(size: number) {
        return Conditions.sizeGreaterThan(size);
    }

    export function texts(...texts: string[]) {
        return Conditions.texts(...texts);
    }

    export function exactTexts(...texts: string[]) {
        return Conditions.exactTexts(...texts);
    }

    export function url(urlPart: string) {
        return Conditions.url(urlPart);
    }

    export function urlPart(urlPart: string) {
        return Conditions.urlPart(urlPart);
    }

    export function tabsSize(size: number) {
        return Conditions.tabsSize(size);
    }

    export function tabsSizeGreaterThan(size: number) {
        return Conditions.tabsSizeGreaterThan(size);
    }

}
