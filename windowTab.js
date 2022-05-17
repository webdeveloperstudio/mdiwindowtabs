export default class windowTabs {

    /** @var {HTMLelement} Container of tabs */
    element;
    /** @var {HTMLelement[]} tab elements */
    tabs = [];

    constructor(pElement) {
        this.element = pElement;
        this.init();
    }

    appendTab(pTab) {
        this.tabs.push(pTab);
    }

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