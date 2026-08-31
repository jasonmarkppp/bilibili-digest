
const fs = require("fs");
const vm = require("vm");
const assert = require("assert");

const source = fs.readFileSync("background.js", "utf8");
const start = source.indexOf("// === BILIBILI SUBTITLE PROVIDER V2 START ===");
const end = source.indexOf("// === BILIBILI SUBTITLE PROVIDER V2 END ===");
assert(start >= 0 && end > start, "provider block not found");
const block = source.slice(start, end);

const context = {
  console,
  TextDecoder,
  URL,
  URLSearchParams,
  BigInt,
  Number,
  Object,
  Array,
  String,
  Math,
  JSON,
  encodeURIComponent,
  setTimeout,
  clearTimeout,
  YTD_SETTINGS: { canonicalBilibiliUrl() {} },
  debugLog() {},
  getSettings: async () => ({ asrApiKey: "" }),
  transcribeWithBailian: async () => {
    throw new Error("ASR stub not configured");
  },
};
vm.createContext(context);
vm.runInContext(
  block +
    "\nglobalThis.__test = { classify: bdClassifyBilibiliTrack, sort: bdSortTracks, parse: bdParseWebSubtitleProtobuf, handle: handleFetchTranscript };",
  context,
);

function varint(n) {
  let x = BigInt(n);
  const out = [];
  do {
    let b = Number(x & 0x7fn);
    x >>= 7n;
    if (x) b |= 0x80;
    out.push(b);
  } while (x);
  return Buffer.from(out);
}
function fieldVar(no, val) {
  return Buffer.concat([varint((no << 3) | 0), varint(val)]);
}
function fieldBytes(no, buf) {
  buf = Buffer.from(buf);
  return Buffer.concat([varint((no << 3) | 2), varint(buf.length), buf]);
}
function fieldText(no, s) {
  return fieldBytes(no, Buffer.from(s));
}
function track({ id = 1, lan, doc, url, type = 0, aiType = 0 }) {
  return Buffer.concat([
    fieldVar(1, id),
    fieldText(2, String(id)),
    fieldText(3, lan),
    fieldText(4, doc),
    fieldText(5, url),
    fieldVar(7, type),
    fieldVar(9, aiType),
  ]);
}
function webProto(trackBuffers) {
  return fieldBytes(
    1,
    Buffer.concat(trackBuffers.map((item) => fieldBytes(3, item))),
  );
}

const manualTrack = track({
  lan: "zh-CN",
  doc: "中文",
  url: "//manual.json",
  type: 0,
});
const aiTrack = track({
  id: 2,
  lan: "ai-zh",
  doc: "中文（AI生成）",
  url: "//ai.json",
  type: 1,
});
const parsed = context.__test.parse(webProto([manualTrack, aiTrack]));
assert.equal(parsed.length, 2);
assert.equal(context.__test.classify(parsed[0]).sourceType, "manual");
assert.equal(context.__test.classify(parsed[1]).sourceType, "bilibili-ai");
assert.equal(context.__test.sort(parsed)[0].lan, "zh-CN");

class Headers {
  constructor(contentType = "") {
    this.contentType = contentType;
  }
  get(name) {
    return name.toLowerCase() === "content-type" ? this.contentType : null;
  }
}
function jsonResponse(data, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: new Headers("application/json"),
    async json() { return data; },
    async arrayBuffer() { return Buffer.from(JSON.stringify(data)); },
  };
}
function binaryResponse(data, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: new Headers("application/octet-stream"),
    async arrayBuffer() { return data; },
  };
}

const VIEW = {
  code: 0,
  data: { bvid: "BV1234567890", aid: 99, pages: [{ cid: 88 }] },
};
const BODY = { body: [{ from: 0, to: 1.2, content: "hello" }] };

