import Events from "./events.js";

export default class mdiWindow extends Events {

    /** @var {HTMLelement} Container of tabs */
    element;
    /** @var {HTMLelement[]} tab elements */
    tabs = [];
    /**
     * @param {pOptions.element} element Main container element of tabs
     * @param {pOptions.tabClass} tabClass Class of tab element
     * @param {pOptions.tabs} array of tabs
     */
    constructor(pOptions) {
        super();
        super.init(pOptions.element);
        this.element = pOptions.element;
        this.init();
    }

    appendTab(pTab) {
        this.tabs.push(pTab);
    }

    createTabByJSON(pTabJson) {}

    removeTab(pTab) {}

    /**
     * @param {Array} pTabs 
     */
    setTabs(pTabs) {
        this.tabs = pTabs;
    }

    init() {
        // JavaScript to be fired on the home page
    }

    loadTabs(pDataJson) {

    }

    getCurrentTab() {

    }

    getAllTabs() {

    }

    getTabById(pTabId) {

    }

    setTabId(pTab, pTabId) {

    }

    openTabb(pTabId) {}

    closeTab(pTabId) {}
};