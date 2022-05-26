import windowTabs from './mdiWindow';

fetch('./data.json', {method: 'GET'}).then(function (pResponse) {
    return pResponse.json();
}).then(function (pJson) {
    const vWindowTabs: windowTabs = new windowTabs('#window-tabs', pJson);

    vWindowTabs.openTabb
});

// const vWindowTabs = new windowTabs('#window-tabs', [
//     {
//         id: 'tab-1',
//         className: 'tab-1',
//         attrs:
//             [
//                 { 'data-tab-id': 'tab-1' },
//                 { 'data-tab-title': 'Tab 1' },
//                 { 'data-tab-class': 'tab-1' }
//             ]
//     },
//     {
//         id: 'tab-2',
//         className: 'tab-2',
//         attrs:
//             [
//                 { 'data-tab-id': 'tab-2' },
//                 { 'data-tab-title': 'Tab 2' },
//                 { 'data-tab-class': 'tab-2' }
//             ]
//     }
// ]);

//vWindowTabs.