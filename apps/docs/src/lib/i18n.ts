import { computed } from "vue";
import type { RouteLocationRaw } from "vue-router";
import { useRoute } from "vue-router";
import type { Locale } from "./copy";

export const defaultLocale: Locale = "en";
export const supportedLocales = [defaultLocale, "zh-CN"] as const;

const localizedPathPattern = /^\/zh-CN(?=\/|$)/;

export function localeFromPath(path: string): Locale {
  return localizedPathPattern.test(path) ? "zh-CN" : defaultLocale;
}

export function stripLocaleFromPath(path: string) {
  if (!localizedPathPattern.test(path)) {
    return path || "/";
  }

  const stripped = path.replace(localizedPathPattern, "");
  return stripped || "/";
}

export function withLocalePath(path: string, locale: Locale) {
  const cleanPath = stripLocaleFromPath(path);

  if (locale === defaultLocale) {
    return cleanPath;
  }

  return cleanPath === "/" ? "/zh-CN" : `/zh-CN${cleanPath}`;
}

export function localizedRoute(path: string, locale: Locale): RouteLocationRaw {
  return withLocalePath(path, locale);
}

export function useLocale() {
  const route = useRoute();
  const locale = computed(() => localeFromPath(route.path));
  const routePath = (path: string) => localizedRoute(path, locale.value);
  const localizedCurrentPath = (targetLocale: Locale) =>
    withLocalePath(route.fullPath, targetLocale);

  return {
    locale,
    routePath,
    localizedCurrentPath,
  };
}

