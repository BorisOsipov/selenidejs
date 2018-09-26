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
/* tslint:disable:max-classes-per-file */
const conditionDoesNotMatchError_1 = require("./errors/conditionDoesNotMatchError");
class Condition {
    constructor(description, func) {
        this.func = func;
        this.func.toString = () => description;
        this.description = description;
    }
    static create(description, func) {
        return new Condition(description, func);
    }
    static not(condition) {
        const toString = `not ${condition.toString()}`;
        const func = async (entity) => {
            await condition.matches(entity)
                .then(() => {
                throw new conditionDoesNotMatchError_1.ConditionDoesNotMatchError(toString);
            }, error => true);
        };
        return new Condition(toString, func);
    }
    matches(entity) {
        return this.func(entity);
    }
    and(...conditions) {
        const toStrings = [this.toString(), conditions.map(condition => condition.toString())];
        const funcs = [this, ...conditions];
        const toString = toStrings.join(' AND ');
        const newFunc = async (entity) => {
            try {
                for (const func of funcs) {
                    await func.matches(entity);
                }
            }
            catch (error) {
                throw new conditionDoesNotMatchError_1.ConditionDoesNotMatchError(toString);
            }
        };
        return new (class extends Condition {
        })(toString, newFunc);
    }
    or(...conditions) {
        const toStrings = [this.toString(), conditions.map(condition => condition.toString())];
        const funcs = [this, ...conditions];
        const toString = toStrings.join(' OR ');
        const newFunc = async (entity) => {
            try {
                for (const func of funcs) {
                    await func.matches(entity);
                    return;
                }
            }
            catch (error) {
                throw new conditionDoesNotMatchError_1.ConditionDoesNotMatchError(toString);
            }
        };
        return new (class extends Condition {
        })(toString, newFunc);
    }
    toString() {
        return this.description;
    }
}
exports.Condition = Condition;
//# sourceMappingURL=condition.js.map