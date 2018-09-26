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

/* tslint:disable:max-classes-per-file */

import { ConditionDoesNotMatchError } from '../errors/conditionDoesNotMatchError';

export class Condition<T> {

    static create<T>(description: string, func: (T) => Promise<void>) {
        return new Condition<T>(description, func);
    }

    static not<T>(condition: Condition<T>) {
        const toString = `not ${condition.toString()}`;
        const func = async(entity: T) => {
            await condition.matches(entity)
                .then(
                    () => {
                        throw new ConditionDoesNotMatchError(toString);
                    },
                    error => true
                );
        };
        return new Condition<T>(toString, func);
    }

    private readonly func: (T) => Promise<void>;
    private readonly description: string;

    private constructor(description: string, func: (T) => Promise<void>) {
        this.func = func;
        this.func.toString = () => description;
        this.description = description;
    }

    matches(entity: T) {
        return this.func(entity);
    }

    and(...conditions: Array<Condition<T>>): Condition<T> {
        const toStrings = [this.toString(), conditions.map(condition => condition.toString())];
        const funcs = [this, ...conditions];
        const toString = toStrings.join(' AND ');
        const newFunc = async(entity: T) => {
            try {
                for (const func of funcs) {
                    await func.matches(entity);
                }
            } catch (error) {
                throw new ConditionDoesNotMatchError(toString);
            }
        };

        return new (class extends Condition<T> {
        })(toString, newFunc);
    }

    or(...conditions: Array<Condition<T>>): Condition<T> {
        const toStrings = [this.toString(), conditions.map(condition => condition.toString())];
        const funcs = [this, ...conditions];
        const toString = toStrings.join(' OR ');
        const newFunc = async(entity: T) => {
            try {
                for (const func of funcs) {
                    await func.matches(entity);
                    return;
                }
            } catch (error) {
                throw new ConditionDoesNotMatchError(toString);
            }
        };

        return new (class extends Condition<T> {
        })(toString, newFunc);
    }

    toString() {
        return this.description;
    }

}
