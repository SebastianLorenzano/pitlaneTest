import i18n from "i18next";
import { initReactI18next } from "react-i18next";

type SupportedLng = "de" | "en" | "es" | "fr" | "it" | "pt";

var supportedLanguages: SupportedLng[] = ["de", "en", "es", "fr", "it", "pt"];

var namespaces = [
  "about",
  "circuit",
  "contact",
  "download",
  "faq",
  "hero",
  "navbar",
  "projectDetails",
  "timeline"
];

function buildResourcesForLanguage(lang: SupportedLng): Record<string, object> {
  // Vite: import all json files under locales
  var modules = import.meta.glob("./locales/*/*.json", { eager: true });

  var result: Record<string, object> = {};

  namespaces.forEach(function (ns) {
    var path = "./locales/" + lang + "/" + ns + ".json";
    var mod = modules[path] as { default: object } | undefined;
    result[ns] = mod ? mod.default : {};
  });

  return result;
}

var resources: Record<string, Record<string, object>> = {};

supportedLanguages.forEach(function (lang) {
  resources[lang] = buildResourcesForLanguage(lang);
});

i18n.use(initReactI18next).init({
  resources: resources,
  lng: "en",
  fallbackLng: "en",
  supportedLngs: supportedLanguages,
  ns: namespaces,
  defaultNS: "hero",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
