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
import { Browser } from '../../../lib/browser';
import { have } from '../../../lib/index';
import { Given } from '../../utils/given';
import '../base';

/* tslint:disable:space-before-function-paren */
/* tslint:disable:no-magic-numbers */

Describe('Element "Should" method', () => {

    beforeAll(async () => {
        Browser.configuration.timeout = 1;
    });

    It('should not throw error if successful', async () => {
        await Given.openedEmptyPageWithBody('<span id="test">Test text</span>');

        await Browser.element('#test').should(have.exactText('Test text')).catch(
            error => fail('Expected should to be successful')
        );
    });

    It('should return element if successful', async () => {
        await Given.openedEmptyPageWithBody('<span id="test">Test text</span>');

        const element = Browser.element('#test');
        await element.should(have.exactText('Test text')).then(
            result => expect(result).toBe(element),
            error => fail('Expected should to be successful')
        );
    });

    It('should throw error if failed', async () => {
        await Given.openedEmptyPageWithBody('<span id="test">Test text</span>');

        await Browser.element('#test').should(have.exactText('Invalid')).then(
            () => fail('Expected should to be failed'),
            ignored => {}
        );
    });

    It('should throw error with correct message if failed', async () => {
        await Given.openedEmptyPageWithBody('<span id="test">Test</span>');

        await Browser.element('#test').should(have.exactText('Invalid')).then(
            () => fail('Expected should to be failed'),
            error => expect(error.message).toBe(
                "browser.find(By(css selector, #test)) should have exact text 'Invalid', but was 'Test'. " +
                'Wait timed out after 1ms'
            )
        );
    });

});
