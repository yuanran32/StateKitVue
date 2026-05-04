<script setup lang="ts">
import { computed } from "vue";
import { stateBlockMetaById, type BaseStateProps } from "@statekit-vue/shared";
import StateBlockShell from "../../base/StateBlockShell.vue";
import { useMergedStateProps } from "../../lib/merge-state-props";
import type { PresetStateBlockProps } from "../../types";

const props = defineProps<PresetStateBlockProps>();
const slots = defineSlots<{
  media?: () => unknown;
  actions?: () => unknown;
}>();

const defaultProps: BaseStateProps = {
  ...stateBlockMetaById["onboarding-workspace"].defaults,
};

const mergedProps = useMergedStateProps(props, defaultProps);
const hasCustomMedia = computed(() => Boolean(slots.media));
</script>

<template>
  <Transition appear name="sk-onboarding-transition">
    <StateBlockShell v-bind="mergedProps" category="onboarding">
      <template v-if="slots.media" #media>
        <slot name="media" />
      </template>

      <template v-else #media>
        <div class="sk-onboarding-media sk-onboarding-media--default" data-testid="onboarding-default-media">
          <div class="sk-onboarding-media__header sk-onboarding-media__header--default">
            <div>
              <p class="sk-onboarding-media__eyebrow">Launch path</p>
              <strong class="sk-onboarding-media__title">Workspace activation plan</strong>
            </div>
          </div>

          <div class="sk-onboarding-media__window sk-onboarding-media__window--default">
            <div class="sk-onboarding-media__rail sk-onboarding-media__rail--default">
              <div class="sk-onboarding-media__rail-entry is-active">
                <span class="sk-onboarding-media__rail-dot" />
                <span class="sk-onboarding-media__rail-bar is-strong" />
              </div>
              <div class="sk-onboarding-media__rail-entry">
                <span class="sk-onboarding-media__rail-dot" />
                <span class="sk-onboarding-media__rail-bar" />
              </div>
              <div class="sk-onboarding-media__rail-entry">
                <span class="sk-onboarding-media__rail-dot" />
                <span class="sk-onboarding-media__rail-bar" />
              </div>
              <div class="sk-onboarding-media__rail-entry">
                <span class="sk-onboarding-media__rail-dot" />
                <span class="sk-onboarding-media__rail-bar" />
              </div>
            </div>

            <div class="sk-onboarding-media__canvas sk-onboarding-media__canvas--default">
              <div class="sk-onboarding-media__toolbar">
                <span class="is-active">Launch</span>
                <span>People</span>
                <span>Sync</span>
              </div>

              <div class="sk-onboarding-media__stats sk-onboarding-media__stats--default">
                <div class="sk-onboarding-media__stat">
                  <small>Checklist</small>
                  <strong>04</strong>
                </div>
                <div class="sk-onboarding-media__stat">
                  <small>Progress</small>
                  <strong>Guided</strong>
                </div>
              </div>

              <div class="sk-onboarding-media__feed sk-onboarding-media__feed--default">
                <div class="sk-onboarding-media__feed-item">
                  <span />
                  <span />
                </div>
                <div class="sk-onboarding-media__feed-item">
                  <span />
                  <span />
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-if="slots.actions" #actions>
        <slot name="actions" />
      </template>

      <template v-else-if="!hasCustomMedia" #actions>
        <div class="sk-onboarding-actions sk-onboarding-actions--default" data-testid="onboarding-default-actions">
          <div class="sk-onboarding-actions__group">
            <button
              v-if="mergedProps.primaryAction && !mergedProps.primaryAction.href"
              class="sk-shell__action"
              type="button"
            >
              {{ mergedProps.primaryAction.label }}
            </button>
            <a
              v-else-if="mergedProps.primaryAction?.href"
              class="sk-shell__action"
              :href="mergedProps.primaryAction.href"
            >
              {{ mergedProps.primaryAction.label }}
            </a>

            <button
              v-if="mergedProps.secondaryAction && !mergedProps.secondaryAction.href"
              class="sk-shell__action is-secondary"
              type="button"
            >
              {{ mergedProps.secondaryAction.label }}
            </button>
            <a
              v-else-if="mergedProps.secondaryAction?.href"
              class="sk-shell__action is-secondary"
              :href="mergedProps.secondaryAction.href"
            >
              {{ mergedProps.secondaryAction.label }}
            </a>
          </div>

          <p class="sk-onboarding-actions__hint">
            Launch with the default onboarding shell, or replace `#media` and `#actions` when the first-run flow needs richer product context.
          </p>
        </div>
      </template>
    </StateBlockShell>
  </Transition>
</template>
