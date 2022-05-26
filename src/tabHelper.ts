import { TabJsonInterface } from "./mdiWindow";


export default class TabHelper {
    /** @var {HTMLelement} Container of tabs */
    baseElement!: JQuery<HTMLDivElement>;
    /** @var {HTMLelement[]} tab elements */
    tabs: TabJsonInterface[] = [];
    /**
     * @param {HTMLDivElement} pElementSelector Main container element of tabs
     * 
     * @param {TabJsonInterface[]} pTabJson Class of tab element
     */
    constructor(pElementSelector: string, pTabJson: TabJsonInterface[] = []) {
        const el: JQuery<HTMLDivElement> = $(pElementSelector);
        super(el);
        super.init(el);
        this.baseElement = el;
        if (pTabJson.length > 0) {
            this.initialize(pTabJson);
        }
    }
}