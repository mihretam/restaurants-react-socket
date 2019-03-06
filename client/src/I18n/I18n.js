import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import English from './languages/en'
import Deutsch from './languages/de'

const resources = {
  en: {
    translation: English
  },
  de:{
    translation: Deutsch
  }
};

i18n.use(reactI18nextModule).init({
  resources,
  fallbackLng: 'en',
  debug: true,
  interpolation: {
    escapeValue: false,
  },
  react: {
    wait: true
  }
})


export default i18n;