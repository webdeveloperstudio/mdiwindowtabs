export default {
    ajax: {
        baseUrl: 'https://api.napr.gov.ge/',
        basePath: 'lr-test/redi'
    },
    name: 'mdiWindow',
    preloader: {
        filename: 'https://api.napr.gov.ge/lr-test/redi/reds/assets/preloaders/napr_v1.0.0.svg?APITOKEN=vezJ_BX4Gf_RK5J7G27-5thGpPc.'
    },
    tabNavigator: {
        windowTabsId: 'windowTabs_navigator',
        ulClassName: 'nav nav-tabs',
        liClassName: 'nav-item',
    },
    classes: {
        hidden: 'hidden',
        activeClass: 'active',
        tab: {
            className: 'tab-pane',
            header: {
                className: 'mdi-window-header',
                closeButton: {
                    className: 'btn-close',
                    salt: '_close_btn'
                },
                label: {
                    className: 'mdi-window-header-label'
                }
            },
            body: {
                className: 'mdi-window-body',
                salt: '_body'
            }
        }
    }
}