import $ from 'jquery';
import { TabJsonInterface } from './mdiWindow';

interface callbackInterface {
    (event: TabJsonInterface): void;
}

export default class Events {

    /** @var {HTMLelement} Container of tabs */
    element;
    constructor(pElement: JQuery<HTMLElement>) {
        this.element = pElement;
    }
    public init(pElement: JQuery<HTMLElement>) {
        this.element = pElement;
    }
    public onClick(event: TabJsonInterface) {}
    public onClose(pTabElement: TabJsonInterface) {}
    public onOpen(event: TabJsonInterface, eventCallback: callbackInterface | null) {
        if(eventCallback !== null && typeof eventCallback === 'function'){
            eventCallback(event);
        }
    }
    public destroy() {}
}