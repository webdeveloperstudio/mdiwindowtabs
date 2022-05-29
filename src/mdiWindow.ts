import Events from "./events";
import config from "./config";
import $ from 'jquery';
import { errorHandler } from "./errorHandler";
import { HttpClient } from "./http.client";

export interface TabJsonInterface {
    ref: string;
    className: string;
    ContentElement?: JQuery<HTMLElement>;
    NavElement?: JQuery<HTMLElement>;
    ajax?: {
        url: string;
        method: string;
    },
    props: {
        isActive: boolean;
        isOpen: boolean;
        reOpened: boolean;
    },
    attrs: {
        [key: string]: string;
    }[];
};

interface appBaseElementsInterface {
    navigator: JQuery<HTMLElement>;
    container: JQuery<HTMLElement>;
    navigatorElement: JQuery<HTMLElement>;
}

interface appInitInterface {
    navigator: string;
    container: string;
}


export default class mdiWindow extends Events {

    /** @var {HTMLelement} Container of tabs */
    private baseElements: appBaseElementsInterface = {
        container: $('null'),
        navigator: $('null'),
        navigatorElement: $('null')
    };
    /** @var {HTMLelement[]} tab elements */
    private tabs: TabJsonInterface[] = [];
    private bodyHtml = (properties: any) => `<div class="${properties.className} ${properties.hidden}" data-ref="${properties.ref}${properties.salt}"></div>`;
    private tabNavigatorUlHtml = (properties: any) => `<ul class="${properties.className}" id="${properties.windowTabsId}"></ul>`;
    private tabNavigatorLiHtml = (properties: any) => `<li class="${properties.className} ${properties.hidden}" data-ref="${properties.ref}"><a class="nav-link" data-ref="${properties.ref}"><span data-ref="${properties.ref}">${properties.label}</span>
    &nbsp;&nbsp;<button style="float:right" type="button" class="btn-close" data-ref="${properties.ref}${config.classes.tab.header.closeButton.salt}" aria-label="Close"></button></a></li>`;
    private propsDefaultValues: any = {
        isActive: false,
        isOpen: false,
        reOpened: false
    };

    constructor(pElementSelectors: appInitInterface, pTabJson: TabJsonInterface[] = []) {
        const vNavigatorEl: JQuery<HTMLElement> = $(pElementSelectors.navigator);
        const vContainerEl: JQuery<HTMLElement> = $(pElementSelectors.container);
        super(vContainerEl);
        super.init(vContainerEl);
        this.baseElements.navigator = vNavigatorEl;
        this.baseElements.container = vContainerEl;
        if (pTabJson.length > 0) {
            this.initialize(pTabJson);
        }
    }

    public initialize(pTabJson: TabJsonInterface[]) {
        const self = this;
        pTabJson.forEach(function (pTab) {
            const vElement = self.appendTab(pTab);
            pTab.ContentElement = vElement.ContentElement;
            pTab.NavElement = vElement.NavElement;
            pTab.props = { ...self.propsDefaultValues };
        });
        this.tabs = pTabJson;
    }

    public appendTab(pTabJson: TabJsonInterface): TabJsonInterface {
        const vEl: TabJsonInterface = this.createTab(pTabJson);
        this.tabs.push(vEl);
        if (vEl.ContentElement && vEl.NavElement) {
            this.baseElements.container.append(vEl.ContentElement);
            this.baseElements.navigator.append(vEl.NavElement);
        }
        return vEl;
    }

    public createTab(pTabJson: TabJsonInterface): TabJsonInterface {
        let vElement: HTMLDivElement = document.createElement('div');
        const self = this;
        const vEl: JQuery<HTMLDivElement> = $(vElement);
        vEl.attr('id', pTabJson.ref);
        vEl.attr('class', `${pTabJson.className} ${config.classes.tab.className} ${config.classes.hidden}`);
        pTabJson.attrs.forEach(function (pAttr) {
            vEl.attr(pAttr.name, pAttr.value);
        });
        const vBody = this.bodyHtml({
            ref: pTabJson.ref,
            salt: config.classes.tab.body.salt,
            className: config.classes.tab.body.className
        });
        const vLiEl = this.tabNavigatorLiHtml({
            className: config.tabNavigator.liClassName,
            ref: pTabJson.ref,
            label: pTabJson.ref,
            hidden: config.classes.hidden
        });
        vEl.append(vBody);
        const vLi: JQuery<HTMLLIElement> = $(vLiEl);
        this.baseElements.navigator.find('ul').append(vLi);
        vLi.find('a').addClass(config.classes.activeClass);
        const vItem: TabJsonInterface = {
            ref: pTabJson.ref,
            className: pTabJson.className,
            ContentElement: vEl,
            NavElement: vLi,
            props: {
                isActive: false,
                isOpen: false,
                reOpened: false,
            },
            attrs: pTabJson.attrs
        };
        $(document).on('click', `button.btn-close[data-ref=${pTabJson.ref}${config.classes.tab.header.closeButton.salt}]`, function () {
            self.closeTab(vItem);
        });
        return vItem;
    }

