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

import { WebElement } from 'selenium-webdriver';
import { Collection } from '../collection';
import { ElementCondition } from '../conditions/elementCondition';
import { Locator } from './locator';


export class ByFilteredWebElementsLocator implements Locator<Promise<WebElement[]>> {

    private readonly elementCondition: ElementCondition;
    private readonly searchContext: Collection;

    constructor(condition: ElementCondition, searchContext: Collection) {
        this.elementCondition = condition;
        this.searchContext = searchContext;
    }

    async find(): Promise<WebElement[]> {
        const webElements = await this.searchContext.getWebElements();

        const result: WebElement[] = [];
        for (let i = 0; i < webElements.length; i++) {
            try {
                await this.elementCondition.matches(this.searchContext.get(i));
                result.push(webElements[i]);
            } catch (ignored) {
            }
        }
        return result;
    }

    toString(): string {
        return `${this.searchContext.toString()}.filteredBy(${this.elementCondition.toString()})`;
    }

}
