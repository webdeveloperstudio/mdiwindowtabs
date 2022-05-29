import $ from 'jquery';
import windowTabs from './mdiWindow';

fetch('./data.json', {method: 'GET'}).then(function (pResponse) {
    return pResponse.json();
}).then(function (pJson) {
    const vWindowTabs: windowTabs = new windowTabs({
        navigator: '#window-tabs-navigator',
        container: '#window-tabs-container'
    }, pJson);
    $("ul#navigation").html('');
    vWindowTabs.getAllTabs().forEach(function (pTab) {
        $("ul#navigation").append(`<li class="list-group-item" data-ref="${pTab.ref}">ოქმი: ${pTab.ref}</li>`);
    });

    $(document).on('click', "ul#navigation li, ul#window-tabs-navigator li a span", function (evenet) {
        const vId: string = $(this).data('ref')?.toString() || '';
        vWindowTabs.openTab(vId);
    });

    //vWindowTabs.openTabb
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