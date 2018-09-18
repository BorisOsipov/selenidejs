import { Element } from '../baseEntities/element';
import { HookExecutor } from '../baseEntities/hooks/hookExecutor';
import { Command } from './command';
export declare class PerformActionOnVisible implements Command<Element> {
    private readonly hooksExecutor;
    private readonly command;
    constructor(hooksExecutor: HookExecutor<Element>, command: Command<Element>);
    perform(element: Element): Promise<void>;
}
