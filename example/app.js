import windowTabs from '../src/mdiWindow.js';

const el = document.getElementById('window-tabs');

const vWindowTabs = new windowTabs({
    element: el,
    tabClass: 'window-tab',
    tabs: [
        {
            id: 'tab-1',
            title: 'Tab 1',
            content: 'Tab 1 content'
        }
    ]
});

//vWindowTabs.