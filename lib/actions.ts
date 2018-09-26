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

import jimp = require('jimp');
import * as mergeImg from 'merge-img';
import { Button, Key, WebDriver, WebElement } from 'selenium-webdriver';
import { Driver } from './driver';
import { Element } from './element';
import { CannotPerformActionError } from './errors/cannotPerformActionError';
import { be } from './helpers/be';
import { HookExecutor } from './hooks/hookExecutor';
import { Utils } from './utils';


export namespace Actions {

    /* tslint:disable:only-arrow-functions */

    /* tslint:disable:space-before-function-paren */

    type ElementAction = (element: Element) => Promise<any>;
    type DriverAction = (driver: Driver) => Promise<any>;

    export async function click(element: Element): Promise<Element> {
        return Utils.getDriver(element).configuration.clickByJs
            ? clickByJs(element)
            : commonClick(element);
    }

    async function commonClick(element: Element) {
        return wrapElementAction(element, async function click(element: Element) {
            const webelement = await element.getWebElement();
            await webelement.click();
            return element;
        });
    }

    async function clickByJs(element: Element) {
        return wrapElementAction(element, async function clickByJs(element: Element) {
            const getClickOnElementWithOffsetScript = (offsetX: number, offsetY: number) => {
                return `arguments[0].dispatchEvent(new MouseEvent('click', {
                    'view': window,
                    'bubbles': true,
                    'cancelable': true,
                    'clientX': arguments[0].getClientRects()[0].left + ${offsetX},
                    'clientY': arguments[0].getClientRects()[0].top + ${offsetY}
                }))`;
            };
            const driver = Utils.getDriver(element);
            const webelement = await element.getWebElement();
            await driver.executeScript(getClickOnElementWithOffsetScript(0, 0), webelement);
            return element;
        });
    }

    export async function contextClick(element: Element): Promise<Element> {
        return wrapElementAction(element, async function contextClick(element: Element) {
            const driver = Utils.getDriver(element);
            const webelement = await element.getWebElement();
            await driver.actions().click(webelement, String(Button.RIGHT)).perform();
            return element;
        });
    }

    export async function doubleClick(element: Element): Promise<Element> {
        return wrapElementAction(element, async function doubleClick(element: Element) {
            const driver = Utils.getDriver(element);
            const webelement = await element.getWebElement();
            await driver.actions().mouseMove(webelement).perform();
            await driver.actions().doubleClick().perform();
            return element;
        });
    }

    export async function hover(element: Element): Promise<Element> {
        return wrapElementAction(element, async function hover(element: Element) {
            const driver = Utils.getDriver(element);
            const webelement = await element.getWebElement();
            await driver.actions().mouseMove(webelement).perform();
            return element;
        });
    }

    export function pressKey(key: string) {
        return (element: Element) => {
            return wrapElementAction(element, async function pressKey(element: Element) {
                const webelement = await element.getWebElement();
                await webelement.sendKeys(key);
                return element;
            });
        };
    }

    export const pressEnter = pressKey(Key.ENTER);

    export const pressEscape = pressKey(Key.ESCAPE);

    export const pressTab = pressKey(Key.TAB);

    export async function scrollTo(element: Element): Promise<Element> {
        return wrapElementAction(element, async function scrollTo(element: Element) {
            const driver = Utils.getDriver(element);
            const webelement = await element.getWebElement();
            await driver.executeScript('arguments[0].scrollIntoView(true);', webelement);
            return element;
        });
    }

    export function sendKeys(value: string | number) {
        return (element: Element) => {
            return wrapElementAction(element, async function sendKeys(element: Element) {
                const webelement = await element.getWebElement();
                await webelement.sendKeys(value);
                return element;
            });
        };
    }

    export function setValue(value: string | number) {
        return (element: Element) => Utils.getDriver(element).configuration.setValueByJs
            ? commonSetValue(element, value)
            : setValueByJs(element, value);
    }

