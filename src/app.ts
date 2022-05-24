import windowTabs from './mdiWindow';

const vWindowTabs = new windowTabs('#window-tabs', [
    {
        id: 'tab-1',
        className: 'tab-1',
        attrs:
            [
                { 'data-tab-id': 'tab-1' },
                { 'data-tab-title': 'Tab 1' },
                { 'data-tab-class': 'tab-1' }
            ]
    }
]);

//vWindowTabs.