async function runScenario(name, route, asrKey = "") {
  let asrCalls = 0;
  context.getSettings = async () => ({ asrApiKey: asrKey });
  context.transcribeWithBailian = async () => {
    asrCalls += 1;
    return {
      success: true,
      transcript: [{ text: "asr", start: 0, duration: 1 }],
      transcriptText: "asr",
      transcriptTextTimestamped: "[0:00] asr",
      language: "zh",
    };
  };
  context.fetch = async (url, options = {}) => {
    url = String(url);
    if (url.includes("/x/web-interface/view")) return jsonResponse(VIEW);
    return route(url, options);
  };
  const result = await context.__test.handle(
    "BV1234567890",
    "https://www.bilibili.com/video/BV1234567890",
  );
  console.log(`[test] ${name} -> ${result.sourceType || result.error} (ASR calls=${asrCalls})`);
  return { result, asrCalls };
}

(async () => {
  const manual = await runScenario(
    "manual subtitle",
    (url) => {
      if (url.includes("/x/player/wbi/v2")) {
        return jsonResponse({
          code: 0,
          data: {
            bvid: "BV1234567890",
            cid: 88,
            subtitle: {
              subtitles: [{
                lan: "zh-CN",
                lan_doc: "中文",
                subtitle_url: "https://sub/manual",
                type: 0,
              }],
            },
          },
        });
      }
      if (url === "https://sub/manual") return jsonResponse(BODY);
      throw new Error("unexpected URL " + url);
    },
    "configured-but-must-not-run",
  );
  assert.equal(manual.result.sourceType, "manual");
  assert.equal(manual.asrCalls, 0);

  const webAi = await runScenario(
    "legacy empty -> web AI subtitle",
    (url) => {
      if (url.includes("/x/player/wbi/v2")) {
        return jsonResponse({
          code: 0,
          data: { bvid: "BV1234567890", cid: 88, subtitle: { subtitles: [] } },
        });
      }
      if (url.includes("/x/v2/subtitle/web/view")) {
        return binaryResponse(webProto([aiTrack]));
      }
      if (url === "https://ai.json" || url === "https://sub/ai") {
        return jsonResponse(BODY);
      }
      throw new Error("unexpected URL " + url);
    },
    "configured-but-must-not-run",
  );
  assert.equal(webAi.result.sourceType, "bilibili-ai");
  assert.equal(webAi.result.provider, "bilibili-web-subtitle");
  assert.equal(webAi.asrCalls, 0);

  const asr = await runScenario(
    "both Bilibili providers empty -> ASR",
    (url) => {
      if (url.includes("/x/player/wbi/v2")) {
        return jsonResponse({
          code: 0,
          data: { bvid: "BV1234567890", cid: 88, subtitle: { subtitles: [] } },
        });
      }
      if (url.includes("/x/v2/subtitle/web/view")) {
        return binaryResponse(webProto([]));
      }
      throw new Error("unexpected URL " + url);
    },
    "configured",
  );
  assert.equal(asr.result.sourceType, "asr");
  assert.equal(asr.asrCalls, 1);

  const noAsr = await runScenario(
    "both empty + ASR not configured",
    (url) => {
      if (url.includes("/x/player/wbi/v2")) {
        return jsonResponse({
          code: 0,
          data: { bvid: "BV1234567890", cid: 88, subtitle: { subtitles: [] } },
        });
      }
      if (url.includes("/x/v2/subtitle/web/view")) {
        return binaryResponse(webProto([]));
      }
      throw new Error("unexpected URL " + url);
    },
  );
  assert.equal(noAsr.result.error, "NO_TRANSCRIPT");
  assert.equal(noAsr.asrCalls, 0);

  const auth = await runScenario(
    "web subtitle auth error does not trigger ASR",
    (url) => {
      if (url.includes("/x/player/wbi/v2")) {
        return jsonResponse({
          code: 0,
          data: { bvid: "BV1234567890", cid: 88, subtitle: { subtitles: [] } },
        });
      }
      if (url.includes("/x/v2/subtitle/web/view")) {
        return binaryResponse(Buffer.alloc(0), 403);
      }
      throw new Error("unexpected URL " + url);
    },
    "configured",
  );
  assert.equal(auth.result.error, "SUBTITLE_AUTH_REQUIRED");
  assert.equal(auth.asrCalls, 0);

  console.log("[ok] subtitle provider deterministic tests passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
