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
import { Collection } from './collection';
import { Condition } from './condition';
import { Driver } from './driver';
import { Element } from './element';
import { ConditionDoesNotMatchError } from './errors/conditionDoesNotMatchError';
import { Utils } from './utils';


export namespace Conditions {

    /* tslint:disable:object-literal-shorthand */
    /* tslint:disable:no-invalid-this */
    /* tslint:disable:no-invalid-this */
    /* tslint:disable:only-arrow-functions */


    export const present: Condition<Element> = Condition.create('be present', async function(element: Element) {
        await element.getWebElement().catch(error => {
            throw new ConditionDoesNotMatchError('be present');
        });
    });

    export const absent: Condition<Element> = Condition.create('be absent', async function(element: Element) {
        await element.getWebElement().then(
            result => {
                throw new ConditionDoesNotMatchError('be absent');
            },
            error => {
            }
        );
    });

    export const focused: Condition<Element> = Condition.create('be focused', async function(element: Element) {
        const driver = Utils.getDriver(element);
        const script = 'return document.activeElement';
        const currentElement = await element.getWebElement();
        const focusedElement = await driver.executeScript(script) as WebElement;
        if (!focusedElement) {
            throw new ConditionDoesNotMatchError('be focused');
        }
        if (!WebElement.equals(focusedElement, currentElement)) {
            throw new ConditionDoesNotMatchError('be focused');
        }
    });

    export const visible: Condition<Element> = Condition.create('be visible', async function(element: Element) {
        try {
            const webelement = await element.getWebElement();
            if (!await webelement.isDisplayed()) {
                throw new Error();
            }
        } catch (error) {
            throw new ConditionDoesNotMatchError('be visible');
        }
    });

    export const hidden: Condition<Element> = Condition.create('be hidden', async function(element: Element) {
        const webelement = await element.getWebElement();
        if (await webelement.isDisplayed()) {
            throw new ConditionDoesNotMatchError('be hidden');
        }
    });

    export function text(text: string | number): Condition<Element> {
        return Condition.create(`have text '${text}'`, async function(element: Element) {
            let actualText: string;
            try {
                const webelement = await element.getWebElement();
                actualText = await webelement.getText();
            } catch (ignored) {
            }
            if (!actualText.includes((String(text)))) {
                throw new ConditionDoesNotMatchError(`have text '${text}', but was '${actualText}'`);
            }
        });
    }

    export function exactText(text: string | number): Condition<Element> {
        return Condition.create(`have exact text '${text}'`, async function(element: Element) {
            let actualText: string;
            try {
                const webelement = await element.getWebElement();
                actualText = await webelement.getText();
            } catch (ignored) {
            }
            if (actualText !== String(text)) {
                throw new ConditionDoesNotMatchError(`have exact text '${text}', but was '${actualText}'`);
            }
        });
    }

    export function attribute(attributeName: string): Condition<Element> {
        return Condition.create(`have attribute '${attributeName}'`, async function(element: Element) {
            let attribute;
            try {
                const webelement = await element.getWebElement();
                attribute = await webelement.getAttribute(attributeName);
            } catch (ignored) {
            }
            if (attribute === null) {
                throw new ConditionDoesNotMatchError(`have attribute '${attributeName}'`);
            }
        });
    }

    export const selected = Condition.create('be selected', async function(element: Element) {
        let attribute;
        try {
            const webelement = await element.getWebElement();
            attribute = await webelement.getAttribute('selected');
        } catch (ignored) {
        }
        if (attribute === null) {
            throw new ConditionDoesNotMatchError(this.toString());
        }
    });

    export function atributeWithValue(attributeName: string, attributeValue: string | number) {
        return Condition.create(
            `have attribute '${attributeName}' with value '${attributeValue}'`,
            async function(element: Element) {
                let actualValue;
                try {
                    actualValue = await element.attribute(attributeName);
                } catch (ignored) {
                }
                if (!actualValue.includes(attributeValue)) {
                    throw new ConditionDoesNotMatchError(`${this.toString()}, but was '${actualValue}'`);
                }
            });
    }

