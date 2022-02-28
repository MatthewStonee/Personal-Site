import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({

    icons: {
        iconfont: 'mdi', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
    },
    theme: {
        themes: {
            light: {
                primary: '#0f71e2',
                backgroundColor: '#4FC3F7',
            },
        },
    },
});