    function commonSetValue(element: Element, value: string | number) {
        return wrapElementAction(element, async function setValue(element: Element) {
            const webelement = await element.getWebElement();
            await webelement.clear();
            await webelement.sendKeys(String(value));
            return element;
        });
    }

    function setValueByJs(element: Element, value: string | number) {
        return wrapElementAction(element, async function setValueByJs(element: Element) {
            const webelement = await element.getWebElement();
            const driver = Utils.getDriver(element);
            const script =
                `return (function(webelement, text) {
                        var maxlength = webelement.getAttribute('maxlength') === null
                            ? -1
                            : parseInt(webelement.getAttribute('maxlength'));
                        webelement.value = maxlength === -1
                            ? text
                            : text.length <= maxlength ? text
                                : text.substring(0, maxlength);
                        return null;
                    })(arguments[0], arguments[1]);`;

            await webelement.clear();
            await driver.executeScript(script, webelement, String(value));
            return element;
        });
    }

    export function text(element: Element) {
        return wrapElementAction(element, async function text(element: Element) {
            const webelement = await element.getWebElement();
            return webelement.getText();
        });
    }

    export function attribute(attributeName: string) {
        return async function attribute(element: Element) {
            const webelement = await element.getWebElement();
            return webelement.getAttribute(attributeName);
        };
    }

    export function open(url: string) {
        return (driver: Driver) => {
            return wrapDriverAction(driver, async function open(driver: Driver) {
                await driver.configuration.webdriver.get(url);
                return driver;
            });
        };
    }

    export function resizeWindow(width: number, height: number) {
        return (driver: Driver) => {
            return wrapDriverAction(driver, async function resizeWindow(driver: Driver) {
                await driver.configuration.webdriver.manage().window().setSize(width, height);
                return driver;
            });
        };
    }

    export function refresh(driver: Driver) {
        return wrapDriverAction(driver, async function refresh(driver: Driver) {
            await driver.configuration.webdriver.navigate().refresh();
            return driver;
        });
    }

    export function acceptAlert(driver: Driver) {
        return wrapDriverAction(driver, async function acceptAlert(driver: Driver) {
            await driver.configuration.webdriver.switchTo().alert().accept();
            return driver;
        });
    }

    export function url(driver: Driver) {
        return wrapDriverAction(driver, async function url(driver: Driver) {
            return driver.configuration.webdriver.getCurrentUrl();
        });
    }

    export function title(driver: Driver) {
        return wrapDriverAction(driver, async function title(driver: Driver) {
            return driver.configuration.webdriver.getTitle();
        });
    }

    export function pageSource(driver: Driver) {
        return wrapDriverAction(driver, async function pageSource(driver: Driver) {
            return driver.configuration.webdriver.getPageSource();
        });
    }

    /* tslint:disable:ban-types */
    export function executeScript(script: string | Function, ...args: any[]) {
        return (driver: Driver) => {
            return wrapDriverAction(driver, async function pageSource(driver: Driver) {
                return driver.configuration.webdriver.executeScript(script, ...args);
            });
        };
    }

    /* tslint:enable:ban-types */

    export function tabs(driver: Driver) {
        return wrapDriverAction(driver, async function getTabs(driver: Driver) {
            return driver.configuration.webdriver.getAllWindowHandles();
        });
    }

    export function nextTab(driver: Driver) {
        return wrapDriverAction(driver, async function nextTab(driver: Driver) {
            const currentTab = await driver.configuration.webdriver.getWindowHandle();
            const allTabs = await driver.configuration.webdriver.getAllWindowHandles();
            const currentTabIndex = allTabs.indexOf(currentTab);
            await driver.configuration.webdriver
                .switchTo()
                .window(currentTabIndex >= allTabs.length ? allTabs[0] : allTabs[currentTabIndex + 1]);
            return driver;
        });
    }