    public getTabByRef(pTabRef: string): TabJsonInterface {
        const result = this.tabs.filter(function (pTab: TabJsonInterface) {
            if (pTab) {
                return pTab.ref === pTabRef;
            }
        });
        return result[0];
    }

    public openTab(pTabRef: string): void {
        const vTab: TabJsonInterface[] = this.tabs.filter(function (pTab: TabJsonInterface) {
            return pTab.ref === pTabRef;
        });
        const vElement = vTab[0];
        if (vTab.length === 1) {
            this.onOpen(vElement, null);
            //this.setActiveClass(vElement);
            this.closeAllTabContents();
            vElement.NavElement?.removeClass(config.classes.hidden);
            vElement.NavElement?.find('a').addClass(config.classes.activeClass);
            vElement.ContentElement?.addClass(config.classes.activeClass);
            vElement.ContentElement?.removeClass(config.classes.hidden);            
            if (vElement.props.reOpened === false) {
                this.loadTabContent(vElement);
            }
        } else {
            errorHandler.errorHandler({
                error: 'Tab not found',
                filename: 'mdiWindow.ts',
                stackName: 'mdiWindow.openTab()'
            });
        }
    }

    public closeTab(pTabObject: TabJsonInterface): void {
        const self = this;
        this.tabs.filter(function (pTab: TabJsonInterface) {
            if (pTab.ref === pTabObject.ref) {
                pTab.ContentElement?.removeClass(config.classes.activeClass);
                pTab.NavElement?.removeClass(config.classes.activeClass);
                pTab.NavElement?.addClass(config.classes.hidden);
                pTab.ContentElement?.addClass(config.classes.hidden);
                self.onClose(pTabObject);
            }
        });
    }

    public closeAllTabs(): void {
        this.tabs.forEach(function (pTabJson: TabJsonInterface) {
            pTabJson.NavElement?.addClass(config.classes.hidden);
            pTabJson.ContentElement?.addClass(config.classes.hidden);
        });
    }

    public closeAllTabContents(): void {
        this.tabs.forEach(function (pTabJson: TabJsonInterface) {
            pTabJson.ContentElement?.addClass(config.classes.hidden);
            pTabJson.ContentElement?.removeClass(config.classes.activeClass);
            pTabJson.NavElement?.find('a').removeClass(config.classes.activeClass);
        });
    }

    private setActiveClass(pTab: TabJsonInterface): void {
        this.closeAllTabs();
        pTab.NavElement?.removeClass(config.classes.hidden);
        pTab.ContentElement?.removeClass(config.classes.hidden);
    }

    public removeTab(pTab: TabJsonInterface): void {
        if (pTab.ContentElement && pTab.NavElement) {
            pTab.ContentElement.remove();
            pTab.NavElement.remove();
        }
        this.tabs = this.tabs.filter(function (pTabJson: TabJsonInterface) {
            return pTabJson.ref !== pTab.ref;
        });
    }

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

    public getCurrentTab(): void {

    }

    public getAllTabs(): TabJsonInterface[] {
        return this.tabs;
    }

    private loadTabContent(pTab: TabJsonInterface): void {
        const hc = new HttpClient(config.ajax.baseUrl);
        const URL = pTab.ajax?.url ? pTab.ajax?.url : '';
        const vElement = pTab.ContentElement;
        vElement?.html(`<img src="${config.preloader.filename}" class="preloader_img" />`);
        hc.request(URL, 'GET').then(function (pResponse: any) {
            vElement?.html(pResponse);
            pTab.props.reOpened = true;
            pTab.props.isOpen = true;
            pTab.props.isActive = true;
        })
    }
};