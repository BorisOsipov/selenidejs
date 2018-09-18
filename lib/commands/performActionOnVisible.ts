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

import { Element } from '../baseEntities/element';
import { HookExecutor } from '../baseEntities/hooks/hookExecutor';
import { be } from '../conditions/helpers/be';
import { CannotPerformActionError } from '../errors/cannotPerformActionError';
import { Command } from './command';

export class PerformActionOnVisible implements Command<Element> {
    private readonly hooksExecutor: HookExecutor<Element>;
    private readonly command: Command<Element>;

    constructor(hooksExecutor: HookExecutor<Element>, command: Command<Element>) {
        this.hooksExecutor = hooksExecutor;
        this.command = command;
    }

    async perform(element: Element): Promise<void> {

        try {
            await this.command.perform(element);
        } catch (ignored) {
            await element.should(be.visible);
            try {
                await this.command.perform(element);
            } catch (error) {
                error.message =
                    `For element ${element.toString()}: cannot perform ${this.command.toString()} reason: ${error.message}`;

                await this.hooksExecutor.executeOnFailureHooks(error);

                throw new CannotPerformActionError(error.message);
            }
        }
    }

}
