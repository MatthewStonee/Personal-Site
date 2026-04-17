import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        dark: true,
        colors: {
          primary: '#1C1C21',
          background: '#1C1C21',
          surface: '#2A2730',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
        },
      },
      light: {
        dark: false,
        colors: {
          primary: '#516B9B',
          background: '#F4F6FB',
          surface: '#FFFFFF',
          error: '#B3261E',
          info: '#2563EB',
          success: '#2E7D32',
          warning: '#F59E0B',
        },
      },
    },
  },
})

export default vuetify
