# Bilibili Digest

把 B 站视频变成一份可学习、可检索、可保存的资料。扩展会读取视频已有字幕，并在 Chrome 侧边栏中提供字幕浏览、DeepSeek AI 总结、章节、关键观点、选中文本解释、时间戳跳转和本地笔记。

## 当前功能

- 支持 `www.bilibili.com/video/BV...` 普通视频页
- 支持多 P 视频，自动识别当前分 P
- 优先读取中文字幕，找不到时使用第一条可用字幕
- 点击字幕、章节或观点即可跳转播放器时间
- DeepSeek 生成概览、章节、重点和解释
- 原文、中文和双语字幕视图
- 笔记与摘要缓存在 Chrome 本地
- 导出带时间戳的 Markdown 文本
- 不需要 Supadata，不经过开发者服务器

## 限制

- 视频必须存在 B 站字幕；第一版不做音频语音识别
- 部分字幕可能要求登录 B 站后才能读取
- 番剧、直播、短视频和站外嵌入页暂未支持
- 当前主要支持 Chrome 116 及以上版本

## 安装

1. 下载项目 ZIP 并解压到一个长期保留的文件夹。
2. Chrome 地址栏打开 `chrome://extensions`。
3. 开启右上角“开发者模式”。
4. 点击“加载已解压的扩展程序”。
5. 选择包含 `manifest.json` 的 `bilibili-digest` 文件夹。
6. 在设置页填写自己的 DeepSeek API Key 并保存。
7. 打开一条带字幕的 B 站视频，点击右上角“AI 总结”。

修改源码后，请回到 `chrome://extensions` 点击扩展卡片上的“重新加载”，然后刷新 B 站页面。

## 数据与密钥

DeepSeek API Key、笔记和缓存只保存在当前 Chrome 配置中。字幕从 B 站接口读取；使用 AI 功能时，相关字幕和视频信息会发送给 DeepSeek。不要把 API Key 写进源码、提交记录、截图或聊天。

## 开发检查

```bash
npm test
npm run check
npm run package
```

打包结果位于 `dist/bilibili-digest-v1.2.2.zip`。

## 许可证

本项目基于 [zarazhangrui/youtube-digest](https://github.com/zarazhangrui/youtube-digest) 二次开发，继续使用 MIT License。原项目版权信息保留在 `LICENSE` 中。
