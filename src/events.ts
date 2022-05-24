import $ from 'jquery';

export default class Events {

    /** @var {HTMLelement} Container of tabs */
    element;
    constructor(pElement: JQuery<HTMLDivElement>) {
        this.element = pElement;
    }
    public init(pElement: JQuery<HTMLDivElement>) {
        this.element = pElement;
    }
    public onClick(event: Event) {}
    public onClose(event: Event) {}
    public onOpen(event: Event) {}
    public destroy() {}
}