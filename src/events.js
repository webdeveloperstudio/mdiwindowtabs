export default class Events {

    /** @var {HTMLelement} Container of tabs */
    element;
    constructor(pElement) {
        this.element = pElement;
    }
    init(pElement) {
        this.element = pElement;
    }
    onClick(event) {}
    onClose(event) {}
    onOpen(event) {}
}