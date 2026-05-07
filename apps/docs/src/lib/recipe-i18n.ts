import type {
  BaseStateProps,
  StateActionSlot,
  StateBlockMeta,
} from "@statekit-vue/shared";
import type { Locale } from "./copy";

interface RecipeTranslation {
  summary: string;
  title: string;
  description?: string;
  primaryAction?: string;
  secondaryAction?: string;
}

const zhRecipeTranslations: Record<string, RecipeTranslation> = {
  "empty-collection-state": {
    summary: "用于集合还没有开始创建内容的场景。",
    title: "还没有任何条目",
    description: "创建第一个条目，开始填充这个集合。",
    primaryAction: "创建条目",
    secondaryAction: "导入",
  },
  "empty-search-state": {
    summary: "用于搜索或筛选条件没有返回任何结果的场景。",
    title: "没有找到结果",
    description: "换一个关键词，或清除当前筛选条件。",
    primaryAction: "清除筛选",
    secondaryAction: "创建条目",
  },
  "first-project-state": {
    summary: "用于工作区已经存在，但团队还没有创建第一个项目的场景。",
    title: "创建第一个项目",
    description: "先用一个项目组织任务、素材和审批，让这个工作区真正开始运转。",
    primaryAction: "创建项目",
    secondaryAction: "查看示例",
  },
  "onboarding-workspace-state": {
    summary: "用于团队进入真实工作区之前，需要一个引导式首次启动状态的场景。",
    title: "欢迎进入你的启动工作区",
    description:
      "把项目、审批和团队成员带进同一条引导流程，团队不用重搭基础设施就能开始推进。",
    primaryAction: "开始引导设置",
    secondaryAction: "观看快速演示",
  },
  "onboarding-members-state": {
    summary: "用于工作区已经创建，下一步需要邀请第一批成员或协作者的场景。",
    title: "邀请第一批团队成员",
    description:
      "把负责人、审核人和执行成员带进工作区，让设置从个人草稿变成共享启动计划。",
    primaryAction: "邀请成员",
    secondaryAction: "复制邀请链接",
  },
  "onboarding-integration-state": {
    summary: "用于团队到达设置阶段，需要先连接初始集成或来源系统的场景。",
    title: "连接第一个集成",
    description:
      "连接团队已经在用的工具，让项目、审批和更新在第一次交接前就进入工作区。",
    primaryAction: "连接集成",
    secondaryAction: "查看设置指南",
  },
  "loading-table-state": {
    summary: "用于表格行正在加载，但仍需要保留表格结构的场景。",
    title: "正在加载记录",
    description: "正在获取这个视图里的最新记录。",
  },
  "loading-workspace-state": {
    summary: "用于正在准备工作区或编辑器界面的场景。",
    title: "正在准备你的工作区",
    description: "我们正在搭好结构，让你可以继续回到工作里。",
  },
  "loading-import-state": {
    summary: "用于导入、同步或批量处理任务正在进行中的场景。",
    title: "导入正在进行",
    description: "大文件上传需要一点时间。处理期间你可以继续做别的工作。",
    primaryAction: "查看任务",
  },
  "inline-error-state": {
    summary: "用于表格、列表或面板内部的局部失败。",
    title: "这里出了点问题",
    description: "重新加载这个区域；如果问题持续出现，再联系支持团队。",
    primaryAction: "重试",
    secondaryAction: "联系支持",
  },
  "page-error-state": {
    summary: "用于整页加载关键数据失败的场景。",
    title: "这个页面暂时无法加载",
    description: "当前视图需要的数据不可用。请刷新，或先回到一个安全页面。",
    primaryAction: "重新加载",
    secondaryAction: "返回",
  },
  "offline-error-state": {
    summary: "用于用户离线或网络连接中断的场景。",
    title: "你现在处于离线状态",
    description: "检查网络连接，恢复在线后再试一次。",
    primaryAction: "重试",
  },
  "no-permission-state": {
    summary: "用于当前用户无法访问某个页面或资源的场景。",
    title: "你没有访问权限",
    description: "向管理员申请这个工作区的访问权限，或返回你可以使用的页面。",
    primaryAction: "申请权限",
    secondaryAction: "返回",
  },
  "role-restricted-state": {
    summary: "用于用户可以查看页面，但不能执行当前动作的场景。",
    title: "你的角色不能执行这个动作",
    description: "你可以查看这些信息，但需要管理员来完成这一步。",
    primaryAction: "联系管理员",
  },
  "session-expired-state": {
    summary: "用于用户会话过期，需要重新认证的场景。",
    title: "你的会话已过期",
    description: "重新登录后继续刚才的操作。",
    primaryAction: "重新登录",
  },
  "upgrade-plan-state": {
    summary: "用于功能受套餐或订阅等级限制的场景。",
    title: "升级后解锁这个功能",
    description: "升级到更高套餐，使用高级流程、更高额度和协作控制能力。",
    primaryAction: "升级套餐",
    secondaryAction: "对比套餐",
  },
  "trial-ending-state": {
    summary: "用于免费试用即将结束的场景。",
    title: "你的试用即将结束",
    description: "现在选择套餐，保持项目、团队成员和自动化流程不中断。",
    primaryAction: "选择套餐",
    secondaryAction: "联系销售",
  },
  "usage-limit-state": {
    summary: "用于团队已经达到配额或套餐限制的场景。",
    title: "你已经达到当前限制",
    description: "提高额度或查看使用情况，让工作不中断地继续推进。",
    primaryAction: "提高限制",
    secondaryAction: "查看用量",
  },
  "task-success-state": {
    summary: "用于导入、导出或后台任务成功完成的场景。",
    title: "任务已完成",
    description: "你的任务已经成功完成。查看结果，或开始下一个任务。",
    primaryAction: "查看结果",
    secondaryAction: "开始下一个",
  },
  "invite-success-state": {
    summary: "用于团队邀请已经发送成功的场景。",
    title: "邀请已发送",
    description: "团队成员很快会收到邮件。你可以继续整理工作区，等他们加入。",
    primaryAction: "管理成员",
    secondaryAction: "继续邀请",
  },
  "publish-success-state": {
    summary: "用于内容、配置或页面发布成功的场景。",
    title: "发布成功",
    description: "你的更改已经上线。查看发布后的页面，或返回控制台。",
    primaryAction: "查看线上页面",
    secondaryAction: "返回控制台",
  },
};

function localizeAction(
  action: StateActionSlot | undefined,
  label: string | undefined,
): StateActionSlot | undefined {
  if (!action || !label) {
    return action;
  }

  return {
    ...action,
    label,
  };
}

export function getRecipeCopy(meta: StateBlockMeta, locale: Locale) {
  if (locale === "en") {
    return {
      summary: meta.summary,
      defaults: meta.defaults,
    };
  }

  const translation = zhRecipeTranslations[meta.slug];

  if (!translation) {
    return {
      summary: meta.summary,
      defaults: meta.defaults,
    };
  }

  const defaults: BaseStateProps = {
    ...meta.defaults,
    title: translation.title,
    description: translation.description ?? meta.defaults.description,
    primaryAction: localizeAction(
      meta.defaults.primaryAction,
      translation.primaryAction,
    ),
    secondaryAction: localizeAction(
      meta.defaults.secondaryAction,
      translation.secondaryAction,
    ),
  };

  return {
    summary: translation.summary,
    defaults,
  };
}

