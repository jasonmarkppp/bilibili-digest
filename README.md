# Bilibili Digest 📺

> **把 B 站长视频，变成可以阅读、跳转、总结和保存的中文学习资料。**

一个适用于 **Microsoft Edge、Google Chrome 及其他 Chromium 浏览器**的开源 B 站 AI 视频学习扩展。

Bilibili Digest 会直接集成到哔哩哔哩视频页面中，将视频转换为：

**字幕 → 中文概览 → 章节时间线 → 关键观点 → 笔记 → 可导出资料**

<p align="center">
  <a href="https://microsoftedge.microsoft.com/addons/detail/bilibili-digest/aajfbjohlhgcmdoecfgbiopkpjojdaca">
    <strong>🛍️ Microsoft Edge Add-ons 安装</strong>
  </a>
  ·
  <a href="https://github.com/jasonmarkppp/bilibili-digest/releases/tag/v1.2.9">
    <strong>📦 Latest Release v1.2.9</strong>
  </a>
  ·
  <a href="https://b23.tv/xls42lN">
    <strong>▶️ B 站使用教程</strong>
  </a>
</p>

<p align="center">
  <strong>Microsoft Edge Add-ons：已正式发布 ✅</strong>
  <br>
  Open Source · MIT License · Manifest V3
</p>

---

## 🌍 English Summary

**Bilibili Digest** is an open-source AI learning companion built specifically for Bilibili.

It turns long-form Bilibili videos into transcripts, Chinese summaries, timestamped chapters, key insights, notes and exportable learning materials.

The extension includes Bilibili-specific support for video switching, multi-part videos, collections, manual/AI Bilibili subtitle tracks, optional Fun-ASR fallback, timestamp navigation, fullscreen notes and per-video local caching.

It is currently publicly available through **Microsoft Edge Add-ons**.

---

## 🖼️ Preview

### Bilibili 原生页面集成

<img width="1912" height="921" alt="image" src="https://github.com/user-attachments/assets/79741773-2f71-4e66-8489-f1b028dc9dff" />


### AI 总结 / 中文章节 / 时间线

<img width="1914" height="950" alt="image" src="https://github.com/user-attachments/assets/d863ff2a-16a9-4f0e-87a0-f83a38e98553" />


### 字幕 / 笔记 / 时间戳跳转

<img width="1899" height="947" alt="image" src="https://github.com/user-attachments/assets/31e7cbc6-58fb-4e70-9c70-618ef0be6696" />


### Microsoft Edge Add-ons

<img width="1462" height="846" alt="image" src="https://github.com/user-attachments/assets/9ae9b385-bac0-4b93-a16f-9f27c50b59ef" />


---

## ✨ Bilibili Digest 能做什么？

Bilibili Digest 并不是简单地把一整段字幕丢给 AI。

它围绕 B 站真实使用场景处理了几个关键问题：

- B 站单页应用的视频切换
- BV / 分 P / 合集分集识别
- B 站人工字幕读取
- B 站 AI 字幕识别与来源标记
- 新版 `/x/v2/subtitle/web/view` 字幕接口 fallback
- 完全无字幕时可选 Fun-ASR 语音识别
- 中文 AI 概览
- 中文章节时间线
- 时间戳点击跳转
- 字幕跟随播放位置
- 普通页面与全屏笔记
- 不同视频的数据隔离
- Markdown / HTML 导出
- 复制到飞书
- 本地缓存
- Chrome / Edge Manifest V3 支持

---

## 🚀 快速安装

### 方法一：Microsoft Edge Add-ons（推荐）

Bilibili Digest 已正式发布到 Microsoft Edge Add-ons。