    export function previousTab(driver: Driver) {
        return wrapDriverAction(driver, async function previousTab(driver: Driver) {
            const currentTab = await driver.configuration.webdriver.getWindowHandle();
            const allTabs = await driver.configuration.webdriver.getAllWindowHandles();
            const currentTabIndex = allTabs.indexOf(currentTab);
            await driver.configuration.webdriver.switchTo()
                .window(currentTabIndex > 0 ? allTabs[currentTabIndex - 1] : allTabs[allTabs.length - 1]);
            return driver;
        });
    }

    export function switchToTab(tabId: string) {
        return (driver: Driver) => {
            return wrapDriverAction(driver, async function switchToTab(driver: Driver) {
                await driver.configuration.webdriver.switchTo().window(tabId);
                return driver;
            });
        };
    }

    export function switchToFrame(frameElement: Element) {
        return (driver: Driver) => {
            return wrapDriverAction(driver, async function switchToTab(driver: Driver) {
                await frameElement.should(be.visible);
                const webelement = await frameElement.getWebElement();
                await driver.configuration.webdriver.switchTo().frame(webelement);
                return driver;
            });
        };
    }

    export function switchToDefaultFrame(driver: Driver) {
        return wrapDriverAction(driver, async function switchToTab(driver: Driver) {
            await driver.configuration.webdriver.switchTo().defaultContent();
            return driver;
        });
    }

    export function clearCacheAndCookies(driver: Driver) {
        return wrapDriverAction(driver, async function switchToTab(driver: Driver) {
            await driver.configuration.webdriver.executeScript('window.localStorage.clear();')
                .catch(ignored => {
                });
            await driver.configuration.webdriver.executeScript('window.sessionStorage.clear();')
                .catch(ignored => {
                });
            await driver.configuration.webdriver.manage().deleteAllCookies()
                .catch(ignored => {
                });
            return driver;
        });
    }

    export async function screenshot(driver: Driver): Promise<Buffer> {
        return driver.configuration.fullpageScreenshot
            ? fullpageScreenshot(driver)
            : viewportScreenshot(driver);
    }

    export async function close(driver: Driver) {
        return wrapDriverAction(driver, async function switchToTab(driver: Driver) {
            await driver.configuration.webdriver.close();
            return driver;
        });
    }

    export async function quit(driver: Driver) {
        return wrapDriverAction(driver, async function switchToTab(driver: Driver) {
            await driver.configuration.webdriver.quit();
            return driver;
        });
    }

    async function viewportScreenshot(driver: Driver) {
        return wrapDriverAction(driver, async function screenshot(driver: Driver) {
            return Buffer.from(await driver.configuration.webdriver.takeScreenshot(), 'base64');
        });
    }

    type BrowserData = {
        devicePixelRatio: number,
        width: number,
        height: number,
        innerHeight: number,
        pageWidth: number,
        pageHeight: number,
    };

    async function fullpageScreenshot(driver: Driver): Promise<any> {
        return wrapDriverAction(driver, async function viewportScreenshot(driver: Driver) {
            const webdriver = driver.configuration.webdriver;
            const screens = [];

            // if in frame, need to swith to DEFAULT content to make an screenshot
            const currentFrameElement = await getCurrentFrameWebElement(webdriver);
            if (currentFrameElement !== null) {
                await webdriver.switchTo().defaultContent();
            }

            await hideScrollbars(webdriver);
            const browserData = await getBrowserData(webdriver);
            const screensCount = Math.ceil(browserData.pageHeight / browserData.innerHeight);
            const delta = (browserData.innerHeight * screensCount) - browserData.pageHeight;

            for (let i = 0; i < screensCount; i++) {
                await scrollToNthScreen(webdriver, browserData, i);
                const screen = await takeScreenshotWithWait(webdriver);

                if (screensCount > 1 && (i + 1) === screensCount && delta > 0) {
                    const croppedScreen = await crop(screen, delta);
                    screens.push(croppedScreen);
                } else {
                    screens.push(screen);
                }
            }

            // if was in frame, need to switch it again to avoid breaking flow
            if (currentFrameElement !== null) {
                await webdriver.switchTo().frame(currentFrameElement);
            }

            return mergeImg(screens, {direction: true})
                .then(jimpImage => new Promise((resolve, reject) => {
                    jimpImage.getBuffer(jimp.MIME_PNG, ((err, buffer) => {
                        if (err) reject(err);
                        resolve(buffer);
                    }));
                }));
        });
    }

