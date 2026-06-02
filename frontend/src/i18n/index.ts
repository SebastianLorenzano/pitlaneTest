import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

type SupportedLng = "de" | "en" | "es" | "fr" | "it" | "pt";

var supportedLanguages: SupportedLng[] = ["de", "en", "es", "fr", "it", "pt"];

var namespaces = [
  "about",
  "centre",
  "circuit",
  "contact",
  "download",
  "faq",
  "hero",
  "navbar",
  "timeline"
];

// Vite: import all json files under locales
var modules = import.meta.glob("./locales/*/*.json", { eager: true });

function buildResourcesForLanguage(lang: SupportedLng): Record<string, object> {
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

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: resources,

    // Do NOT force English here.
    // i18next will detect the browser language automatically.
    fallbackLng: "es",

    supportedLngs: supportedLanguages,

    // Converts browser languages like:
    // en-US -> en
    // es-ES -> es
    // pt-BR -> pt
    load: "languageOnly",

    detection: {
      // Use the browser language
      order: ["navigator"],

      // Do not save the detected language
      caches: []
    },

    ns: namespaces,
    defaultNS: "hero",

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;