import Events from "./events.js";

export default class windowTab extends Events {

    /** @var {string} */
    id;
    /** @var {string} */
    title;
    /** @var {string} */
    content;

    /** @var [{
            id: 'tab-1',
            title: 'Tab 1',
            content: 'Tab 1 content'
        }] Container of tabs */
    constructor(pOptions) {}

    onClose() {}

    onOpen() {}

    onSelect() {}

    onLoad() {}

}