👉 **[安装 Bilibili Digest](https://microsoftedge.microsoft.com/addons/detail/bilibili-digest/aajfbjohlhgcmdoecfgbiopkpjojdaca)**

安装完成后：

1. 打开或刷新 B 站视频页面。
2. 在视频操作栏找到 **AI 总结**。
3. 点击后打开浏览器侧边栏。
4. 配置 DeepSeek API Key；只有需要识别“完全无 B 站字幕”的视频时，再配置阿里云百炼 API Key。

通过 Microsoft Edge Add-ons 安装后，可以正常接收后续商店版本更新。

---

### 方法二：GitHub Release

也可以通过 GitHub Release 获取正式发布版本：

👉 **[Bilibili Digest v1.2.9](https://github.com/jasonmarkppp/bilibili-digest/releases/tag/v1.2.9)**

下载并解压后：

#### Chrome

1. 打开：

```text
chrome://extensions/
```

2. 开启右上角 **开发者模式**。
3. 点击 **加载已解压的扩展程序**。
4. 选择解压后的 Bilibili Digest 文件夹。

#### Microsoft Edge

1. 打开：

```text
edge://extensions/
```

2. 开启 **开发人员模式**。
3. 点击 **加载解压缩的扩展**。
4. 选择解压后的文件夹。

安装完成后刷新已经打开的 B 站视频页面。

---

### 方法三：从源码加载

```bash
git clone https://github.com/jasonmarkppp/bilibili-digest.git
cd bilibili-digest
```

然后在 Chrome / Edge 扩展管理页面开启开发者模式并直接加载项目根目录。

扩展运行本身不依赖 npm。

npm 主要用于：

- 自动化测试
- 发布检查
- 生成 Release ZIP

---

# ✨ 核心功能

## 1. B 站原生页面集成

扩展会直接在 Bilibili 视频操作栏中加入：

```text
AI 总结
```

按钮会：

- 固定跟随在“转发”按钮右侧
- 页面缩放后继续跟随工具栏布局
- 点击后打开浏览器原生 Side Panel
- 无需复制视频链接
- 无需进入第三方总结网站
- 支持 B 站 SPA 页面的视频切换

侧边栏主要包含：

```text
字幕
概览
笔记
```

---

## 2. BV / 分 P / 合集状态隔离

B 站经常在**不刷新整个网页**的情况下切换：

```text
BV
分 P
合集
分集
```

如果只按照页面 URL 或初始视频状态处理，很容易出现：

> 打开第二个视频，却仍然看到第一个视频的字幕和总结。

因此 Bilibili Digest 会根据当前：

```text
BV 号
CID
分 P 参数
合集 / 分集标识
当前活动视频
```

建立独立状态与本地缓存。

不同视频之间的：

- 字幕
- 总结
- 笔记
- 时间线
- 缓存

都会进行隔离。

---

## 3. B 站字幕优先 + 新版字幕接口 fallback

v1.2.9 起，Bilibili Digest 不再把 ASR 当作优先字幕来源。

统一字幕获取链路：

```text
点击 AI 总结
      ↓
第一优先级：/x/player/wbi/v2
      ↓
有字幕？
├─ 是 → 使用 B 站字幕
└─ 否
      ↓
第二优先级：/x/v2/subtitle/web/view
      ↓
有字幕？
├─ 是 → 使用 B 站字幕
└─ 否
      ↓
检查是否配置 ASR
├─ 已配置 → Fun-ASR 转写
└─ 未配置 → 提示“当前视频未找到可用字幕”
```

核心原则：

> **B 站播放器已经存在的字幕永远优先于插件自己的 ASR。**

这样可以避免在已经存在字幕时重复下载音轨、等待转写和消耗 ASR API 额度。

### 第一字幕接口：`/x/player/wbi/v2`

扩展首先请求：

```text
https://api.bilibili.com/x/player/wbi/v2
```

并校验当前视频的：

```text
bvid
cid
```

避免多 P 或视频切换后字幕错配。

### 第二字幕接口：`/x/v2/subtitle/web/view`

如果旧接口没有返回字幕轨道，扩展继续请求：

```text
https://api.bilibili.com/x/v2/subtitle/web/view
```

该接口用于读取 **B 站播放器已经存在的字幕轨道**，不是插件 ASR。

当前网页端响应可能为 Protobuf。v1.2.9 已加入轻量 Protobuf decoder，并同时兼容 JSON 响应，用于提取：

```text
lan
lan_doc
subtitle_url
type
ai_type
ai_status
```

获取真正字幕文件 URL 后，再转换为插件统一的时间戳字幕结构。

部分 B 站 AI 字幕依赖登录态；扩展会使用当前浏览器的 B 站会话请求接口，但不会读取、保存或打印 Cookie / SESSDATA。

---

## 4. 字幕来源分类与 ASR fallback

插件内部只使用 3 种字幕来源：

| 内部类型 | UI 显示 | 含义 |
| --- | --- | --- |
| `manual` | 人工字幕 | UP 主上传、人工制作或 B 站已有非 AI 字幕轨道 |
| `bilibili-ai` | B站 AI 字幕 | B 站自动语音识别生成的 AI 字幕轨道 |
| `asr` | ASR 转写 | 插件调用阿里云 Fun-ASR 等第三方 ASR 得到的文字 |

B 站 AI 字幕会结合字幕轨道的 `type`、`lan`、`ai_type` 等字段判断，例如 `ai-zh`。

如果同一视频同时存在多条轨道，优先级为：

```text
中文人工字幕
↓
中文 B站 AI 字幕
↓
其他人工字幕
↓
其他 B站 AI 字幕
```

只有两个 B 站字幕接口都明确没有可用字幕时，才会进入 ASR fallback。

```text
B 站字幕接口都为空
      ↓
已配置百炼 API Key？
├─ 是 → 下载低码率音轨 → Fun-ASR → ASR 转写
└─ 否 → 当前视频未找到可用字幕，如需识别无字幕视频，请先配置 ASR
```

请求失败、登录态异常、权限问题和“确实没有字幕”会分别处理，不会把 401 / 403 / 登录问题伪装成“视频没有字幕”，也不会因此误触发 ASR。

AI 翻译、润色、总结都属于后处理，不会改变字幕来源。例如：

```text
B站 AI 字幕
      ↓
AI 翻译 / 重写 / 总结
      ↓
来源仍然是：B站 AI 字幕
```

字幕区域会以轻量标签显示当前来源：

```text
字幕来源：人工字幕
字幕来源：B站 AI 字幕
字幕来源：ASR 转写
```

---

## 5. 中文 AI 概览

获得字幕或 ASR 文本以后，可以交给 DeepSeek 生成：

- 视频内容概览
- 简体中文章节时间线
- 每章内容说明
- 关键观点
- 重点内容
- 值得记录的信息
- 可继续整理的学习笔记

章节标题和章节说明会明确要求使用**简体中文**。

即使视频中包含大量英文术语，也不会轻易生成一整套英文目录。

---

## 6. 时间戳跳转

字幕和 AI 总结中的时间可以直接与播放器联动。

例如：

```text
00:27 → 视频第 27 秒

04:18 → 视频第 4 分 18 秒

35:42 → 视频第 35 分 42 秒
```

点击时间戳后，播放器会直接 Seek 到对应位置。

字幕列表也可以根据当前播放进度进行跟随。

---

## 7. 普通页面与全屏笔记

除了 Side Panel 中的笔记功能，Bilibili Digest 也适配了播放器全屏场景。

观看视频过程中可以记录：

- 当前时间戳
- 临时想法
- 视频重点
- 待办事项
- 值得回看的片段
- 学习笔记

笔记绑定当前视频身份。

切换 BV / 分 P 后，不会和其他视频混在一起。

---

## 8. 多格式导出

当前支持：

```text
Markdown
HTML
复制到飞书
```

可以继续整理到：

- 飞书文档
- 飞书知识库
- Obsidian
- Notion
- Typora
- GitHub
- 个人博客
- 本地 HTML

Bilibili Digest 的目标不是只生成一次性 AI 输出，而是让视频内容可以继续进入后续知识管理流程。

---

# 🌐 浏览器兼容性

| 浏览器 | 建议版本 | 支持情况 |
| --- | ---: | --- |
| Microsoft Edge | 116+ | ✅ 正式支持 / 已上架商店 |
| Google Chrome | 116+ | ✅ 主要支持 |
| 其他 Chromium 浏览器 | 116+ | ⚠️ 取决于 Side Panel API |
| Firefox | — | ❌ 当前不支持 |
| Safari | — | ❌ 当前不支持 |

Chrome 和 Microsoft Edge 使用同一套扩展代码。

主要依赖：

```text
Manifest V3
Side Panel API
Declarative Net Request
chrome.storage.local
```

---

# 🔑 API 配置

| 服务 | 是否必需 | 用途 |
| --- | --- | --- |
| DeepSeek API Key | 必需 | AI 概览、章节、观点及内容整理 |
| 阿里云百炼 API Key | 可选 | 仅当 B 站两个字幕接口都没有可用字幕时，用于 Fun-ASR 语音识别 |

打开 Bilibili Digest 的：

```text
设置
```

填写对应 API Key 后保存即可。

当前版本不会把 API Key 上传到项目自己的服务器。

密钥保存在：

```text
chrome.storage.local
```

也就是当前浏览器的扩展本地存储。

---

## 更新扩展时如何保留 API Key？

### 商店版本

如果通过 Microsoft Edge Add-ons 正常更新：

```text
旧版本
↓
商店自动更新
↓
扩展 ID 保持不变
↓
本地 API Key 一般继续保留
```

---

### 开发者模式

**不要先删除旧扩展。**

Chrome / Edge 在卸载扩展时会清除该扩展对应的本地数据。

推荐：

```text
保留原扩展目录
      ↓
使用新版本覆盖原文件
      ↓
打开扩展管理页面
      ↓
点击“重新加载”
```

只要扩展身份保持一致：

```text
chrome.storage.local
```

中的 Key 就可以继续使用。

从 `v1.2.6` 开始，项目在 `manifest.json` 中加入固定扩展身份公钥，用于提高开发者模式下扩展 ID 的稳定性。

---

# 🧠 工作原理

```text
打开 B 站视频
      ↓
识别当前 BV / AID / CID / 分 P / 合集
      ↓
用户点击 AI 总结
      ↓
请求 /x/player/wbi/v2
      ↓
有可用字幕？
├─ 是 → 分类为「人工字幕」或「B站 AI 字幕」
└─ 否
      ↓
请求 /x/v2/subtitle/web/view
      ↓
解析 JSON / Protobuf 字幕轨道
      ↓
有可用字幕？
├─ 是 → 分类为「人工字幕」或「B站 AI 字幕」
└─ 否
      ↓
是否配置 ASR？
├─ 是 → 低码率音轨 → Fun-ASR →「ASR 转写」
└─ 否 → 提示未找到可用字幕
      ↓
统一字幕结构
      ↓
DeepSeek
      ↓
概览 / 中文章节 / 观点
      ↓
时间戳 / 笔记 / 导出
      ↓
按视频本地保存
```

当前核心设计：

> **`/x/player/wbi/v2 → /x/v2/subtitle/web/view → ASR`。B 站已有字幕永远优先，ASR 只负责真正无字幕的视频。**

无论字幕来自旧接口、新接口还是 ASR，后续总结、问答、时间戳、笔记和导出都只消费同一份统一字幕结构，不需要感知具体 Provider。

---

# 🎙️ 为什么使用阿里云百炼 Fun-ASR？

原上游项目主要围绕 YouTube 和 Supadata 工作。

但 Bilibili Digest 的使用场景主要面向：

```text
Bilibili
中文视频
国内用户
```

因此项目保留 Fun-ASR 作为 **真正无 B 站字幕时的最后 fallback**，而不是默认字幕来源。

Fun-ASR 的优势包括：

- 国内账号使用更方便
- 中文语音识别更符合当前场景
- 用户不需要本地部署 Python
- 不需要下载本地 ASR 模型
- 不长期占用 CPU / GPU
- 浏览器只在用户需要时调用

Fun-ASR 的免费额度和价格由阿里云百炼决定。

本项目：

- 不绕过平台计费
- 不承诺永久免费
- 不提供未经授权的 API 中转

---

# ⚡ ASR 为什么比字幕慢？

无字幕视频需要完整经历：

```text
获取播放信息
↓
获取音轨
↓
下载低码率音频
↓
上传
↓
创建 Fun-ASR 任务
↓
等待识别
↓
获取结果
↓
DeepSeek 生成概览
```

因此一定比直接读取 B 站已有字幕慢。

耗时主要受到：

- 视频长度
- 网络速度
- B 站音轨下载速度
- 阿里云任务队列
- DeepSeek 响应时间

影响。

---

# ⚠️ HTTP 403

B 站音轨 URL 通常包含临时鉴权信息。

如果出现：

```text
语音识别失败
B站音轨下载失败：HTTP 403
```

建议：

1. 刷新 B 站视频页面。
2. 确认当前视频可以正常播放。
3. 重新点击 AI 总结。
4. 更新扩展后重新加载扩展。
5. 检查视频是否存在付费、地区、权限等限制。

私密、付费、地区限制或特殊权限视频不保证可以进行音轨识别。

---

# 📖 使用流程

```text
1. 打开公开 B 站视频
        ↓
2. 点击“AI 总结”
        ↓
3. 打开 Side Panel
        ↓
4. 优先获取 B 站字幕；确实无字幕时才使用 Fun-ASR
        ↓
5. 查看中文 AI 概览
        ↓
6. 点击时间戳跳转
        ↓
7. 记录笔记
        ↓
8. 导出 Markdown / HTML / 飞书
```

---

# 📁 项目结构

```text
bilibili-digest/
├── manifest.json
├── background.js
├── content.js
├── settings.js
│
├── sidepanel.html
├── sidepanel.css
├── sidepanel.js
│
├── options.html
├── options.css
├── options.js
│
├── prompts/
├── rules/
├── icons/
│
├── tests/
├── scripts/
│
├── docs/
│   └── images/
│       ├── bilibili-page.png
│       ├── ai-summary.png
│       ├── notes-timeline.png
│       └── edge-store.png
│
├── PRIVACY.md
├── SECURITY.md
├── LICENSE
└── README.md
```

---

# 🧱 技术栈

```text
Chrome Extension Manifest V3
Vanilla JavaScript
HTML5
CSS3
Side Panel API
Declarative Net Request
Chrome Storage
DeepSeek API
阿里云百炼 Fun-ASR
Bilibili Web API
```

项目没有使用 React、Vue 等前端框架。

扩展加载后可以直接运行。

---

# 🛠️ 本地开发

安装开发依赖：

```bash
npm install
```

运行测试：

```bash
npm test
```

执行发布检查：

```bash
npm run check
```

生成发布包：

```bash
npm run package
```

当前版本输出：

```text
dist/bilibili-digest-v1.2.9.zip
```

---

# 🧪 Release History

## v1.2.9

- 字幕获取优先级改为 `/x/player/wbi/v2 → /x/v2/subtitle/web/view → ASR`
- 增加 B 站新版 `/x/v2/subtitle/web/view` fallback
- 支持新版字幕接口 Protobuf 响应解析，同时兼容 JSON
- 字幕来源统一为「人工字幕 / B站 AI 字幕 / ASR 转写」
- B 站字幕存在时不再重复调用 ASR，减少等待和 API 成本
- 区分“无字幕 / 登录或权限问题 / 字幕接口请求失败”
- 修复配置 ASR 后缓存层偏向 ASR 的旧逻辑
- 字幕来源与 AI 翻译 / 重写 / 总结状态分离
- 增加 Provider fallback 与来源分类测试

---

## v1.2.8

- API 设置写入后立即从扩展存储读回校验
- 只有真实写入成功才显示“保存成功”
- 百炼 Key 可以独立保存
- 修复 DeepSeek Key 未配置时影响百炼 Key 保存的问题
- 完善开发者模式更新说明
- Microsoft Edge Add-ons 正式发布

---

## v1.2.7

- AI 总结和普通页面记笔记按钮改为外置绝对定位浮层
- 不再插入 B 站 Vue 管理的工具栏及播放器子树
- 删除未使用的 `scripting` 权限
- 降低与 B 站页面运行环境之间的干扰
- 保留浏览器原生全屏笔记

---

## v1.2.6

- 移除播放器容器布局写入
- 修复可能影响 B 站播放器和页面头部布局的问题
- “重置扩展数据”改为“重置内容数据（保留密钥）”
- 清理摘要、翻译、笔记时不再删除 API Key
- 加入固定扩展身份公钥

---

## v1.2.5

- 修复播放器定位样式导致页面顶部出现大块空白的问题
- AI 总结按钮固定跟随转发按钮右侧

---

## v1.2.4

- [x] B 站视频页面 AI 总结按钮
- [x] Chrome / Microsoft Edge
- [x] Chromium Manifest V3
- [x] B 站字幕读取
- [x] 阿里云百炼 Fun-ASR
- [x] 低码率音轨优先
- [x] HTTP 403 请求适配
- [x] BV / 分 P / 合集状态隔离
- [x] 视频切换内容隔离
- [x] 简体中文章节时间线
- [x] 时间戳跳转
- [x] 字幕播放跟随
- [x] 普通页面笔记
- [x] 全屏播放器笔记
- [x] Markdown 导出
- [x] HTML 导出
- [x] 复制到飞书
- [x] B 站主题界面
- [x] 本地缓存

---

# 🗺️ Roadmap

- [x] Microsoft Edge Add-ons 正式发布
- [ ] Chrome Web Store 发布
- [ ] 番剧页面适配
- [ ] 直播回放适配
- [ ] 课堂页面适配
- [ ] ASR 进度展示优化
- [ ] 更细的长视频分段策略
- [ ] 导出模板自定义
- [ ] 飞书开放平台直接写入
- [ ] 缓存管理
- [ ] 单视频重新分析

> Roadmap 代表可能的后续方向，不代表已经完成或承诺上线时间。

---

# ⚠️ 当前局限

当前版本主要针对普通 Bilibili 视频页面。

以下场景可能存在兼容问题：

- 番剧
- 直播
- 课堂
- 私密视频
- 付费视频
- 地区限制视频
- 特殊活动页面

另外：

- 即使配置了百炼 API Key，也会优先使用 B 站已有字幕
- 只有两个 B 站字幕接口都没有可用字幕时才会进入 ASR
- `/x/v2/subtitle/web/view` 的部分 AI 字幕依赖 B 站登录态
- ASR 需要等待视频音轨处理和云端识别
- DeepSeek / 百炼价格及额度由对应平台决定
- B 站修改网页结构或内部接口后可能需要更新扩展
- 其他 Chromium 浏览器可能缺少完整 Side Panel API

---

# 🔐 隐私

当前版本：

- ❌ 没有账号系统
- ❌ 没有自建 API 中转服务器
- ❌ 没有广告
- ❌ 没有埋点统计
- ❌ 不收集用户视频观看记录

API Key：

```text
保存在浏览器扩展本地存储
```

执行 AI 分析时：

```text
字幕文本 → 用户配置的 AI 服务
```

执行 ASR 时：

```text
视频音轨 → 阿里云百炼相关服务
```

详细说明：

- `PRIVACY.md`
- `SECURITY.md`

> 请勿在 GitHub Issue、截图或代码中提交真实 API Key、Cookie 或其他账号隐私信息。

---

# 🤝 上游项目与二次开发说明

本项目基于：

**[zarazhangrui/youtube-digest](https://github.com/zarazhangrui/youtube-digest)**

进行二次开发。

感谢原作者公开项目以及核心产品思路。

Bilibili Digest 针对 Bilibili 重新进行了大量平台适配，包括：

- YouTube 页面 → Bilibili 视频页面
- YouTube 视频身份 → BV / CID / 分 P / 合集识别
- 重写 B 站操作栏按钮
- 重写播放器交互逻辑
- B 站主题中文 Side Panel
- 中文设置页面
- 阿里云百炼 Fun-ASR
- B 站 WBI 字幕接口 `/x/player/wbi/v2`
- B 站新版字幕接口 `/x/v2/subtitle/web/view` + Protobuf 解析
- 人工字幕 / B站 AI 字幕 / ASR 转写来源分类
- `bvid / cid` 字幕身份校验
- B 站音轨获取
- HTTP 403 请求适配
- 多视频状态隔离
- 中文章节生成
- 时间戳跳转
- 全屏笔记
- 多格式导出
- 本地缓存
- 移除 YouTube / Supadata 运行依赖

本项目不是哔哩哔哩官方产品。

---

# 📄 License

本项目使用：

**[MIT License](LICENSE)**

你可以在 MIT License 允许范围内：

- 使用
- 修改
- Fork
- 二次开发
- 部署
- 商业使用

但需要保留对应版权及许可证声明，并遵循上游项目许可证要求。

---

# 💡 项目理念

Bilibili Digest 不想只做：

> “把字幕复制出来，然后让 AI 总结一下。”

它更希望把长视频真正转换成可以继续使用的资料：

```text
能读
能搜
能跳转
能总结
能记笔记
能导出
```

并尽可能做到：

> **不自动消耗额度、不混淆不同视频、不让中文用户拿到一整套莫名其妙的英文章节。**

---

# ⭐ Support

如果 Bilibili Digest 对你有帮助：

- ⭐ Star
- 🍴 Fork
- 🐛 提交 Issue
- 🔧 提交 Pull Request

都非常欢迎。

反馈问题时建议提供：

```text
浏览器版本
扩展版本
B站视频链接
是否存在 B 站字幕轨道（人工 / AI）
两个 B 站字幕接口都为空时是否启用 Fun-ASR
错误信息
可公开的控制台日志
```

提交前请删除：

```text
API Key
Cookie
Token
账号隐私信息
```

---

<p align="center">
  <strong>Bilibili Digest 📺</strong>
  <br>
  Turn Bilibili videos into reusable knowledge.
</p>
