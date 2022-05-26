import Events from "./events";
import * as $ from 'jquery';

interface TabJsonInterface {
    id: string;
    className: string;
    element: JQuery<HTMLDivElement>;
    attrs: {
        [key: string]: string;
    }[];
};

export default class windowTab extends Events {

    /** @var {TabJsonInterface} */
    private tab: TabJsonInterface;

    constructor(pTab: TabJsonInterface) {
        super(pTab.element);
        this.tab = pTab;
    }

    onClose() {}

    onOpen() {}

    onSelect() {}

    onLoad() {}

}