    async function getCurrentFrameWebElement(webdriver: WebDriver): Promise<WebElement> {
        return webdriver.executeScript('return window.frameElement')
            .then(result => result as WebElement);
    }

    async function hideScrollbars(webdriver: WebDriver) {
        await setDocumentOverflow(webdriver);
    }

    async function setDocumentOverflow(webdriver: WebDriver, overflowValue = 'hidden'): Promise<string> {
        return setOverflow(webdriver, 'document.documentElement.style.overflow', overflowValue);
    }

    async function setOverflow(webdriver: WebDriver, element: string, overflowValue: string): Promise<string> {
        return String(await webdriver.executeScript(`
            return (function () {
                var origOverflow = ${element};
                ${element} = ${overflowValue ? `'${overflowValue}'` : 'undefined'};
                return origOverflow;
                })();
        `));
    }

    async function getBrowserData(webdriver: WebDriver): Promise<BrowserData> {
        const windowData = await webdriver.executeScript(`
        return {
                devicePixelRatio: window.devicePixelRatio,
                width: window.screen.height * window.devicePixelRatio,
                height: window.screen.height * window.devicePixelRatio,
                innerHeight: window.innerHeight * window.devicePixelRatio,
                pageWidth: document.body.scrollWidth * window.devicePixelRatio,
                pageHeight: document.body.scrollHeight * window.devicePixelRatio
        };`);
        return windowData as BrowserData;
    }

    async function scrollToNthScreen(webdriver: WebDriver, browserData: any, index: number) {
        const script = `window.scrollTo(0, + ${(browserData.innerHeight / browserData.devicePixelRatio) * index});`;
        await webdriver.executeScript(script);
    }

    async function takeScreenshotWithWait(webdriver: WebDriver): Promise<Buffer> {
        const timeoutForScrollToFinish = 100;
        await webdriver.sleep(timeoutForScrollToFinish);
        return Buffer.from(await webdriver.takeScreenshot(), 'base64');
    }

    async function crop(screenBuffer: Buffer, delta: number): Promise<Buffer> {
        const jimpImage = await jimp.read(screenBuffer);
        const width = jimpImage.bitmap.width;
        const height = jimpImage.bitmap.height;
        const croppedImg = jimpImage.clone().crop(0, delta, width, height);
        return croppedImg.getBufferAsync(jimp.MIME_PNG);
    }

    async function wrapElementAction(element: Element, action: ElementAction): Promise<any> {
        return performActionOnVisible(element, action)
            .catch(async (error) => {
                await executeHooksOnElementFailure(element, error);
                throw error;
            });
    }

    async function wrapDriverAction(driver: Driver, action: DriverAction): Promise<any> {
        return action(driver).then(
            result => result,
            async (error) => {
                await executeHooksOnDriverFailure(driver, error);
                throw error;
            });
    }

    async function performActionOnVisible(element: Element, action: ElementAction): Promise<any> {
        try {
            return await action(element);
        } catch (ignored) {
            await element.should(be.visible);
            try {
                return await action(element);
            } catch (error) {
                error.message = `For element ${element.toString()}: ` +
                    `cannot perform ${action.name}. ` +
                    `Reason: ${error.message}`;
                throw new CannotPerformActionError(error.message);
            }
        }
    }

    async function executeHooksOnElementFailure(element: Element, error: Error) {
        const driver: Driver = Utils.getDriver(element);
        const hooksExecutor = new HookExecutor<Element>(driver, element);
        await hooksExecutor.executeOnFailureHooks(error);
        throw error;
    }

    async function executeHooksOnDriverFailure(driver: Driver, error: Error) {
        const hooksExecutor = new HookExecutor<Driver>(driver, driver);
        await hooksExecutor.executeOnFailureHooks(error);
        throw error;
    }

}
