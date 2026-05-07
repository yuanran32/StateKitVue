<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";
import {
  installSnippet,
  minimalUsageSnippet,
  stylesheetSnippet,
} from "../lib/example-code";
import { installationCopy, installationSteps } from "../lib/copy";
import { useLocale } from "../lib/i18n";

const { locale, routePath } = useLocale();
const copy = computed(() => installationCopy[locale.value]);
const checklist = computed(() => installationSteps[locale.value]);
const installSections = computed(() =>
  copy.value.sections.map((section, index) => ({
    ...section,
    code: [installSnippet, stylesheetSnippet, minimalUsageSnippet][index],
  })),
);
</script>

<template>
  <section class="page-stack">
    <section class="page-hero">
      <div>
        <p class="eyebrow">{{ copy.eyebrow }}</p>
        <h1>{{ copy.title }}</h1>
        <p>
          {{ copy.description }}
        </p>
      </div>

      <div class="page-hero__facts">
        <div class="page-fact">
          <strong>01</strong>
          <span>{{ copy.facts.package }}</span>
        </div>
        <div class="page-fact">
          <strong>02</strong>
          <span>{{ copy.facts.stylesheet }}</span>
        </div>
        <div class="page-fact">
          <strong>03</strong>
          <span>{{ copy.facts.steps }}</span>
        </div>
      </div>
    </section>

    <section class="install-layout">
      <div class="install-steps">
        <article
          v-for="section in installSections"
          :key="section.index"
          class="install-step"
          :data-testid="`installation-step-${section.index}`"
        >
          <span class="install-step__index">{{ section.index }}</span>
          <div class="install-step__body">
            <div class="install-step__copy">
              <h2>{{ section.title }}</h2>
              <p>{{ section.description }}</p>
            </div>
            <pre class="code-block"><code>{{ section.code }}</code></pre>
          </div>
        </article>
      </div>

      <aside class="install-sidebar">
        <section class="detail-section">
          <h2>{{ copy.customizeTitle }}</h2>
          <ul class="detail-bullet-list">
            <li v-for="item in copy.customizeOptions" :key="item">{{ item }}</li>
          </ul>
        </section>

        <section class="detail-section">
          <h2>{{ copy.consistencyTitle }}</h2>
          <ul class="detail-bullet-list">
            <li v-for="item in copy.consistencyNotes" :key="item">{{ item }}</li>
          </ul>
        </section>

        <section class="detail-section">
          <h2>{{ copy.checklistTitle }}</h2>
          <ol class="plain-list">
            <li v-for="step in checklist" :key="step">{{ step }}</li>
          </ol>
        </section>

        <RouterLink
          class="button-link"
          data-testid="installation-browse-recipes"
          :to="routePath('/recipes')"
        >
          {{ copy.browseRecipes }}
        </RouterLink>
      </aside>
    </section>
  </section>
</template>
