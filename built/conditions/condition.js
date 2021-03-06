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
const conditionDoesNotMatchError_1 = require("../errors/conditionDoesNotMatchError");
class Condition {
    constructor(params) {
        this.matches = params.matches;
        this.toString = params.toString;
    }
    static not(condition) {
        return new Condition({
            toString() {
                return `not ${condition.toString()}`;
            },
            async matches(entity) {
                try {
                    await condition.matches(entity);
                }
                catch (error) {
                    return entity;
                }
                throw new conditionDoesNotMatchError_1.ConditionDoesNotMatchError(this.toString());
            }
        });
    }
    and(...conditions) {
        return new Condition({
            toString() {
                return conditions.map(condition => condition.toString()).join(' AND ');
            },
            async matches(entity) {
                try {
                    for (const condition of conditions) {
                        await condition.matches(entity);
                    }
                    return entity;
                }
                catch (ignored) {
                }
                throw new conditionDoesNotMatchError_1.ConditionDoesNotMatchError(this.toString());
            }
        });
    }
}
exports.Condition = Condition;
//# sourceMappingURL=condition.js.map