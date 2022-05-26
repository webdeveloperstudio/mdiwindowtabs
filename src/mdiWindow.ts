import Events from "./events";
import $ from 'jquery';
import { errorHandler } from "./errorHandler";

export interface TabJsonInterface {
    id: string;
    className: string;
    element?: JQuery<HTMLDivElement>;
    attrs: {
        [key: string]: string;
    }[];
};


export default class mdiWindow extends Events {

    /** @var {HTMLelement} Container of tabs */
    baseElement!: JQuery<HTMLDivElement>;
    /** @var {HTMLelement[]} tab elements */
    tabs: TabJsonInterface[] = [];
    /**
     * @param {HTMLDivElement} pElementSelector Main container element of tabs
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

    public initialize(pTabJson: TabJsonInterface[]) {
        const self = this;
        pTabJson.forEach(function (pTab) {
            pTab.element = self.appendTab(pTab).element;
        });
    }

    public appendTab(pTabJson: TabJsonInterface): TabJsonInterface {
        const vEl: TabJsonInterface = this.createTab(pTabJson);
        this.tabs.push(vEl);
        if (vEl.element) {
            $(this.baseElement).append(vEl.element);
        }
        return vEl;
    }

    /**
     * 
     * @param {TabJsonInterface} pTabJson 
     */
    public createTab(pTabJson: TabJsonInterface): TabJsonInterface {
        let vElement: HTMLDivElement = document.createElement('div', {
            is: 'window-tab'
        });
        const vEl: JQuery<HTMLDivElement> = $(vElement);
        vEl.attr('id', pTabJson.id);
        vEl.attr('class', pTabJson.className);
        pTabJson.attrs.forEach(function (pAttr) {
            vEl.attr(pAttr.name, pAttr.value);
        });
        const vItem: TabJsonInterface = {
            id: pTabJson.id,
            className: pTabJson.className,
            element: vEl,
            attrs: pTabJson.attrs
        };
        return vItem;
    }

    public removeTab(pTab: TabJsonInterface) {
        if (pTab.element) {
            pTab.element.remove();
        }
        this.tabs = this.tabs.filter(function (pTabJson: TabJsonInterface) {
            return pTabJson.id !== pTab.id;
        });
    }

    /**
     * @param {Array} pTabs
     */
    public setTabs(pTabs: TabJsonInterface[]): void {
        const self = this;
        pTabs.forEach(function (pTab: TabJsonInterface) {
            self.tabs.push(self.appendTab(pTab));
        });
    }

    public destroy(): void {
        super.destroy();
        for (let index = 0; index < this.tabs.length; index++) {
            this.removeTab(this.tabs[index]);
        }
    }

    public loadTabs(pTabJson: TabJsonInterface[]): void {
        this.initialize(pTabJson);
    }

    public getCurrentTab() {

    }

    public getAllTabs(): TabJsonInterface[] {
        return this.tabs;
    }

    public getTabById(pTabId: string): TabJsonInterface {
        const result = this.tabs.filter(function (pTab: TabJsonInterface) {
            if (pTab.element) {
                return pTab.element.attr('id') === pTabId;
            }
        });
        return result[0];
    }

    public openTab(pTabId: string) {
        const vTab = this.tabs.filter(function (pTab: TabJsonInterface) {
            return pTab.id === pTabId;
        });
        if (vTab.length > 0) {
            this.onOpen(vTab[0]);
            vTab[0].element?.addClass('active');
        }else{
            errorHandler.errorHandler({
                error: 'Tab not found',
                filename: 'mdiWindow.ts',
                stackName: 'mdiWindow.openTab()'
            });
        }
    }

    public closeTab(pTabId: string) { }
};