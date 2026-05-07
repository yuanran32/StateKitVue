export const exampleHeaderCopy = {
  onboardingActivation: {
    en: {
      kicker: "Example",
      title: "Onboarding Activation",
      description:
        "A dedicated onboarding hero that is intentionally louder than the empty-state family: rich media, layered action groups, and a skip path controlled entirely by the host page.",
      chips: ["Hero layout", "Rich media slot", "Controlled lifecycle"],
      compareLink: "Compare with empty states",
      familyEyebrow: "Recipe family",
      familyTitle: "Use one onboarding entry across multiple first-run moments",
      familyDescription:
        "`OnboardingState` stays as the same public entry, while the recipe family shifts the message from workspace launch to team invite and initial integration setup.",
    },
    "zh-CN": {
      kicker: "示例",
      title: "首次引导激活",
      description:
        "一个专门的 onboarding hero，比 empty-state 家族更强：有富媒体、分层 action 组，以及完全由宿主页面控制的跳过路径。",
      chips: ["Hero 布局", "富媒体 slot", "页面控制生命周期"],
      compareLink: "对比空状态示例",
      familyEyebrow: "Recipe 家族",
      familyTitle: "用同一个 onboarding 入口覆盖多个首次启动时刻",
      familyDescription:
        "`OnboardingState` 仍然是同一个公开入口，recipe 家族负责把信息从工作区启动切换到邀请成员和初始集成设置。",
    },
  },
  adminEmptyStates: {
    en: {
      kicker: "Example",
      title: "Admin Empty States",
      description:
        "Two quieter empty-state patterns inside a content operations workspace: inline search recovery that keeps table chrome visible, and a single-CTA panel for creating the first shared collection.",
      chips: ["Inline recovery", "Single CTA with null", "Quiet baseline"],
      onboardingLink: "Open onboarding hero example",
    },
    "zh-CN": {
      kicker: "示例",
      title: "后台空状态",
      description:
        "内容运营工作区里的两种安静空状态：保留表格外框的 inline 搜索恢复，以及用于创建第一个共享集合的单 CTA panel。",
      chips: ["Inline 恢复", "用 null 保持单 CTA", "安静基线"],
      onboardingLink: "打开 onboarding hero 示例",
    },
  },
  permissionsAndUpgrade: {
    en: {
      kicker: "Example",
      title: "Permissions And Upgrade",
      description:
        "A finance workspace rewritten around the current CTA surface: request-access actions, session recovery with a loading label, upgrade decisions, disabled quota controls, and an inline role restriction inside a live review queue.",
      chips: ["Request access", "Loading recovery", "Disabled quota CTA"],
    },
    "zh-CN": {
      kicker: "示例",
      title: "权限与升级",
      description:
        "围绕当前 CTA 表面重写的财务工作区：申请权限、带 loading 文案的会话恢复、升级决策、禁用的配额控制，以及嵌在审核队列里的 inline 角色限制。",
      chips: ["申请权限", "Loading 恢复", "禁用配额 CTA"],
    },
  },
  taskFlow: {
    en: {
      kicker: "Example",
      title: "Task Flow",
      description:
        "A back-office import run rewritten around the current CTA API: custom loading labels, inline retry handlers, anchor-style help links, and a completion state that hides its secondary action when a single next step is enough.",
      chips: ["Custom loading label", "Inline retry", "Single next action"],
    },
    "zh-CN": {
      kicker: "示例",
      title: "任务流程",
      description:
        "围绕当前 CTA API 重写的后台导入流程：自定义 loading 文案、inline 重试处理、锚点帮助链接，以及在单一下一步足够时隐藏次操作的完成状态。",
      chips: ["自定义 loading 文案", "Inline 重试", "单一下步动作"],
    },
  },
} as const;
