import i18n from '../../I18n/I18n';

export function localize (key) {
  return i18n.t(key)
}

export function changeLanguage (newLangauge) {
  i18n.changeLanguage(newLangauge, (err, t) => {
    if (err) return console.log('something went wrong loading', err);
  });
}

export function getCurrentLanguage () {
  return i18n.language
}