    export function attributeWithExactValue(attributeName: string, attributeValue: string | number) {
        return Condition.create(
            `have attribute '${attributeName}' with exact value '${attributeValue}'`,
            async function(element: Element) {
                let actualValue;
                try {
                    actualValue = await element.attribute(attributeName);
                } catch (ignored) {
                }
                if (String(attributeValue) !== actualValue) {
                    throw new ConditionDoesNotMatchError(
                        `${this.toString()}, but was '${actualValue}'`
                    );
                }
            });
    }

    export function cssClass(cssClass: string): Condition<Element> {
        return Condition.create(`have css class '${cssClass}'`, async function(element: Element) {
            let actualCssClass;
            try {
                actualCssClass = await element.attribute('class');
            } catch (ignored) {
            }
            if (!actualCssClass.split(' ').includes(cssClass)) {
                throw new ConditionDoesNotMatchError(`${this.toString()}, but was '${actualCssClass}'`);
            }
        });
    }

    export function size(size: number) {
        return Condition.create(`have size '${size}'`, async function(collection: Collection) {
            let actualCollectionSize: number;
            try {
                actualCollectionSize = await collection.size();
            } catch (ignored) {
            }
            if (size !== actualCollectionSize) {
                throw new ConditionDoesNotMatchError(`${this.toString()}, but was '${actualCollectionSize}'`);
            }
        });
    }

    export function sizeGreaterThan(size: number) {
        return Condition.create(`have size more than '${size}'`, async function(collection: Collection) {
            let actualCollectionSize: number;
            try {
                actualCollectionSize = await collection.size();
            } catch (ignored) {
            }
            if (size >= actualCollectionSize) {
                throw new ConditionDoesNotMatchError(`${this.toString()}, but was '${actualCollectionSize}'`);
            }
        });
    }

    export function texts(...texts: Array<string | number>) {
        return Condition.create(`have exact texts '${texts}'`, async function(collection: Collection) {
            const actualTexts: string[] = [];
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
            } catch (ignored) {
            }
            if (!success) {
                throw new ConditionDoesNotMatchError(`${this.toString()}, but was '${actualTexts}'`);
            }
        });
    }

    export function exactTexts(...texts: Array<string | number>) {
        return Condition.create(`have exact texts '${texts}'`, async function(collection: Collection) {
            const actualTexts: string[] = [];
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
            } catch (ignored) {
            }
            if (!success) {
                throw new ConditionDoesNotMatchError(`${this.toString()}, but was '${actualTexts}'`);
            }
        });
    }

    export function urlPart(urlPart: string) {
        return Condition.create(`have url part '${urlPart}'`, async function(driver: Driver) {
            let actualUrl;
            try {
                actualUrl = await driver.configuration.webdriver.getCurrentUrl();
            } catch (ignored) {
            }
            if (!actualUrl.includes(urlPart)) {
                throw new ConditionDoesNotMatchError(`${this.toString()}, but was '${actualUrl}'`);
            }
        });
    }

    export function url(url: string) {
        return Condition.create(`have url '${url}'`, async function(driver: Driver) {
            let actualUrl;
            try {
                actualUrl = await driver.configuration.webdriver.getCurrentUrl();
            } catch (ignored) {
            }
            if (actualUrl !== url) {
                throw new ConditionDoesNotMatchError(`${this.toString()}, but was '${actualUrl}'`);
            }
        });
    }

    export function tabsSize(size: number) {
        return Condition.create(`have tabs size '${size}'`, async function(driver: Driver) {
            let tabs = [];
            try {
                tabs = await driver.configuration.webdriver.getAllWindowHandles();
            } catch (ignored) {
            }
            if (tabs.length !== size) {
                throw new ConditionDoesNotMatchError(`${this.toString()}, but was ${tabs.length}`);
            }
        });
    }

    export function tabsSizeGreaterThan(size: number) {
        return Condition.create(`have tabs size greater than '${size}'`, async function(driver: Driver) {
            let tabs = [];
            try {
                tabs = await driver.configuration.webdriver.getAllWindowHandles();
            } catch (ignored) {
            }
            if (tabs.length <= size) {
                throw new ConditionDoesNotMatchError(`${this.toString()}, but was ${tabs.length}`);
            }
        });
    }

}
