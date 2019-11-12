export default class ApMenu {

    static menu() {
        return Array.of(
            {
                type: 'item',
                url: '#TestList',
                label: 'Test',
                icon: '',
                params: {},
                external: false
            },
            
        );
    }

    static appBar() {
        return {
            title: 'App-Template',
            menu: [

            ]
        };
    }
}