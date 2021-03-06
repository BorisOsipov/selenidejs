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

import { Collection } from '../collection';
import { Driver } from '../driver';
import { Element } from '../element';
import { Condition } from '../index';

/* tslint:disable:max-line-length */
export type OnFailureHook = (<T extends Driver | Element | Collection>(lastError: Error, entity: T, condition?: Condition<T>) => void | Promise<void>);
/* tslint:enable:max-line-length */
