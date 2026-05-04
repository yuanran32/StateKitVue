这份交接文本用于继续接手当前 `StateKit` 仓库状态。当前交接文档统一维护在 `docs/交接/` 下；建议阅读顺序仍然是：先看 `CHANGELOG.md`，再看 `TODO.md`，最后看这份补充说明。

# 本次补充交接（onboarding recipe 示例补强）

## 这次主要完成了什么

这次没有继续扩顶层公开 API，而是沿着现有 `OnboardingState` 方向，把 **recipe 级示例补强** 了一步，重点是证明：

- `OnboardingState` 不只是一个 workspace launch hero
- 它已经可以覆盖 onboarding 链路里的多个真实节点
- 这件事是通过 **现有 props + `#media` / `#actions` slots + 页面层状态控制** 完成的，而不是靠新增组件能力完成的

## 已完成的具体内容

### 1. `OnboardingActivationView` 现在不再只演示 workspace launch

文件：
- `apps/docs/src/views/examples/OnboardingActivationView.vue`

当前这个页面已经同时包含 3 类 onboarding 场景：

1. `onboarding-workspace`
   - 继续作为最完整的 hero / lifecycle 示例
   - 仍然负责展示 host page 控制显示、隐藏、skip、reopen 的模式

2. `onboarding-members`
   - 新增了独立 demo section：`data-testid="onboarding-members-demo"`
   - 用同一个 `OnboardingState` 入口表达“邀请首位成员 / 分配协作角色 / 建立 shared launch ownership”

3. `onboarding-integration`
   - 新增了独立 demo section：`data-testid="onboarding-integration-demo"`
   - 用同一个 `OnboardingState` 入口表达“连接首个集成 / 同步 source system / 在第一条正式 handoff 前完成初始化”

这两个新增 section 都是 **recipe 级示例**，不是新增 docs route，也不是新增新的 category 入口。

### 2. onboarding recipe family 的跳转关系现在更完整

在 `OnboardingActivationView.vue` 里新增了 onboarding family 的链接区，能直接跳到：

- `/recipes/onboarding-workspace-state`
- `/recipes/onboarding-members-state`
- `/recipes/onboarding-integration-state`

这意味着现在 docs 里已经能更自然地从“流程示例页”跳回“recipe 详情页”，把 workflow 示例和 metadata / defaults 文档串起来。

### 3. Playwright 已补上对应覆盖

文件：
- `apps/docs/tests/onboarding-activation.spec.ts`

新增 / 补强的断言包括：

- onboarding recipe family links 会出现
- links 能跳到 members / integration 的 recipe 详情页
- `onboarding-members-demo` 会渲染正确标题和 CTA
- `onboarding-integration-demo` 会渲染正确标题和 CTA
- `Review recipe defaults` 能分别跳回对应 recipe 页面

另外也重新验证了：

- `npm run test:ui -- onboarding-activation.spec.ts`
- `npm run test:ui -- recipes-navigation.spec.ts`

两条命令都通过。

# 现在对 `OnboardingState` 的判断

到目前为止，`OnboardingState` 已经从“只有一个试点 recipe 的 pilot 入口”，推进到“**可以给业务使用的 onboarding category 入口**”。

更准确地说：

- 组件本身已经可用
- recipe 覆盖已经从 1 个扩到 3 个
- docs 示例已经能证明它确实跨 onboarding 节点复用
- API 边界仍然守住，没有往组件里塞 `dismissed` / `showOnce` / `storageKey` / 内建持久化之类状态型能力

所以现在更合理的说法不是“它只是个 renamed empty state”，而是：

- `OnboardingState` 已经基本站住了 category 位置
- 但默认视觉和默认语义仍然偏 `onboarding-workspace`
- 它已经可用，但还没有完全收口成最终发版形态

# 对 TODO 的影响

`docs/交接/TODO.md` 里原先有一条：

- 把 `onboarding` 从 1 个试点 recipe 扩成最小闭环

