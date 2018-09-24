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

import { Describe, It } from 'jasmine-cookies';
import { be, have } from '../../../lib';
import { Browser } from '../../../lib/baseEntities/browser';
import { Given } from '../../utils/given';
import '../base';
import focused = be.focused;

/* tslint:disable:space-before-function-paren */
/* tslint:disable:no-magic-numbers */

Describe('Element', () => {

    const OVERLAYED_ELEMENTS_HTML = `
            <div id="container" style="position: relative;">
                <div id="back" style="position: absolute;">test</div>
                <div id="front" style="position: absolute;z-index: 10;">test</div>
            </div>`;

    beforeEach(() => {
        Browser.configuration.clickByJs = false;
        Browser.configuration.setValueByJs = false;
    });

    It('should be able to click', async () => {
        await Given.openedEmptyPageWithBody('<a href="#heading">go to Heading</a><h2 id="heading">Heading</h2>');

        await Browser.element('a').click();
        expect(await Browser.url()).toContain('heading');
    });

    It('click should produce valid error if visible but not clickable', async () => {
        await Given.openedEmptyPageWithBody(OVERLAYED_ELEMENTS_HTML);

        await Browser.element('#back').click()
            .then(
                result => fail('Expected: error to be thrown'),
                error => expect(error.message).toContain(
                    'For element browser.find(By(css selector, #back)): cannot perform click.'
                )
            );
    });

    It('should be able to click by js', async () => {
        await Given.openedEmptyPageWithBody('<a href="#heading">go to Heading</a><h2 id="heading">Heading</h2>');

        Browser.configuration.clickByJs = true;
        await Browser.element('a').click();
        expect(await Browser.url()).toContain('heading');
    });

    It('should be able to contextClick', async () => {
        await Given.openedEmptyPageWithBody('<a />');

        await Browser.element('a').contextClick().catch(error => fail(error.message));
    });

    It('should be able to doubleClick', async () => {
        await Given.openedEmptyPageWithJqueryAndBody('<span id="test">Before Double Click</span>');
        await Browser.executeScript(`
            $('#test').dblclick(function(e) {
                $('#test').text('After Double Click');
            });
        `);

        await Browser.element('#test').doubleClick();
        expect(await Browser.element('#test').should(have.text('After Double Click')));
    });

    It('should be able to pressEnter', async () => {
        await Given.openedEmptyPageWithJqueryAndBody('<span id="test">Before Press Enter</span>');
        await Browser.executeScript(`
            $('html').keypress(function(e) {
                if (e.which == 13) document.getElementById('test').innerHTML = 'After Press Enter';
            });
        `);

        await Browser.element('html').pressEnter();
        expect(await Browser.element('#test').text()).toBe('After Press Enter');
    });

    It('should be able to pressTab', async () => {
        await Given.openedEmptyPageWithBody('<input id="uname" /><input id="pass" />');

        await Browser.element('#uname').pressTab();
        expect(await Browser.element('#pass').is(focused)).toBeTruthy();
    });

    It('should be able to pressEscape', async () => {
        await Given.openedEmptyPageWithBody('<input id="uname"/>');

        await Browser.element('#uname').click();
        await Browser.element('#uname').pressEscape();
        expect(await Browser.element('#pass').isNot(focused)).toBeTruthy();
    });

    It('should be able to hover', async () => {
        await Given.openedEmptyPageWithJqueryAndBody(
            `<div
                id="hoverable"
                onmouseover="$(this).text('Its hover');"
                onmouseout="$(this).text('Its not hover');"
            >
            Its not hover
            </div>
            <h1>Away</h1>`
        );

        expect(await Browser.element('#hoverable').text()).toBe('Its not hover');
        await Browser.element('#hoverable').hover();
        expect(await Browser.element('#hoverable').text()).toBe('Its hover');
        await Browser.element('h1').hover();
        expect(await Browser.element('#hoverable').text()).toBe('Its not hover');
    });

    It('should be able to scrollIntoView', async () => {
        await Given.openedEmptyPageWithBody('<input id="test" />');

        await Browser.element('#test').scrollTo();
        expect(await Browser.element('#test').isVisible()).toBeTruthy();
    });

    It('should be able to sendKeys', async () => {
        await Given.openedEmptyPageWithBody('<input id="test" />');

        await Browser.element('#test').sendKeys('Test');
        expect(await Browser.element('#test').value()).toBe('Test');
    });

    It('should be able to setValue', async () => {
        await Given.openedEmptyPageWithBody('<input id="test" />');

        await Browser.element('#test').setValue('Test');
        expect(await Browser.element('#test').value()).toBe('Test');
    });

    It('should be able to setValue by js', async () => {
        await Given.openedEmptyPageWithBody('<input id="test" />');

        Browser.configuration.setValueByJs = true;
        await Browser.element('#test').setValue('Test');
        expect(await Browser.element('#test').value()).toBe('Test');
    });

    It('should wait for visibility if needed', async () => {
        Browser.configuration.timeout = 2000;
        await Given.openedEmptyPageWithBody('<input id="test" style="display:none" />');
        await Browser.executeScript(
            'setTimeout(_ => { document.getElementById("test").style = "display:block"; }, 1000);'
        );

        await Browser.element('input').click().catch(error => fail(error.message));
    });

});
