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

import { Collection } from './collection';
import { Condition } from './conditions/condition';
import { Configuration } from './configuration';
import { Driver } from './driver';
import { Element } from './element';


export class Wait<T extends Driver | Element | Collection> {

    readonly configuration: Configuration;
    readonly entity: T;

    constructor(entity: T, config: Configuration) {
        this.configuration = config;
        this.entity = entity;
    }

    async shouldMatch(condition: Condition<T>, timeout = this.configuration.timeout): Promise<T> {
        return this.until(condition, timeout);
    }

    async isMatch(condition: Condition<T>, timeout = this.configuration.timeout): Promise<boolean> {
        return this.until(condition, timeout).then(res => true, err => false);
    }

    private async until(condition: Condition<T>, timeout: number): Promise<T> {

        const finishTime = new Date().getTime() + timeout;
        let lastError: Error;

        do {
            try {
                return await condition.matches(this.entity);
            } catch (error) {
                lastError = error;
            }
        } while (new Date().getTime() < finishTime);

        lastError.message = `${this.entity.toString()} should ${lastError.message}. Wait timed out after ${timeout}ms`;

        for (const func of this.configuration.onFailureHooks) {
            try {
                await func(lastError, this.entity, condition);
            } catch (error) {
                /* tslint:disable:no-console */
                console.warn(
                    `Cannot perform hook '${func.toString()}' function cause of:
                            Error message: ${error.message}
                            Error stacktrace: ${error.stackTrace}`
                );
                /* tslint:enable:no-console */
            }
        }
        throw lastError;
    }
}
