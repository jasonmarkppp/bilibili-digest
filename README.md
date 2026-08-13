# Bilibili Digest

Turn Bilibili videos with existing captions into searchable learning resources. The Chrome side panel provides timestamped transcripts, DeepSeek summaries, chapters, key points, explanations, local notes, and timestamp seeking.

## Features

- Standard `www.bilibili.com/video/BV...` pages and multi-part videos
- Existing Bilibili subtitle tracks, with Chinese preferred
- Transcript, Chinese, and bilingual views
- AI overview, chapters, key points, and selected-text explanations
- Timestamp seeking, local notes, cache, and Markdown export
- Bring your own DeepSeek API key
- No Supadata and no developer-operated server

Videos without a Bilibili subtitle track are not supported in this first version. Anime pages, live streams, short videos, and embeds are also outside the current scope.

## Install

1. Download and extract the project to a permanent folder.
2. Open `chrome://extensions` in Chrome 116 or newer.
3. Enable Developer mode and choose **Load unpacked**.
4. Select the folder that contains `manifest.json`.
5. Enter your DeepSeek API key in the extension Settings page.
6. Open a captioned Bilibili video and click **AI 总结**.

After editing the source, reload the extension from `chrome://extensions` and refresh the Bilibili page.

## Checks

```bash
npm test
npm run check
npm run package
```

The package is written to `dist/bilibili-digest-v1.2.2.zip`.

## Privacy and license

Keys, notes, and cache stay in local Chrome storage. Bilibili supplies captions; DeepSeek receives transcript and relevant video context only when AI features are used. Never place API keys in source code or commits.

This is an MIT-licensed remix of [zarazhangrui/youtube-digest](https://github.com/zarazhangrui/youtube-digest). The upstream copyright notice remains in `LICENSE`.
