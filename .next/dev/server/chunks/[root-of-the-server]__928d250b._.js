module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/fs/promises [external] (fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs/promises", () => require("fs/promises"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[project]/lib/logs.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildLogsResponse",
    ()=>buildLogsResponse,
    "collectSessionFiles",
    ()=>collectSessionFiles,
    "getCodexRoot",
    ()=>getCodexRoot,
    "parseHistoryFile",
    ()=>parseHistoryFile,
    "parseSessionFile",
    ()=>parseSessionFile,
    "readJsonl",
    ()=>readJsonl
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs/promises [external] (fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$os__$5b$external$5d$__$28$os$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/os [external] (os, cjs)");
;
;
;
const MAX_SESSION_LINES = 2000;
const MAX_HISTORY_LINES = 400;
const ROLE_SET = new Set([
    'user',
    'assistant',
    'developer',
    'system',
    'tool'
]);
const isObject = (value)=>typeof value === 'object' && value !== null;
const toNumberTimestamp = (value)=>{
    if (typeof value === 'number' && Number.isFinite(value)) {
        return value < 1e12 ? value * 1000 : value;
    }
    if (typeof value === 'string') {
        const parsed = Date.parse(value);
        if (!Number.isNaN(parsed)) return parsed;
    }
    return null;
};
const extractTimestamp = (data)=>{
    const candidates = [
        data.ts,
        data.timestamp,
        data.time,
        data.created_at,
        data.createdAt
    ];
    for (const candidate of candidates){
        const parsed = toNumberTimestamp(candidate);
        if (parsed) return parsed;
    }
    return null;
};
const extractRole = (data)=>{
    const raw = data.role ?? data.author ?? data.actor;
    if (typeof raw === 'string' && ROLE_SET.has(raw)) {
        return raw;
    }
    return null;
};
const extractTextFromContent = (content)=>{
    if (typeof content === 'string') return content;
    if (!content) return null;
    if (Array.isArray(content)) {
        const parts = content.map((part)=>{
            if (typeof part === 'string') return part;
            if (isObject(part)) {
                const text = part.text ?? part.value ?? part.content;
                return typeof text === 'string' ? text : null;
            }
            return null;
        }).filter(Boolean);
        return parts.length ? parts.join('\n') : null;
    }
    if (isObject(content)) {
        const text = content.text ?? content.value ?? content.content;
        if (typeof text === 'string') return text;
    }
    return null;
};
const extractText = (data)=>{
    const direct = data.text ?? data.message ?? data.prompt;
    if (typeof direct === 'string') return direct;
    const content = data.content ?? data.output ?? data.response;
    return extractTextFromContent(content);
};
const extractSessionMeta = (data)=>{
    const type = data.type ?? data.event ?? data.object;
    if (type !== 'session_meta') return null;
    const id = typeof data.id === 'string' && data.id || typeof data.session_id === 'string' && data.session_id || typeof data.sessionId === 'string' && data.sessionId || null;
    const parentId = typeof data.parent_id === 'string' && data.parent_id || typeof data.parent_session_id === 'string' && data.parent_session_id || typeof data.parentId === 'string' && data.parentId || null;
    return {
        id,
        parentId
    };
};
const extractLogFields = (data)=>{
    const role = extractRole(data);
    const text = extractText(data);
    if (role && text) {
        return {
            role,
            text,
            ts: extractTimestamp(data)
        };
    }
    const nested = [
        data.message,
        data.item,
        data.output,
        data.response
    ];
    for (const entry of nested){
        if (Array.isArray(entry)) {
            for (const child of entry){
                if (isObject(child)) {
                    const result = extractLogFields(child);
                    if (result) return result;
                }
            }
        } else if (isObject(entry)) {
            const result = extractLogFields(entry);
            if (result) return result;
        }
    }
    return null;
};
const safeParse = (line)=>{
    try {
        const parsed = JSON.parse(line);
        if (isObject(parsed)) return parsed;
    } catch  {
        return null;
    }
    return null;
};
const getFileMtimeMs = async (filePath)=>{
    try {
        const stat = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].stat(filePath);
        return stat.mtimeMs;
    } catch  {
        return null;
    }
};
const getCodexRoot = ()=>__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(__TURBOPACK__imported__module__$5b$externals$5d2f$os__$5b$external$5d$__$28$os$2c$__cjs$29$__["default"].homedir(), '.codex');
const collectSessionFiles = async (root)=>{
    const sessionRoot = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(root, 'sessions');
    const results = [];
    const walk = async (dir)=>{
        let entries;
        try {
            entries = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].readdir(dir, {
                withFileTypes: true
            });
        } catch  {
            return;
        }
        await Promise.all(entries.map(async (entry)=>{
            const fullPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(dir, entry.name);
            if (entry.isDirectory()) {
                await walk(fullPath);
                return;
            }
            if (entry.isFile() && fullPath.endsWith('.jsonl')) {
                results.push(fullPath);
            }
        }));
    };
    await walk(sessionRoot);
    return results;
};
const readJsonl = async (filePath, maxLines)=>{
    try {
        const content = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].readFile(filePath, 'utf8');
        const lines = content.split(/\r?\n/).filter(Boolean);
        if (maxLines && lines.length > maxLines) {
            return lines.slice(-maxLines);
        }
        return lines;
    } catch  {
        return [];
    }
};
const parseSessionFile = async (filePath)=>{
    const lines = await readJsonl(filePath, MAX_SESSION_LINES);
    const fileMtimeMs = await getFileMtimeMs(filePath);
    const fallbackBaseTs = fileMtimeMs ?? Date.now();
    let sessionId = null;
    let parentId = null;
    let lastUserText;
    let lastTs;
    const logs = [];
    const totalLines = lines.length;
    lines.forEach((line, index)=>{
        const data = safeParse(line);
        if (!data) return;
        const meta = extractSessionMeta(data);
        if (meta) {
            if (meta.id) sessionId = meta.id;
            if (meta.parentId) parentId = meta.parentId;
        }
        const logFields = extractLogFields(data);
        if (logFields) {
            const ts = logFields.ts ?? Math.max(0, fallbackBaseTs - (totalLines - index));
            const item = {
                id: `${sessionId ?? 'session'}-${index}-${ts}`,
                ts,
                iso: new Date(ts).toISOString(),
                source: 'session',
                sessionId: sessionId ?? undefined,
                role: logFields.role,
                text: logFields.text
            };
            logs.push(item);
            if (logFields.role === 'user') {
                lastUserText = logFields.text;
            }
            if (!lastTs || ts > lastTs) {
                lastTs = ts;
            }
        }
    });
    if (!sessionId) {
        sessionId = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].basename(filePath, __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].extname(filePath));
    }
    if (!lastTs && fileMtimeMs) {
        lastTs = fileMtimeMs;
    }
    const session = sessionId ? {
        id: sessionId,
        kind: parentId ? 'subagent' : 'main',
        parentId: parentId ?? undefined,
        lastUserText,
        lastTs
    } : null;
    return {
        session,
        logs
    };
};
const parseHistoryFile = async (filePath, maxLines)=>{
    const lines = await readJsonl(filePath, maxLines);
    const fileMtimeMs = await getFileMtimeMs(filePath);
    const fallbackBaseTs = fileMtimeMs ?? Date.now();
    const totalLines = lines.length;
    const logs = [];
    lines.forEach((line, index)=>{
        const data = safeParse(line);
        if (!data) return;
        const logFields = extractLogFields(data);
        if (!logFields) return;
        const ts = logFields.ts ?? Math.max(0, fallbackBaseTs - (totalLines - index));
        logs.push({
            id: `history-${index}-${ts}`,
            ts,
            iso: new Date(ts).toISOString(),
            source: 'history',
            role: logFields.role,
            text: logFields.text
        });
    });
    return logs;
};
const buildLogsResponse = async (maxItems = 50, maxPigs = 30)=>{
    const root = getCodexRoot();
    const historyPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(root, 'history.jsonl');
    const sessionFilesPromise = collectSessionFiles(root);
    const historyPromise = parseHistoryFile(historyPath, MAX_HISTORY_LINES);
    const sessionFiles = await sessionFilesPromise;
    const sessionResults = await Promise.all(sessionFiles.map((filePath)=>parseSessionFile(filePath)));
    const sessions = sessionResults.map((result)=>result.session).filter(Boolean);
    sessions.sort((a, b)=>(b.lastTs ?? 0) - (a.lastTs ?? 0));
    const sessionLogs = sessionResults.flatMap((result)=>result.logs);
    const historyLogs = await historyPromise;
    const items = [
        ...sessionLogs,
        ...historyLogs
    ].sort((a, b)=>b.ts - a.ts).slice(0, maxItems);
    return {
        updatedAt: new Date().toISOString(),
        items,
        sessions: sessions.slice(0, maxPigs)
    };
};
}),
"[project]/app/api/logs/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "dynamic",
    ()=>dynamic,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$28$2e$6_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.28.6_babel-plugin-react-compiler@1.0.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logs$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/logs.ts [app-route] (ecmascript)");
;
;
const dynamic = 'force-dynamic';
const runtime = 'nodejs';
async function GET() {
    try {
        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logs$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildLogsResponse"])();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$28$2e$6_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(data, {
            headers: {
                'Cache-Control': 'no-store'
            }
        });
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$28$2e$6_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            updatedAt: new Date().toISOString(),
            items: [],
            sessions: []
        }, {
            headers: {
                'Cache-Control': 'no-store'
            }
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__928d250b._.js.map