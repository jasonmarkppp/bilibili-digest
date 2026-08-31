# Bilibili Digest

把 B 站长视频变成可阅读、可跳转、可总结、可保存的学习资料。

当前版本：**v1.2.9**

## 字幕获取逻辑

v1.2.9 起，字幕统一按照以下顺序获取：

```text
/x/player/wbi/v2
        ↓
/x/v2/subtitle/web/view
        ↓
      ASR
```

核心原则：

> **B 站播放器已经存在的字幕永远优先于插件自己的 ASR。**

第一步使用 `/x/player/wbi/v2`。如果旧接口没有字幕，再使用 `/x/v2/subtitle/web/view`。

新版 `/x/v2/subtitle/web/view` 可能返回 Protobuf。扩展已经加入解析逻辑，并提取真正的字幕轨道与字幕文件 URL。部分 B 站 AI 字幕需要浏览器已经登录 B 站。

只有两个 B 站字幕接口都明确没有可用字幕时，才会检查是否配置阿里云百炼 Fun-ASR。

## 字幕来源

插件内部只定义三种字幕来源：

- `manual` → **人工字幕**
- `bilibili-ai` → **B站 AI 字幕**
- `asr` → **ASR 转写**

字幕区域会显示当前来源，例如：

```text
字幕来源：人工字幕
字幕来源：B站 AI 字幕
字幕来源：ASR 转写
```

AI 翻译、润色、总结属于后处理，不会改变字幕来源。

## 当前功能

- 支持 `www.bilibili.com/video/BV...` 普通视频页
- 支持多 P 视频并自动识别当前分 P
- 优先读取 B 站已有字幕
- 支持 `/x/player/wbi/v2`
- 支持 `/x/v2/subtitle/web/view` Protobuf fallback
- 支持人工字幕 / B站 AI 字幕来源识别
- 完全无字幕时可选 Fun-ASR
- DeepSeek 生成概览、章节、重点和解释
- 点击字幕、章节或观点跳转播放器时间
- 字幕跟随播放
- 原文、中文和双语字幕视图
- 本地笔记与摘要缓存
- Markdown / HTML 导出
- 复制到飞书
- 不需要 Supadata，不经过开发者自建服务器

## API 配置

| 服务 | 是否必需 | 用途 |
| --- | --- | --- |
| DeepSeek API Key | 必需 | AI 概览、章节、观点、翻译与解释 |
| 阿里云百炼 API Key | 可选 | 仅在两个 B 站字幕接口都没有可用字幕时执行 Fun-ASR |

即使配置了百炼 API Key，也不会跳过 B 站字幕直接运行 ASR。

## 异常处理

以下情况会区分处理：

- 确实没有字幕
- B 站字幕接口请求失败
- 登录态 / 权限不足
- 字幕轨道存在但字幕文件下载失败
- ASR 转写失败

登录或接口错误不会直接显示成“视频没有字幕”，也不会因此误触发 ASR。

## 安装

1. 下载 Release ZIP 并解压。
2. 打开 `chrome://extensions/` 或 `edge://extensions/`。
3. 开启开发者模式。
4. 点击“加载已解压的扩展程序”。
5. 选择包含 `manifest.json` 的目录。
6. 在设置页填写 DeepSeek API Key。
7. 如果需要处理完全无字幕的视频，再填写阿里云百炼 API Key。
8. 打开 B 站视频并点击“AI 总结”。

## v1.2.9 更新

- 新增 `/x/v2/subtitle/web/view` fallback
- 支持 Protobuf 字幕元数据解析
- 新增人工字幕 / B站 AI 字幕 / ASR 转写三类来源
- 改为 B 站字幕优先、ASR 最后 fallback
- 修复配置 ASR 后优先跑 ASR 的旧逻辑
- 修复缓存层对 ASR 的旧偏好
- 增加来源标签与更清晰的错误分类

## 数据与密钥

DeepSeek / DashScope API Key、笔记和缓存保存在浏览器扩展本地存储。

扩展不会在日志中打印：

- API Key
- Cookie
- SESSDATA
- 其他用户隐私信息

使用 AI 功能时，字幕文本会发送到用户配置的 AI 服务。只有实际进入 ASR fallback 时，视频音轨才会上传到阿里云百炼相关服务。

## 许可证

本项目基于 [zarazhangrui/youtube-digest](https://github.com/zarazhangrui/youtube-digest) 二次开发，继续使用 MIT License。
