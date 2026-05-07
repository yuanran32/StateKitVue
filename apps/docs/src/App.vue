<script setup lang="ts">
import { computed } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";
import { localeLabels, siteCopy } from "./lib/copy";
import { stripLocaleFromPath, supportedLocales, useLocale } from "./lib/i18n";

const route = useRoute();
const { locale, routePath, localizedCurrentPath } = useLocale();

const copy = computed(() => siteCopy[locale.value]);
const plainPath = computed(() => stripLocaleFromPath(route.path));
</script>

<template>
  <div class="site-shell">
    <div class="site-shell__aurora" aria-hidden="true">
      <span class="site-shell__glow is-primary" />
      <span class="site-shell__glow is-secondary" />
      <span class="site-shell__mesh" />
    </div>

    <header class="site-header">
      <div class="site-header__inner">
        <RouterLink class="site-brand" :to="routePath('/')">
          <span class="site-brand__mark">SK</span>
          <span class="site-brand__text">
            <strong>StateKit</strong>
            <small>{{ copy.brandSubtext }}</small>
          </span>
        </RouterLink>

        <nav class="site-nav" :aria-label="copy.navAriaLabel">
          <RouterLink
            class="site-nav__link"
            :class="{ 'is-active': plainPath === '/' }"
            :to="routePath('/')"
          >
            {{ copy.homeNav }}
          </RouterLink>
          <RouterLink
            class="site-nav__link"
            :class="{ 'is-active': plainPath.startsWith('/recipes') }"
            :to="routePath('/recipes')"
          >
            {{ copy.recipesNav }}
          </RouterLink>
          <RouterLink
            class="site-nav__link"
            :class="{ 'is-active': plainPath.startsWith('/examples') }"
            :to="routePath('/examples/onboarding-activation')"
          >
            {{ copy.examplesNav }}
          </RouterLink>
          <RouterLink
            class="site-nav__link"
            :class="{ 'is-active': plainPath.startsWith('/docs') }"
            :to="routePath('/docs/installation')"
          >
            {{ copy.installNav }}
          </RouterLink>

          <span class="site-nav__divider" aria-hidden="true" />

          <RouterLink
            v-for="item in supportedLocales"
            :key="item"
            class="site-nav__link site-nav__link--language"
            :class="{ 'is-active': locale === item }"
            :aria-current="locale === item ? 'page' : undefined"
            :aria-label="`${copy.languageAriaLabel}: ${localeLabels[item]}`"
            :to="localizedCurrentPath(item)"
          >
            {{ localeLabels[item] }}
          </RouterLink>
        </nav>
      </div>
    </header>

    <main class="site-main">
      <RouterView v-slot="{ Component, route: viewRoute }">
        <Transition name="page-fade" mode="out-in">
          <component :is="Component" :key="viewRoute.path" />
        </Transition>
      </RouterView>
    </main>
  </div>
</template>