这条从“代码层面”看其实已经基本完成了，因为当前已有：

- `onboarding-workspace`
- `onboarding-members`
- `onboarding-integration`

并且 docs 示例也已经补到能展示这三者的差异。

但是从“文档口径 / 人工 QA 是否全部收口”看，这条还不能完全打勾，因为还剩：

1. `0.3.0` release framing 已定，但还需要完整发布链路验证
2. README / 首页对 onboarding family 的强调还没有示例页这么强
3. 还没有补围绕 onboarding 的人工 QA 结论

所以建议后续更新 TODO 时，把这条拆成更准确的状态：

- recipe 本体已补齐
- docs recipe-level example 已补强
- 剩余工作转为发布验证 + 文档同步 + 人工 QA

# 现在还值得继续做的事

## P0 / 最靠近发布的事情

1. **完成 `0.3.0` 发布验证**
   - onboarding category 已按 `minor`（`0.3.0`）处理
   - 原因不只是多了几个 recipe，而是已经新增独立 category-first 入口 `OnboardingState`
   - 下一步是跑完整验证链路，再发布 `@statekit-vue/shared@0.3.0` 和 `@statekit-vue/vue@0.3.0`

2. **补一次围绕 onboarding 的人工 QA**
   重点还是这些页面：
   - `/`
   - `/recipes`
   - `/recipes/onboarding-workspace-state`
   - `/recipes/onboarding-members-state`
   - `/recipes/onboarding-integration-state`
   - `/examples/onboarding-activation`
   - `/examples/admin-empty-states`
   - `examples/vite-vue-admin`

   重点确认：
   - onboarding vs empty 的边界是否足够清楚
   - workspace / members / integration 三个 recipe 是否真的看起来像同一 family 下的不同节点，而不是三份随意改文案的卡片
   - 移动端按钮堆叠和 media 区是否稳定

3. **发版前补齐完整发布链路**
   - `npm run typecheck`
   - `npm run build`
   - `npm run test:unit`
   - `npm run test:ui`
   - `npm run pack:check`
   - `npm run smoke:install`

## P1 / 接下来最值的增强方向

1. **把 `OnboardingState` 默认视觉再拉中性一点**
   当前组件默认态仍然偏 `onboarding-workspace`。如果后面继续收口，可以考虑把默认 media / hint wording 调整得更像“通用 onboarding shell”，而不是默认就像“创建工作区 hero”。

2. **决定要不要同步补强 `examples/vite-vue-admin`**
   当前 docs 示例页已经补得比较完整，但 `examples/vite-vue-admin` 里那段 onboarding recipes 区还是相对静态。后续如果要继续增强“外部集成示例”的说服力，可以考虑把 members / integration 也做成更强的 recipe-level demo，而不只是说明文字。

3. **继续减少 docs 手写文案维护点**
   现在 onboarding family 的 docs 教学已经更完整，但仍有一些 homepage / copy 是手写的。后面若继续推进，可考虑让 docs 更多复用 shared metadata，减少再次分叉的风险。

# 注意事项

- 本次 onboarding 示例补强只动了：
  - `apps/docs/src/views/examples/OnboardingActivationView.vue`
  - `apps/docs/tests/onboarding-activation.spec.ts`
- 这次修改的核心原则是：**补示例，不扩 API**。后续继续推进时也尽量守住这个原则。
- 如果后面要更新交接主文档，记得把本次内容同步折叠进：
  - `docs/交接/CHANGELOG.md`
  - `docs/交接/TODO.md`
  - `docs/交接/剩餘部分.md`

# 一句话总结

`OnboardingState` 现在已经不只是一个试点 hero，而是一个已经具备 3 个 recipe、并且在 docs 中能真实展示跨 onboarding 节点复用能力的 category-first 入口；当前已切到 `0.3.0` 发版准备，离发布还差完整验证、QA 和最终文档收口。
