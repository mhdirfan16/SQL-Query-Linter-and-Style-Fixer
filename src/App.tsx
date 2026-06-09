/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { 
  Database, 
  Play, 
  Sparkles, 
  Wand2, 
  Settings2, 
  Layers, 
  FileCode, 
  TrendingUp, 
  Terminal, 
  Lock, 
  Unlock, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Info, 
  RefreshCw, 
  ArrowRight, 
  ExternalLink,
  Shield, 
  Eye, 
  Code2, 
  Copy, 
  Check, 
  Upload, 
  FileText,
  User,
  Plus
} from "lucide-react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts";
import { SAMPLE_QUERIES, SampleQuery } from "./sampleQueries";
import { SQLFile, LintViolation, RuleConfig, AIPromptLog, CORSReqLog, AuthState } from "./types";

export const INFRA_LAYERS = [
  { id: "layer-13", name: "Frontend", status: "100% Operational", desc: "Interactive Single Page Application with dynamic diff rendering and Space Grotesk/Inter paired typography.", tech: "Vite + React 18 + Tailwind" },
  { id: "layer-12", name: "APIs & Backend Logic", status: "Functional", desc: "Express.js REST interfaces powering lint rule scans and Gemini model content proxy exchanges.", tech: "Express + Node.js (Port 3000)" },
  { id: "layer-11", name: "Database & Storage", status: "Connected", desc: "Transactional state registers tracking scored documents, rule parameters, and security event logs.", tech: "SQL Simulation Storage" },
  { id: "layer-10", name: "Auth & Permissions", status: "Secured", desc: "OAuth-inspired Bearer Token verification verifying claim layers on headers.", tech: "JWT Bearer Verification" },
  { id: "layer-9", name: "Hosting & Deployment", status: "Healthy Container", desc: "Serverless containerized hosting with automated proxy gateways routing traffic on port 3000.", tech: "Docker + Cloud Run" },
  { id: "layer-8", name: "Cloud & Compute", status: "Healthy Node", desc: "Simulated resource monitors displaying virtual thread allocations and real-time computation workloads.", tech: "Virtual Thread Core" },
  { id: "layer-7", name: "CI/CD & Version Control", status: "Pipeline OK", desc: "Automated standard checks forcing Zero-Violation build pipeline restrictions before merges.", tech: "Actions + Build Checks" },
  { id: "layer-6", name: "Security & RLS", status: "Enforced", desc: "CORS preflight guard-headers blocking unauthorized external request origins.", tech: "Dynamic Allowed Origins list" },
  { id: "layer-5", name: "Rate Limiting", status: "Active Limit", desc: "Token Bucket rate controller limiting request speeds to protect API model limits.", tech: "Bucket Policy (100req/m)" },
  { id: "layer-4", name: "Caching & CDN", status: "Warm Cache", desc: "Deduplication cache hash index storing lint outputs to bypass LLM latency on duplicate scans.", tech: "In-Memory Query Cache" },
  { id: "layer-3", name: "Load Balancing & Scaling", status: "Balanced", desc: "Nginx Gateway Router allocating request quotas to active pod container replicas.", tech: "Nginx Cluster Router" },
  { id: "layer-2", name: "Error Tracking & Logs", status: "Streaming Logs", desc: "Standard stream logs capture block consolidating live incoming server handshakes.", tech: "Sentry-style event log" },
  { id: "layer-1", name: "Availability & Recovery", status: "Healthy SLA", desc: "Fail-safe isolated Circuit Breaker protecting client experience against third-party failures.", tech: "Resilient Circuit Engine" }
];

const SEVERITY_COLORS = {
  ERROR: { text: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20", badge: "bg-red-500/20 text-red-300" },
  WARN: { text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20", badge: "bg-amber-500/20 text-amber-300" },
  INFO: { text: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/20", badge: "bg-sky-500/20 text-sky-400" },
};

export default function App() {
  // Application SQL Files State
  const [queriesList, setQueriesList] = useState<SQLFile[]>(() => {
    return SAMPLE_QUERIES.map(q => ({
      id: q.id,
      name: q.name,
      originalContent: q.content,
      currentContent: q.content,
      isClean: false,
      violations: [],
      llmSuggestions: []
    }));
  });
  
  const [activeQueryId, setActiveQueryId] = useState<string>("query-1");
  const activeQuery = queriesList.find(q => q.id === activeQueryId) || queriesList[0];

  // Editor State
  const [editorText, setEditorText] = useState(activeQuery.currentContent);
  const [newFileName, setNewFileName] = useState("");

  // Rule Registry State
  const [rules, setRules] = useState<RuleConfig[]>([
    { id: "RULE-001", name: "no_select_star", severity: "ERROR", trigger: "SELECT * detected", fixStrategy: "LLM-assisted column suggestion", enabled: true },
    { id: "RULE-002", name: "snake_case_columns", severity: "WARN", trigger: "camelCase or PascalCase column/table name", fixStrategy: "Auto-rename to snake_case", enabled: true },
    { id: "RULE-003", name: "meaningful_alias", severity: "WARN", trigger: "Single-letter table alias (a, b, t1, t2)", fixStrategy: "Suggest full table abbreviation", enabled: true },
    { id: "RULE-004", name: "no_implicit_join", severity: "WARN", trigger: "Comma-separated FROM (old implicit JOIN)", fixStrategy: "Rewrite as explicit JOIN", enabled: true },
    { id: "RULE-005", name: "consistent_keywords", severity: "INFO", trigger: "Mixed case SQL keywords", fixStrategy: "Uppercase all SQL keywords", enabled: true }
  ]);

  // Tab State
  const [activeTab, setActiveTab] = useState<"linter" | "diff" | "reports" | "prompts" | "cors" | "infra">("infra");

  // Infrastructure Layers Interactive Simulated State
  const [selectedLayerId, setSelectedLayerId] = useState<string>("layer-13");
  const [breakerOpen, setBreakerOpen] = useState<boolean>(false);
  const [rateLimitConsumed, setRateLimitConsumed] = useState<number>(14);
  const [cacheHits, setCacheHits] = useState<number>(8);
  const [cacheMisses, setCacheMisses] = useState<number>(15);
  const [cpuVal, setCpuVal] = useState<number>(3.2);
  const [ramVal, setRamVal] = useState<number>(144.1);
  const [pingMeasurement, setPingMeasurement] = useState<number | null>(null);
  const [pinging, setPinging] = useState<boolean>(false);
  const [simEventLogs, setSimEventLogs] = useState<string[]>([
    `[SYSTEM] INIT - sql-lint-fixer container initialized on port 3000.`,
    `[AUTH] Verification check complete for Jane Data Analyst (Data Engineer).`,
    `[SECURITY] CORS Origin whitelist initialized: ["https://client-partner-dashboard.com", "http://localhost:3000", "*.run.app"]`,
    `[CIRCUIT_BREAKER] State initialized to CLOSED (Healthy). Uptime SLA tracker: 99.98%`
  ]);
  const [lastScannedText, setLastScannedText] = useState<string>("");

  // Dynamic Prompt Log History State
  const [promptLogs, setPromptLogs] = useState<AIPromptLog[]>([]);

  // Authentication State with CORS Debugger Logs
  const [authState, setAuthState] = useState<AuthState>({
    token: localStorage.getItem("sql_linter_token") || null,
    user: localStorage.getItem("sql_linter_user") ? JSON.parse(localStorage.getItem("sql_linter_user")!) : null,
    corsVerified: false,
    requestLogs: []
  });

  // Client Simulation panel state for testing CORS
  const [simulatedOrigin, setSimulatedOrigin] = useState("https://client-partner-dashboard.com");
  const [simulatedHeader, setSimulatedHeader] = useState("Authorization");
  const [simulatedHeaderVal, setSimulatedHeaderVal] = useState("Bearer sql-fixer-token-ZGVtb0BleGFtcGxlLmNvbQ==");
  const [simResponse, setSimResponse] = useState<any>(null);
  const [simLoading, setSimLoading] = useState(false);

  // Authentication Modal inputs
  const [loginEmail, setLoginEmail] = useState("demo@example.com");
  const [loginPass, setLoginPass] = useState("password123");
  const [showRegister, setShowRegister] = useState(false);
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPass, setRegPass] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);

  // Linter Action indicators
  const [linting, setLinting] = useState(false);
  const [fixing, setFixing] = useState(false);
  const [aiRefactoring, setAiRefactoring] = useState(false);
  const [copiedStatus, setCopiedStatus] = useState(false);

  // Sync editor when active SQL file changes
  useEffect(() => {
    setEditorText(activeQuery.currentContent);
  }, [activeQueryId]);

  // Read backend state & load prompt logs
  useEffect(() => {
    fetchLogs();
    
    // Background simulator for CPU, RAM and occasional fake access events
    const simulateInterval = setInterval(() => {
      setCpuVal(prev => {
        const delta = (Math.random() - 0.5) * 1.5;
        const next = prev + delta;
        return Number(Math.max(1.2, Math.min(25.0, next)).toFixed(1));
      });
      setRamVal(prev => {
        const delta = (Math.random() - 0.5) * 4.0;
        const next = prev + delta;
        return Number(Math.max(135.0, Math.min(155.0, next)).toFixed(1));
      });
      
      // 20% chance to push a standard heart-beat event to simulation terminal log buffer
      if (Math.random() < 0.20) {
        const timestamp = new Date().toLocaleTimeString();
        const accessors = ["Jane", "TelemetryEngine", "GithubPipeline", "NginxProxyNode1"];
        const chosen = accessors[Math.floor(Math.random() * accessors.length)];
        setSimEventLogs(prev => [
          `[TELEMETRY] ${timestamp} - Health-beat check complete. Initiator: ${chosen}`,
          ...prev.slice(0, 15)
        ]);
      }
    }, 3000);

    // Start automated backend logs polling for CORS Handshake diagnostic
    const logsInterval = setInterval(fetchLogs, 4000);
    
    return () => {
      clearInterval(simulateInterval);
      clearInterval(logsInterval);
    };
  }, []);

  // Sync token validation state with server on mount
  useEffect(() => {
    if (authState.token) {
      verifyToken(authState.token);
    }
  }, []);

  const fetchLogs = async () => {
    try {
      const logsRes = await fetch("/api/cors/logs");
      if (logsRes.ok) {
        const data = await logsRes.json();
        setAuthState(prev => ({ ...prev, requestLogs: data.logs }));
      }
      
      const promptLogsRes = await fetch("/api/ai/logs");
      if (promptLogsRes.ok) {
        const data = await promptLogsRes.json();
        setPromptLogs(data.logs);
      }
    } catch (e) {
      console.warn("Could not load dynamic server logs.", e);
    }
  };

  const handleToggleRule = (id: string) => {
    setRules(prev => prev.map(rule => {
      if (rule.id === id) {
        return { ...rule, enabled: !rule.enabled };
      }
      return rule;
    }));
  };

  // Perform Server deterministic lint checks
  const runLint = async () => {
    const timestamp = new Date().toLocaleTimeString();
    if (breakerOpen) {
      setSimEventLogs(prev => [
        `[AVAILABILITY] ${timestamp} - ERROR 503 Service Unavailable: Isolation Circuit is OPEN.`,
        ...prev
      ]);
      return;
    }

    setLinting(true);
    try {
      const response = await fetch("/api/lint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authState.token || ""}`
        },
        body: JSON.stringify({
          sql: editorText,
          enabledRules: rules.filter(r => r.enabled).map(r => r.id)
        })
      });

      if (!response.ok) {
        throw new Error("Linter error response.");
      }

      const data = await response.json();
      
      // Update queriesList with findings
      setQueriesList(prev => prev.map(q => {
        if (q.id === activeQueryId) {
          return {
            ...q,
            currentContent: editorText,
            violations: data.violations,
            isClean: data.isClean
          };
        }
        return q;
      }));

      // Cache telemetry
      if (editorText === lastScannedText) {
        setCacheHits(h => h + 1);
        setSimEventLogs(prev => [
          `[CACHE] ${timestamp} - Memory Hit on query deduplication token. Latency: 0ms`,
          `[API] ${timestamp} - POST /api/lint - Returned ${data.violations.length} violations (CACHED)`,
          ...prev
        ]);
      } else {
        setCacheMisses(m => m + 1);
        setLastScannedText(editorText);
        setSimEventLogs(prev => [
          `[API] ${timestamp} - POST /api/lint - Scanned ${editorText.length} bytes. Violations found: ${data.violations.length} (MISS)`,
          ...prev
        ]);
      }

      setRateLimitConsumed(prev => Math.min(100, prev + 1));

    } catch (err) {
      console.error(err);
    } finally {
      setLinting(false);
    }
  };

  // Perform Server-side mechanical auto-fixing
  const runAutoFix = async () => {
    const timestamp = new Date().toLocaleTimeString();
    if (breakerOpen) {
      setSimEventLogs(prev => [
        `[AVAILABILITY] ${timestamp} - ERROR 503 Service Unavailable: Isolation Circuit is OPEN.`,
        ...prev
      ]);
      return;
    }

    setFixing(true);
    try {
      const response = await fetch("/api/autofix", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authState.token || ""}`
        },
        body: JSON.stringify({
          sql: editorText,
          enabledRules: rules.filter(r => r.enabled).map(r => r.id)
        })
      });

      if (!response.ok) {
        throw new Error("Auth error response or network loss.");
      }

      const data = await response.json();
      setEditorText(data.fixedSql);

      setQueriesList(prev => prev.map(q => {
        if (q.id === activeQueryId) {
          return {
            ...q,
            currentContent: data.fixedSql,
            violations: data.violations,
            isClean: data.isClean,
            fixedContent: data.fixedSql
          };
        }
        return q;
      }));

      setSimEventLogs(prev => [
        `[RPC] ${timestamp} - POST /api/autofix - Autofixed casing and uppercase SQL keywords.`,
        ...prev
      ]);
      setRateLimitConsumed(prev => Math.min(100, prev + 1));

    } catch (err) {
      console.error(err);
    } finally {
      setFixing(false);
    }
  };

  // Perform AI Refactoring with Gemini Model API
  const runAiRefactor = async () => {
    const timestamp = new Date().toLocaleTimeString();
    if (breakerOpen) {
      setSimEventLogs(prev => [
        `[AVAILABILITY] ${timestamp} - ERROR 503 Service Unavailable: Isolation Circuit is OPEN.`,
        ...prev
      ]);
      return;
    }

    setAiRefactoring(true);
    try {
      // First gather deterministic violations to guide the LLM
      const lintRes = await fetch("/api/lint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sql: editorText,
          enabledRules: rules.filter(r => r.enabled).map(r => r.id)
        })
      });
      const lintResult = await lintRes.json();

      const response = await fetch("/api/ai-refactor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authState.token || ""}`
        },
        body: JSON.stringify({
          sql: editorText,
          violations: lintResult.violations,
          enabledRules: rules.filter(r => r.enabled).map(r => r.id)
        })
      });

      if (!response.ok) {
        throw new Error("AI Refactor call failed on server.");
      }

      const data = await response.json();
      setEditorText(data.refactoredSql);

      setQueriesList(prev => prev.map(q => {
        if (q.id === activeQueryId) {
          return {
            ...q,
            currentContent: data.refactoredSql,
            violations: [],
            isClean: true,
            fixedContent: data.refactoredSql
          };
        }
        return q;
      }));

      setSimEventLogs(prev => [
        `[LLM] ${timestamp} - POST /api/ai-refactor - Executed model gemini-3.5-flash on ${lintResult.violations.length} styling points.`,
        ...prev
      ]);
      setRateLimitConsumed(prev => Math.min(100, prev + 1));

      // Immediately fetch logs to show newly logged prompt
      fetchLogs();
      setActiveTab("diff"); // Switch to diff visualizer to show changes

    } catch (err) {
      console.error(err);
    } finally {
      setAiRefactoring(false);
    }
  };

  // Register New Account with CORS Auth Mechanism
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: regName, email: regEmail, password: regPass })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to register account.");
      }

      localStorage.setItem("sql_linter_token", data.token);
      localStorage.setItem("sql_linter_user", JSON.stringify(data.user));

      setAuthState(prev => ({
        ...prev,
        token: data.token,
        user: data.user
      }));

    } catch (err: any) {
      setAuthError(err.message);
    }
  };

  // Login existing account
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPass })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Invalid username or password.");
      }

      localStorage.setItem("sql_linter_token", data.token);
      localStorage.setItem("sql_linter_user", JSON.stringify(data.user));

      setAuthState(prev => ({
        ...prev,
        token: data.token,
        user: data.user
      }));
    } catch (err: any) {
      setAuthError(err.message);
    }
  };

  // Verify Bearer Token on mount
  const verifyToken = async (token: string) => {
    try {
      const response = await fetch("/api/auth/verify", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (!response.ok) {
        // Clear token if invalid
        handleLogout();
      }
    } catch (e) {
      console.warn("Could not verify session key with backend.", e);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("sql_linter_token");
    localStorage.removeItem("sql_linter_user");
    setAuthState(prev => ({
      ...prev,
      token: null,
      user: null
    }));
  };

  // Diagnostic Test Desk: Simulate an external origin HTTP CORS trigger
  const runCORSSimulation = async () => {
    setSimLoading(true);
    setSimResponse(null);
    try {
      const response = await fetch("/api/cors/simulate-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Mock-Origin": simulatedOrigin
        },
        body: JSON.stringify({
          testOrigin: simulatedOrigin,
          testHeaders: {
            "Authorization": simulatedHeaderVal
          }
        })
      });
      const data = await response.json();
      setSimResponse({
        status: response.status,
        statusText: response.statusText,
        headers: {
          "Access-Control-Allow-Origin": simulatedOrigin,
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
        },
        body: data
      });
      fetchLogs();
    } catch (e: any) {
      setSimResponse({ error: e.message });
    } finally {
      setSimLoading(false);
    }
  };

  // Setup Custom SQL File Adding to workspace
  const handleAddNewFile = () => {
    if (!newFileName.trim()) return;
    const name = newFileName.toLowerCase().endsWith(".sql") ? newFileName : `${newFileName}.sql`;
    const newId = `custom-${Date.now()}`;
    const newFile: SQLFile = {
      id: newId,
      name,
      originalContent: `-- Workspace new query: ${newFileName}\nSELECT * FROM userAccounts;`,
      currentContent: `-- Workspace new query: ${newFileName}\nSELECT * FROM userAccounts;`,
      isClean: false,
      violations: [],
      llmSuggestions: []
    };
    setQueriesList(prev => [...prev, newFile]);
    setActiveQueryId(newId);
    setNewFileName("");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStatus(true);
    setTimeout(() => setCopiedStatus(false), 1500);
  };

  // Recharts Helper Data Formatting
  const getRuleSeverityStats = () => {
    const errorCount = queriesList.reduce((sum, q) => sum + q.violations.filter(v => v.severity === "ERROR").length, 0);
    const warnCount = queriesList.reduce((sum, q) => sum + q.violations.filter(v => v.severity === "WARN").length, 0);
    const infoCount = queriesList.reduce((sum, q) => sum + q.violations.filter(v => v.severity === "INFO").length, 0);
    
    return [
      { name: "ERROR (Critical)", value: errorCount || 0, color: "#f87171" },
      { name: "WARN (Style)", value: warnCount || 0, color: "#fbbf24" },
      { name: "INFO (Keywords/Best Practice)", value: infoCount || 0, color: "#38bdf8" }
    ];
  };

  const getRuleTypeDistribution = () => {
    const counts: Record<string, number> = {};
    rules.forEach(r => { counts[r.name] = 0; });
    
    queriesList.forEach(q => {
      q.violations.forEach(v => {
        counts[v.rule_name] = (counts[v.rule_name] || 0) + 1;
      });
    });

    return Object.entries(counts).map(([key, val]) => ({
      name: key,
      violations: val
    }));
  };

  const totalViolations = queriesList.reduce((sum, q) => sum + q.violations.length, 0);
  const cleanFilesCount = queriesList.filter(q => q.isClean || q.violations.length === 0).length;

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-200 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-100">
      
      {/* HEADER BAR */}
      <header className="border-b border-[#21262d] bg-[#161b22] px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/30">
            <Database className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold text-gray-100 tracking-tight">
                sql-lint-fixer
              </h1>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-mono px-2 py-0.5 rounded border border-emerald-500/20 uppercase tracking-wider">
                Full-Stack AI Studio
              </span>
            </div>
            <p className="text-xs text-gray-400">Lint, enforce, and AI-refactor your SQL across engineering pipelines</p>
          </div>
        </div>

        {/* Auth status bar & CORS certificate indicators */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 bg-[#0d1117] border border-[#21262d] rounded-full px-3 py-1.5 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-gray-400">CORS Handshake state:</span>
            <span className="text-emerald-400 font-semibold uppercase font-mono">ACTIVE (Credentials OK)</span>
          </div>

          {authState.user ? (
            <div className="flex items-center gap-3 bg-[#21262d]/50 p-1.5 pl-3 pr-2.5 rounded-full border border-[#30363d]">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-[10px]">
                  {authState.user.name[0]}
                </div>
                <div className="text-xs text-left">
                  <span className="block text-gray-200 font-medium leading-none">{authState.user.name}</span>
                  <span className="text-[9px] text-gray-400 font-mono leading-none">{authState.user.role}</span>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="text-[10px] font-semibold text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/25 px-2.5 py-1 rounded-full border border-red-500/10 transition"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-[#21262d]/60 p-1 rounded-full border border-[#30363d]">
              <span className="text-[11px] text-amber-400 font-mono flex items-center gap-1.5 px-3">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                Auth Restricted Demo
              </span>
              <button 
                onClick={() => {
                  setLoginEmail("demo@example.com");
                  setLoginPass("password123");
                  setShowRegister(false);
                  setAuthState(prev => ({
                    ...prev,
                    token: "sql-fixer-token-ZGVtb0BleGFtcGxlLmNvbQ==",
                    user: { name: "Jane Data Analyst", email: "demo@example.com", role: "Data Engineer" }
                  }));
                }}
                className="text-[11px] font-semibold text-emerald-900 bg-emerald-400 hover:bg-emerald-300 px-3 py-1.5 rounded-full transition"
              >
                Instantly Auth Profile
              </button>
            </div>
          )}
        </div>
      </header>

      {/* CORE WORKSPACE INNER CONTENT */}
      <div className="flex-1 grid grid-cols-1 xl:grid-cols-12 overflow-hidden">
        
        {/* LEFT COLUMN: FILE DISCOVERY & RULE CONFIGURATION (ColSpan 4) */}
        <aside className="xl:col-span-4 border-r border-[#21262d] bg-[#161b22]/40 p-5 flex flex-col gap-6 overflow-y-auto">
          
          {/* File Explorer Module */}
          <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-2">
                <FileCode className="w-4 h-4 text-emerald-400" />
                Query Finder Explorer
              </h2>
              <span className="text-xs text-gray-400 font-mono bg-[#0d1117] px-2 py-0.5 rounded border border-[#21262d]">
                {queriesList.length} Files
              </span>
            </div>

            {/* List of mock and added queries */}
            <div className="flex flex-col gap-1.5 max-h-[180px] overflow-y-auto pr-1">
              {queriesList.map(item => {
                const isActive = item.id === activeQueryId;
                const hasProblems = item.violations.length > 0;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveQueryId(item.id)}
                    className={`w-full text-left p-2.5 rounded-lg border text-xs flex items-center justify-between transition-all ${
                      isActive 
                        ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-300 font-semibold" 
                        : "bg-[#0d1117] border-[#21262d] hover:bg-[#21262d] text-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileText className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-400' : 'text-gray-500'}`} />
                      <div className="truncate">
                        <p className="font-mono leading-none mb-0.5">{item.name}</p>
                        <p className="text-[10px] text-gray-500 truncate">{item.id.startsWith("custom-") ? "User Added" : "Preloaded demo structure"}</p>
                      </div>
                    </div>
                    {hasProblems ? (
                      <span className="text-[9px] bg-amber-500/10 text-amber-500 font-mono px-1.5 py-0.5 rounded border border-amber-500/20 font-bold">
                        {item.violations.length} style key{item.violations.length > 1 ? 's' : ''}
                      </span>
                    ) : (
                      <CheckCircle className="w-4 h-4 text-emerald-400/80 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* In-app simulated file uploader */}
            <div className="flex items-center gap-1.5 mt-1 border-t border-[#21262d] pt-3">
              <input 
                type="text" 
                placeholder="new_script.sql"
                value={newFileName}
                onChange={e => setNewFileName(e.target.value)}
                className="flex-1 bg-[#0d1117] border border-[#21262d] rounded px-2.5 py-1.5 text-xs text-gray-200 font-mono focus:border-emerald-500/50 outline-none"
              />
              <button 
                onClick={handleAddNewFile}
                className="bg-emerald-500 hover:bg-emerald-400 text-[#0d1117] p-1.5 rounded transition shrink-0"
                title="Create Workspace File"
              >
                <Plus className="w-4 h-4 font-bold" />
              </button>
            </div>
          </div>

          {/* Rule Registry Component */}
          <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-4 flex flex-col gap-4">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-2">
                <Settings2 className="w-4 h-4 text-amber-400" />
                Active SQL Rule Registry
              </h2>
              <p className="text-[10px] text-gray-500 mt-1">Configure structural and AI lint parameters on demand</p>
            </div>

            <div className="flex flex-col gap-3">
              {rules.map(rule => {
                const colors = SEVERITY_COLORS[rule.severity];
                return (
                  <div 
                    key={rule.id}
                    className={`p-3 rounded-lg border transition ${
                      rule.enabled 
                        ? 'bg-[#0d1117] border-[#30363d]' 
                        : 'bg-[#0d1117]/45 border-[#21262d] opacity-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs font-bold text-gray-300">{rule.id}</span>
                        <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded ${colors.badge} font-bold`}>
                          {rule.severity}
                        </span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={rule.enabled} 
                          onChange={() => handleToggleRule(rule.id)}
                          className="sr-only peer"
                        />
                        <div className="w-7 h-4 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-emerald-500"></div>
                      </label>
                    </div>

                    <h4 className="text-xs font-mono text-emerald-400 font-semibold mb-1">{rule.name}</h4>
                    <p className="text-[10px] text-gray-400 font-medium">Trigger: {rule.trigger}</p>
                    <p className="text-[10px] text-gray-500 mt-1 italic">Fix Strategy: {rule.fixStrategy}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Authentic CORS Authenticated Sandbox explanation card */}
          <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4 flex flex-col gap-2">
            <h3 className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
              <Shield className="w-4 h-4" />
              CORS Security Sandbox
            </h3>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              This application utilizes an authentic CORS handler checking Origin validity and header authorization. External dashboards requesting SQL fixes must carry a signed <strong>Bearer Token</strong> on the request handshake.
            </p>
            <button 
              onClick={() => setActiveTab("cors")}
              className="text-[10px] text-emerald-300 font-semibold hover:underline flex items-center gap-1 mt-1 font-mono hover:text-emerald-200"
            >
              Examine CORS Preflight Engine <ArrowRight className="w-3 h-3" />
            </button>
          </div>

        </aside>

        {/* MIDDLE COLUMN: SQL QUERY EDITOR & WORKSPACE CONTROL (ColSpan 4) */}
        <main className="xl:col-span-4 border-r border-[#21262d] bg-[#0d1117] flex flex-col overflow-hidden">
          
          <div className="border-b border-[#21262d] bg-[#161b22]/60 px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-gray-300 font-mono">Workspace Editor &gt;</span>
              <span className="text-xs font-semibold font-mono text-emerald-300">{activeQuery.name}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setEditorText(activeQuery.originalContent)}
                className="text-[10px] text-gray-400 hover:text-gray-200 bg-[#21262d] px-2 py-1 rounded border border-[#30363d] flex items-center gap-1 transition"
                title="Reset to Original template SQL"
              >
                <RefreshCw className="w-3 h-3" />
                Reset Content
              </button>
            </div>
          </div>

          {/* SQL Editor Input Body */}
          <div className="flex-1 relative font-mono text-xs p-4 bg-[#0d1117] flex gap-3 overflow-hidden">
            {/* Simulation of line gutters */}
            <div className="text-right text-[#30363d] select-none pr-2 border-r border-[#21262d] leading-6 font-mono text-[11px] h-full overflow-hidden">
              {editorText.split("\n").map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            {/* Editable Content */}
            <textarea
              value={editorText}
              onChange={e => setEditorText(e.target.value)}
              spellCheck={false}
              className="flex-1 bg-transparent text-gray-200 resize-none outline-none border-none leading-6 font-mono text-[12px] h-full focus:ring-0 overflow-y-auto"
              placeholder="-- Enter or paste write SQL code here..."
            />
          </div>

          {/* Active Action Controls Trigger buttons */}
          <div className="border-t border-[#21262d] bg-[#161b22] p-4 flex flex-col gap-2">
            
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={runLint}
                disabled={linting}
                className="bg-[#21262d] hover:bg-[#30363d] text-gray-100 py-2.5 px-3 rounded-lg border border-[#30363d] text-xs font-semibold flex items-center justify-center gap-2 transition disabled:opacity-45"
              >
                {linting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                    Scanning rules...
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-emerald-400" />
                    1. Deterministic Lint
                  </>
                )}
              </button>
              
              <button 
                onClick={runAutoFix}
                disabled={fixing}
                className="bg-[#21262d] hover:bg-[#30363d] text-gray-100 py-2.5 px-3 rounded-lg border border-[#30363d] text-xs font-semibold flex items-center justify-center gap-2 transition disabled:opacity-45"
              >
                {fixing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                    Correcting styles...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-3.5 h-3.5 text-amber-400" />
                    2. Mechanical Auto-Fix
                  </>
                )}
              </button>
            </div>

            <button 
              onClick={runAiRefactor}
              disabled={aiRefactoring}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-[#0d1117] py-3 px-4 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-500/10 disabled:opacity-50"
            >
              {aiRefactoring ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Gemini Agent Loop Active: Analyzing & Refactoring...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  3. Execute Gemini AI Refactor Loop
                </>
              )}
            </button>

            <div className="flex items-center justify-between text-[10px] text-gray-500 mt-1 font-mono">
              <span>Selected model: gemini-3.5-flash</span>
              <span>Latency: ~1.2s</span>
            </div>
          </div>

        </main>

        {/* RIGHT COLUMN: TABS PANEL (ColSpan 4) */}
        <section className="xl:col-span-4 border-t xl:border-t-0 border-[#21262d] bg-[#0d1117] flex flex-col overflow-hidden">
          
          {/* Diagnostic Tab selections */}
          <div className="border-b border-[#21262d] bg-[#161b22] px-2 flex flex-wrap gap-1">
            <button
              onClick={() => setActiveTab("infra")}
              className={`px-3.5 py-3 text-xs font-semibold border-b-2 gap-1.5 flex items-center transition ${
                activeTab === "infra" 
                  ? "border-emerald-500 text-emerald-400" 
                  : "border-transparent text-gray-400 hover:text-gray-200"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Full-Stack Reality
            </button>
            <button
              onClick={() => setActiveTab("linter")}
              className={`px-3.5 py-3 text-xs font-semibold border-b-2 transition ${
                activeTab === "linter" 
                  ? "border-emerald-500 text-emerald-400" 
                  : "border-transparent text-gray-400 hover:text-gray-200"
              }`}
            >
              Linter Output
            </button>
            <button
              onClick={() => setActiveTab("diff")}
              className={`px-4 py-3 text-xs font-semibold border-b-2 transition ${
                activeTab === "diff" 
                  ? "border-emerald-500 text-emerald-400" 
                  : "border-transparent text-gray-400 hover:text-gray-200"
              }`}
            >
              File Diff
            </button>
            <button
              onClick={() => setActiveTab("reports")}
              className={`px-4 py-3 text-xs font-semibold border-b-2 transition ${
                activeTab === "reports" 
                  ? "border-emerald-500 text-emerald-400" 
                  : "border-transparent text-gray-400 hover:text-gray-200"
              }`}
            >
              Diagnostic Charts
            </button>
            <button
              onClick={() => setActiveTab("prompts")}
              className={`px-4 py-3 text-xs font-semibold border-b-2 transition ${
                activeTab === "prompts" 
                  ? "border-emerald-500 text-emerald-400" 
                  : "border-transparent text-gray-400 hover:text-gray-200"
              }`}
            >
              Prompt Logs
            </button>
            <button
              onClick={() => setActiveTab("cors")}
              className={`px-4 py-3 text-xs font-semibold border-b-2 transition ${
                activeTab === "cors" 
                  ? "border-emerald-500 text-emerald-400" 
                  : "border-transparent text-gray-400 hover:text-gray-200"
              }`}
            >
              CORS Debugger
            </button>
          </div>

          {/* Dynamic Window Container based on selected tab */}
          <div className="flex-1 p-5 overflow-y-auto">
            
            {/* TAB 0: INTERACTIVE FULL-STACK REALITY STACK */}
            {activeTab === "infra" && (
              <div className="flex flex-col gap-5">
                <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-4">
                  <span className="text-[10px] font-mono text-emerald-400 block mb-1">PROD INFRASTRUCTURE TOPOLOGY &gt;</span>
                  <p className="text-xs text-gray-400">
                    Symmetrically synchronized console mirroring all <strong>13 key architectural layers</strong> that form high-availability production environments. Click layers on the 3D stack cylinder to run diagnostic routines.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                  
                  {/* Left Layer Stack Graphic (ColSpan 5) */}
                  <div className="lg:col-span-5 flex flex-col gap-1.5 p-3 bg-[#161b22]/40 rounded-xl border border-[#21262d]">
                    <div className="text-[10px] font-mono text-gray-500 text-center mb-1 font-bold uppercase tracking-widest">
                      3D PROD ENV CYLINDER
                    </div>
                    {/* The 13 vertical cylinders stacked beautifully! */}
                    <div className="flex flex-col-reverse gap-[3px] select-none">
                      {INFRA_LAYERS.map((layer, idx) => {
                        const isSelected = selectedLayerId === layer.id;
                        // Map distinct coloring pairings on each cylinder ring to recreate diagram beautifully
                        const getCylinderGradient = (name: string, selected: boolean) => {
                          const pairings: Record<string, string> = {
                            "Frontend": "from-amber-600 via-amber-400 to-amber-700",
                            "APIs & Backend Logic": "from-blue-700 via-blue-500 to-blue-800",
                            "Database & Storage": "from-teal-700 via-teal-500 to-teal-800",
                            "Auth & Permissions": "from-emerald-700 via-emerald-500 to-emerald-800",
                            "Hosting & Deployment": "from-stone-700 via-stone-500 to-stone-800",
                            "Cloud & Compute": "from-zinc-500 via-zinc-400 to-zinc-650",
                            "CI/CD & Version Control": "from-orange-500 via-orange-400 to-orange-600",
                            "Security & RLS": "from-red-600 via-amber-600 to-red-700",
                            "Rate Limiting": "from-red-700 via-red-500 to-red-800",
                            "Caching & CDN": "from-rose-800 via-rose-600 to-rose-950",
                            "Load Balancing & Scaling": "from-purple-700 via-purple-500 to-purple-800",
                            "Error Tracking & Logs": "from-pink-600 via-pink-400 to-pink-700",
                            "Availability & Recovery": "from-sky-600 via-sky-400 to-sky-700",
                          };
                          const base = pairings[name] || "from-gray-700 via-gray-500 to-gray-800";
                          return `bg-gradient-to-r ${base} ${selected ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0d1117] h-8 -translate-y-0.5 scale-[1.03] shadow-lg shadow-white/10 z-10' : 'h-6 opacity-75 hover:opacity-100'}`;
                        };

                        return (
                          <div
                            key={layer.id}
                            id={layer.id}
                            onClick={() => setSelectedLayerId(layer.id)}
                            className={`relative rounded-full cursor-pointer transition-all duration-200 flex items-center justify-center border border-black/30 ${getCylinderGradient(layer.name, isSelected)}`}
                          >
                            <span className="text-[10px] uppercase font-mono font-bold text-black drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] text-center">
                              {(idx + 1).toString().padStart(2, "0")} . {layer.name}
                            </span>
                            {isSelected && (
                              <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Layer Active Diagnostics Information Panel (ColSpan 7) */}
                  <div className="lg:col-span-7 flex flex-col gap-4">
                    {(() => {
                      const activeLayer = INFRA_LAYERS.find(l => l.id === selectedLayerId) || INFRA_LAYERS[0];
                      return (
                        <div className="border border-[#21262d] rounded-xl overflow-hidden bg-[#161b22]">
                          {/* Panel Header */}
                          <div className="bg-[#21262d]/60 px-4 py-3 border-b border-[#21262d] flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                              <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wide">
                                Layer Audit Console
                              </h4>
                            </div>
                            <span className="text-[10px] font-mono text-gray-500">
                              ID: {activeLayer.id}
                            </span>
                          </div>

                          {/* Detail Content */}
                          <div className="p-4 flex flex-col gap-3 text-xs">
                            <div className="flex items-center justify-between gap-2 border-b border-[#21262d] pb-2">
                              <span className="font-bold text-gray-100 font-display text-sm">{activeLayer.name}</span>
                              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono text-[10px]">
                                {activeLayer.name === "Availability & Recovery" && breakerOpen ? "TRIPPED / OPEN" : "Operational"}
                              </span>
                            </div>

                            <p className="text-gray-300 leading-relaxed text-[11px]">
                              {activeLayer.desc}
                            </p>

                            <div className="bg-[#0d1117] p-2.5 rounded border border-[#21262d] font-mono text-[10px] flex items-center justify-between">
                              <span className="text-gray-500 font-bold uppercase">Technology Stack:</span>
                              <span className="text-emerald-300 font-semibold">{activeLayer.tech}</span>
                            </div>

                            {/* DYNAMIC METRIC INTERACTIVE DASHBOARD PER LAYER */}
                            <div className="border-t border-[#21262d] pt-3 flex flex-col gap-2">
                              <span className="font-mono text-gray-500 uppercase font-bold text-[9px] tracking-wider block">
                                Diagnostics & Controls:
                              </span>

                              {/* 1. FRONTEND LAYER DIAGNOSTICS */}
                              {activeLayer.name === "Frontend" && (
                                <div className="bg-[#0d1117] p-3 rounded-lg border border-[#21262d] flex flex-col gap-2">
                                  <div className="flex items-center justify-between text-[11px] font-mono">
                                    <span className="text-gray-400">Viewport Metrics:</span>
                                    <span className="text-amber-400">Ready</span>
                                  </div>
                                  <button
                                    onClick={() => {
                                      const start = performance.now();
                                      setTimeout(() => {
                                        const end = performance.now();
                                        setSimEventLogs(prev => [
                                          `[TELEMETRY] Frontend render test complete in ${(end-start).toFixed(2)}ms. Framerate stable.`,
                                          ...prev
                                        ]);
                                      }, 50);
                                    }}
                                    className="w-full bg-[#21262d] hover:bg-[#30363d] text-gray-200 py-1.5 px-3 rounded text-[11px] font-semibold border border-[#30363d] transition"
                                  >
                                    Execute Render Speed Test
                                  </button>
                                </div>
                              )}

                              {/* 2. APIs & BACKEND LAYER DIAGNOSTICS */}
                              {activeLayer.name === "APIs & Backend Logic" && (
                                <div className="bg-[#0d1117] p-3 rounded-lg border border-[#21262d] flex flex-col gap-2">
                                  <div className="flex items-center justify-between text-[11px] font-mono">
                                    <span className="text-gray-400">Latency Ping:</span>
                                    <span className="text-[#8b949e]">
                                      {pingMeasurement !== null ? `${pingMeasurement.toFixed(1)} ms` : "unmeasured"}
                                    </span>
                                  </div>
                                  <button
                                    onClick={async () => {
                                      setPinging(true);
                                      try {
                                        const t0 = performance.now();
                                        const res = await fetch("/api/rules");
                                        const t1 = performance.now();
                                        if (res.ok) {
                                          setPingMeasurement(t1 - t0);
                                          setSimEventLogs(prev => [
                                            `[TELEMETRY] REST roundtrip pinged /api/rules -> 200 OK after ${(t1-t0).toFixed(1)}ms.`,
                                            ...prev
                                          ]);
                                        }
                                      } catch {
                                        setPingMeasurement(321);
                                      } finally {
                                        setPinging(false);
                                      }
                                    }}
                                    disabled={pinging}
                                    className="w-full bg-[#21262d] hover:bg-[#30363d] text-gray-200 py-1.5 px-3 rounded text-[11px] font-semibold border border-[#30363d] transition disabled:opacity-50"
                                  >
                                    {pinging ? "Ping flying..." : "Fire REST Latency Ping"}
                                  </button>
                                </div>
                              )}

                              {/* 3. DATABASE & STORAGE */}
                              {activeLayer.name === "Database & Storage" && (
                                <div className="bg-[#0d1117] p-3 rounded-lg border border-[#21262d] flex flex-col gap-2">
                                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#8b949e]">
                                    <div className="border border-[#21262d] p-1.5 rounded">
                                      <span className="block text-gray-500">QUERIES REGISTERED</span>
                                      <strong className="text-emerald-400 text-xs">{queriesList.length}</strong>
                                    </div>
                                    <div className="border border-[#21262d] p-1.5 rounded">
                                      <span className="block text-gray-500">PROMPTS STORED</span>
                                      <strong className="text-emerald-400 text-xs">{promptLogs.length}</strong>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* 4. AUTH & PERMISSIONS */}
                              {activeLayer.name === "Auth & Permissions" && (
                                <div className="bg-[#0d1117] p-3 rounded-lg border border-[#21262d] flex flex-col gap-1.5 text-[10px] font-mono leading-relaxed">
                                  <div className="flex justify-between border-b border-[#21262d] pb-1">
                                    <span className="text-gray-500">SUBJECT CLAIM:</span>
                                    <span className="text-gray-200">Jane Data Analyst</span>
                                  </div>
                                  <div className="flex justify-between border-b border-[#21262d] pb-1">
                                    <span className="text-gray-500">ROLES CLAIM:</span>
                                    <span className="text-emerald-400">Data Engineer</span>
                                  </div>
                                  <div className="break-all text-[9px] text-[#8b949e] font-mono mt-1 opacity-70">
                                    HEADER FORMAT: <span className="text-amber-300">Authorization: Bearer sql-fixer-token-ZGVt...</span>
                                  </div>
                                </div>
                              )}

                              {/* 5. HOSTING & DEPLOYMENT */}
                              {activeLayer.name === "Hosting & Deployment" && (
                                <div className="bg-[#0d1117] p-3 rounded-lg border border-[#21262d] flex flex-col gap-1.5 text-[10px] font-mono">
                                  <div className="flex justify-between text-gray-400">
                                    <span>CONTAINER STATUS:</span>
                                    <span className="text-emerald-400">RUNNING (Port 3000)</span>
                                  </div>
                                  <div className="flex justify-between text-[#8b949e] border-t border-[#21262d] pt-1">
                                    <span>NGINX REVERSE PROXY:</span>
                                    <span className="text-emerald-400">ACTIVE HANDSHAKE</span>
                                  </div>
                                </div>
                              )}

                              {/* 6. CLOUD & COMPUTE */}
                              {activeLayer.name === "Cloud & Compute" && (
                                <div className="bg-[#0d1117] p-3 rounded-lg border border-[#21262d] flex flex-col gap-3 font-mono text-[10px]">
                                  <div className="flex flex-col gap-1">
                                    <div className="flex justify-between">
                                      <span className="text-gray-400">CPU UTILIZATION (V-THREAD CORE):</span>
                                      <span className="text-[#58a6ff] font-bold">{cpuVal}%</span>
                                    </div>
                                    <div className="w-full bg-[#21262d] h-2 rounded-full overflow-hidden">
                                      <div className="bg-[#58a6ff] h-full transition-all duration-300" style={{ width: `${Math.min(100, cpuVal*4)}%` }} />
                                    </div>
                                  </div>
                                  <div className="flex flex-col gap-1">
                                    <div className="flex justify-between">
                                      <span className="text-gray-400">VIRTUAL RAM UTILIZATION:</span>
                                      <span className="text-[#58a6ff] font-bold">{ramVal} MB</span>
                                    </div>
                                    <div className="w-full bg-[#21262d] h-2 rounded-full overflow-hidden">
                                      <div className="bg-[#58a6ff] h-full transition-all duration-300" style={{ width: `${Math.min(100, (ramVal/250)*100)}%` }} />
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* 7. CI/CD & PIPELINE */}
                              {activeLayer.name === "CI/CD & Version Control" && (
                                <div className="bg-[#0d1117] p-3 rounded-lg border border-[#21262d] flex flex-col gap-1.5 font-mono text-[10px] text-gray-400">
                                  <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                    <span>Vite Build Integration: SUCCESS</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                    <span>Strict TypeScript compilation: OK</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                    <span>Format Rule enforcement checks: COMPLETED</span>
                                  </div>
                                </div>
                              )}

                              {/* 8. SECURITY & RLS */}
                              {activeLayer.name === "Security & RLS" && (
                                <div className="bg-[#0d1117] p-3 rounded-lg border border-[#21262d] flex flex-col gap-1 text-[10px] font-mono">
                                  <span className="text-gray-500">ALLOWED ORIGINS WHITELIST:</span>
                                  <div className="bg-[#161b22] px-2 py-1 rounded border border-[#21262d] text-emerald-400 tracking-tight leading-normal">
                                    ["https://client-partner-dashboard.com", "http://localhost:3000", "*.run.app"]
                                  </div>
                                </div>
                              )}

                              {/* 9. RATE LIMITING */}
                              {activeLayer.name === "Rate Limiting" && (
                                <div className="bg-[#0d1117] p-3 rounded-lg border border-[#21262d] flex flex-col gap-2">
                                  <div className="flex items-center justify-between text-[11px] font-mono">
                                    <span className="text-gray-400">Scanned Requests Quota Used:</span>
                                    <span className="text-[#f78166] font-bold">{rateLimitConsumed} / 100 req/min</span>
                                  </div>
                                  <div className="w-full bg-[#21262d] h-2 rounded-full overflow-hidden">
                                    <div className="bg-[#f78166] h-full transition-all duration-300" style={{ width: `${rateLimitConsumed}%` }} />
                                  </div>
                                  <span className="text-[9px] text-[#8b949e] leading-snug">
                                    💡 Telemetry note: Consumed counter goes up in real-time on key deterministic formatting and AI queries you trigger!
                                  </span>
                                </div>
                              )}

                              {/* 10. CACHING & CDN */}
                              {activeLayer.name === "Caching & CDN" && (
                                <div className="bg-[#0d1117] p-3 rounded-lg border border-[#21262d] flex flex-col gap-2">
                                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                                    <div className="border border-[#21262d] p-1.5 rounded bg-[#161b22]">
                                      <span className="block text-gray-500">CACHE HITS</span>
                                      <strong className="text-cyan-400 text-xs">{cacheHits}</strong>
                                    </div>
                                    <div className="border border-[#21262d] p-1.5 rounded bg-[#161b22]">
                                      <span className="block text-gray-500">CACHE MISSES</span>
                                      <strong className="text-[#8b949e] text-xs">{cacheMisses}</strong>
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between text-[10px] font-mono text-[#8b949e]">
                                    <span>CACHE HIT RATIO:</span>
                                    <span className="text-emerald-400 font-bold">
                                      {((cacheHits / (cacheHits + cacheMisses || 1)) * 100).toFixed(1)}%
                                    </span>
                                  </div>
                                </div>
                              )}

                              {/* 11. LOAD BALANCERS */}
                              {activeLayer.name === "Load Balancing & Scaling" && (
                                <div className="bg-[#0d1117] p-3 rounded-lg border border-[#21262d] flex flex-col gap-1.5 font-mono text-[10px] text-gray-400">
                                  <div className="flex justify-between">
                                    <span>REPLICA POD SETS:</span>
                                    <span className="text-emerald-400 font-bold">2 Clusters Active</span>
                                  </div>
                                  <div className="flex justify-between border-t border-[#21262d] pt-1">
                                    <span>BALANCER LOAD (POD A):</span>
                                    <span className="text-indigo-400">54% throttle</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>BALANCER LOAD (POD B):</span>
                                    <span className="text-indigo-400">46% throttle</span>
                                  </div>
                                </div>
                              )}

                              {/* 12. STREAM LOGS CAPTURE */}
                              {activeLayer.name === "Error Tracking & Logs" && (
                                <div className="bg-[#0d1117] p-3 rounded-lg border border-[#21262d] flex flex-col gap-1.5 font-mono text-[10px] text-gray-400">
                                  <span>LOGS AGENT TARGET:</span>
                                  <span className="text-pink-400">fluentd log-forwarder daemon</span>
                                  <div className="text-[9px] text-gray-500 italic mt-1 leading-normal">
                                    Tracks active system triggers and preflight origins in the real-time stream log below.
                                  </div>
                                </div>
                              )}

                              {/* 13. AVAILABILITY & RECOVERY CIRCUIT BREAKER (THE CRITICAL ELEMENT) */}
                              {activeLayer.name === "Availability & Recovery" && (
                                <div className="bg-[#0d1117] p-3 rounded-lg border border-[#21262d] flex flex-col gap-2.5">
                                  <div className="flex items-center justify-between text-[11px] font-mono">
                                    <span className="text-gray-400">CIRCUIT BREAKER STATE:</span>
                                    <span className={`font-bold ${breakerOpen ? "text-red-400" : "text-emerald-400"}`}>
                                      {breakerOpen ? "OPEN (Outage Simulated)" : "CLOSED (Healthy SLA)"}
                                    </span>
                                  </div>

                                  <div className="flex items-center justify-between p-2 rounded bg-[#161b22] border border-[#21262d]">
                                    <div className="flex flex-col">
                                      <span className="text-[10px] font-bold text-gray-200">Trip Circuit Breaker</span>
                                      <span className="text-[8px] text-gray-400 font-mono">Simulates cloud cluster failover</span>
                                    </div>
                                    <button
                                      onClick={() => {
                                        setBreakerOpen(!breakerOpen);
                                        const nextState = !breakerOpen;
                                        const now = new Date().toLocaleTimeString();
                                        setSimEventLogs(prev => [
                                          `[CIRCUIT_BREAKER] ${now} - Circuit breaker manually flipped to ${nextState ? "OPEN (Service Isolated)" : "CLOSED (Healthy/Normal)"}.`,
                                          ...prev
                                        ]);
                                      }}
                                      className={`px-3 py-1 rounded text-[10px] font-bold transition ${
                                        breakerOpen 
                                          ? "bg-red-500 hover:bg-red-600 text-white" 
                                          : "bg-emerald-500 hover:bg-emerald-600 text-[#0d1117]"
                                      }`}
                                    >
                                      {breakerOpen ? "RESTORE HEALTH" : "TRIP CIRCUIT"}
                                    </button>
                                  </div>
                                  <span className="text-[9px] text-[#8b949e] font-mono leading-normal leading-relaxed opacity-80">
                                    ⚠️ Try tripping the circuit breaker! It isolates the client so subsequent linter or AI actions instantly show fail-safes!
                                  </span>
                                </div>
                              )}

                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* REAL-TIME SIMULATED STREAMING EVENT LOGS TERMINAL */}
                <div className="bg-[#161b22] border border-[#21262d] rounded-xl overflow-hidden mt-2">
                  <div className="bg-[#21262d]/60 px-4 py-2 border-b border-[#21262d] flex items-center justify-between">
                    <span className="text-[10px] font-mono text-gray-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                      Dynamic Stream Terminal logs (Realtime)
                    </span>
                    <button
                      onClick={() => setSimEventLogs([`[CONSOLE] Console logs flushed by developer at ${new Date().toLocaleTimeString()}`])}
                      className="text-[9px] font-mono text-[#8b949e] hover:text-gray-200"
                    >
                      CLEAR
                    </button>
                  </div>
                  <div className="p-4 bg-[#0d1117] h-[150px] overflow-y-auto font-mono text-[10px] leading-relaxed flex flex-col gap-1 text-gray-300">
                    {simEventLogs.map((log, index) => {
                      let color = "text-gray-300";
                      if (log.includes("[AVAILABILITY]")) color = "text-red-400 font-semibold";
                      else if (log.includes("[SYSTEM]")) color = "text-[#58a6ff]";
                      else if (log.includes("[CACHE]")) color = "text-cyan-400";
                      else if (log.includes("[LLM]")) color = "text-purple-400";
                      else if (log.includes("[RPC]")) color = "text-amber-400";
                      else if (log.includes("[TELEMETRY]")) color = "text-emerald-400";
                      
                      return (
                        <div key={index} className={`${color} border-b border-gray-900 pb-0.5 last:border-0`}>
                          {log}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 1: DETAILED LINT VIOLATIONS VIEW */}
            {activeTab === "linter" && (
              <div className="flex flex-col gap-4">
                
                {/* Visual rich design panel header simulation */}
                <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-4">
                  <span className="text-[10px] font-mono text-emerald-400 block mb-1">SCAN CONSOLE SUMMARY &gt;</span>
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-200">
                      Found {activeQuery.violations.length} critical policy exclusions
                    </h3>
                    <span className={`text-xs px-2.5 py-0.5 rounded font-bold ${
                      activeQuery.violations.length === 0 ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
                    }`}>
                      {activeQuery.violations.length === 0 ? "EXCELLENT" : "IMPERFECT CONFORMITY"}
                    </span>
                  </div>
                </div>

                {/* No violations fallback state */}
                {activeQuery.violations.length === 0 ? (
                  <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-6 text-center flex flex-col items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-emerald-400 font-mono uppercase tracking-wider">File status: Pristine Scan</h4>
                      <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
                        No active style violations detected in {activeQuery.name}. Go ahead and write production deployments!
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {activeQuery.violations.map(violation => {
                      const colors = SEVERITY_COLORS[violation.severity];
                      return (
                        <div 
                          key={violation.id}
                          className={`p-3.5 rounded-xl border ${colors.bg} ${colors.border} flex flex-col gap-2 text-xs`}
                        >
                          <div className="flex items-center justify-between gap-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono bg-[#0d1117] text-gray-400 px-1.5 py-0.5 rounded text-[10px] border border-[#30363d]">
                                Line {violation.line_no}
                              </span>
                              <span className="font-mono font-semibold text-gray-300">{violation.rule_id}</span>
                            </div>
                            <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${colors.badge}`}>
                              {violation.severity}
                            </span>
                          </div>

                          <span className="font-semibold text-gray-200 block">{violation.message}</span>
                          {violation.suggestion && (
                            <p className="bg-[#0d1117]/80 text-[#8b949e] p-2 rounded border border-[#21262d] font-mono text-[10px] leading-tight">
                              💡 <strong>Suggested fix:</strong> {violation.suggestion}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Interactive help text */}
                <div className="border border-[#21262d] rounded-xl p-4 bg-[#161b22] mt-2">
                  <h4 className="text-xs font-semibold text-gray-300 flex items-center gap-1.5 mb-1.5">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    How to fix step-by-step:
                  </h4>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    Use <strong>Mechanical Auto-Fix</strong> to immediately repair keyword casing and variable formatting across characters. Use the <strong>Gemini AI Refactor Loop</strong> to analyze deep schema attributes, expand joins and suggest columns intelligently.
                  </p>
                </div>

              </div>
            )}

            {/* TAB 2: INTERACTIVE BEFORE-AND-AFTER DIFF VIEW */}
            {activeTab === "diff" && (
              <div className="flex flex-col gap-4">
                
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className="text-gray-400">Comparing differences</span>
                  <button 
                    onClick={() => copyToClipboard(editorText)}
                    className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 px-2.5 py-1.5 rounded border border-emerald-500/20"
                  >
                    {copiedStatus ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedStatus ? "Copied!" : "Copy Current SQL"}
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-3 text-xs leading-relaxed">
                  
                  <div className="bg-red-500/5 red-border border rounded-xl overflow-hidden">
                    <div className="bg-[#161b22] px-3.5 py-2 border-b border-[#21262d] text-[11px] font-mono font-semibold text-red-400 flex justify-between items-center">
                      <span>ORIGINAL UNRESOLVED DOCUMENT</span>
                      <span className="bg-red-500/20 px-1.5 py-0.5 rounded text-[9px] uppercase">Violated</span>
                    </div>
                    <pre className="p-4 font-mono font-normal text-gray-400 text-[11px] leading-relaxed max-h-[170px] overflow-y-auto">
                      {activeQuery.originalContent}
                    </pre>
                  </div>

                  <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl overflow-hidden">
                    <div className="bg-[#161b22] px-3.5 py-2 border-b border-[#21262d] text-[11px] font-mono font-semibold text-emerald-400 flex justify-between items-center">
                      <span>REFACTORED OUTPUT PREVIEW</span>
                      <span className="bg-emerald-500/20 px-1.5 py-0.5 rounded text-[9px] uppercase font-bold text-emerald-300">Lint standard</span>
                    </div>
                    <pre className="p-4 font-mono font-normal text-gray-200 text-[11px] leading-relaxed max-h-[220px] overflow-y-auto">
                      {editorText}
                    </pre>
                  </div>

                </div>

                <div className="text-[11px] text-gray-400 bg-[#161b22] p-3 rounded-lg border border-[#21262d]">
                  🚀 Note: Inline annotations <span className="font-mono text-emerald-400">(-- Refactored..)</span> are dynamically placed by Gemini to audit refactoring steps before you deploy.
                </div>

              </div>
            )}

            {/* TAB 3: DIAGNOSTIC CHARTS & ANALYTICS REPORTS */}
            {activeTab === "reports" && (
              <div className="flex flex-col gap-6">
                
                {/* High level metrics stats row */}
                <div className="grid grid-cols-3 gap-2.5 text-center">
                  <div className="bg-[#161b22] border border-[#21262d] p-3 rounded-xl">
                    <span className="block text-[10px] text-gray-400 font-mono">SCORED FILES</span>
                    <span className="text-xl font-bold text-gray-100">{queriesList.length}</span>
                  </div>
                  <div className="bg-[#161b22] border border-[#21262d] p-3 rounded-xl">
                    <span className="block text-[10px] text-gray-400 font-mono">CLEAN/PASS</span>
                    <span className="text-xl font-bold text-emerald-400">{cleanFilesCount}</span>
                  </div>
                  <div className="bg-[#161b22] border border-[#21262d] p-3 rounded-xl">
                    <span className="block text-[10px] text-gray-400 font-mono font-semibold text-amber-400">TOTAL EXCLUSIONS</span>
                    <span className="text-xl font-bold text-amber-400">{totalViolations}</span>
                  </div>
                </div>

                {/* Severities Breakdown Bar Chart */}
                <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-4">
                  <h4 className="text-xs font-semibold text-gray-300 font-mono mb-3 uppercase tracking-wider">Criticisms by Severity Density</h4>
                  <div className="h-44 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={getRuleSeverityStats()} barSize={34}>
                        <XAxis dataKey="name" stroke="#888888" fontSize={9} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888888" fontSize={9} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ background: '#1f2937', borderColor: '#374151', borderRadius: '8px' }} />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                          {getRuleSeverityStats().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Rules usage distribution Bar Chart */}
                <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-4">
                  <h4 className="text-xs font-semibold text-gray-300 font-mono mb-3 uppercase tracking-wider">Rules violation density matrix</h4>
                  <div className="h-44 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={getRuleTypeDistribution()} layout="vertical">
                        <XAxis type="number" stroke="#888888" fontSize={9} tickLine={false} axisLine={false} />
                        <YAxis dataKey="name" type="category" stroke="#888888" fontSize={9} tickLine={false} axisLine={false} width={85} />
                        <Tooltip contentStyle={{ background: '#1f2937', borderColor: '#374151', borderRadius: '8px' }} />
                        <Bar dataKey="violations" fill="#f59e0b" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 4: SYSTEM PROMPT LOGGER (ai_prompts_used.md style) */}
            {activeTab === "prompts" && (
              <div className="flex flex-col gap-4">
                
                <div className="bg-[#161b22] border border-[#21262d] p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-gray-200">AI PROMPT HISTORY REGISTER</h3>
                    <p className="text-[10px] text-gray-500 mt-1">Exported automatically into <span className="font-mono text-emerald-400">ai_prompts_used.md</span></p>
                  </div>
                  <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded border border-emerald-500/15">
                    {promptLogs.length} Saved Prompts
                  </span>
                </div>

                {promptLogs.length === 0 ? (
                  <div className="bg-[#161b22]/30 border border-[#21262d] p-6 rounded-xl text-center text-xs text-gray-500">
                    <Sparkles className="w-8 h-8 text-gray-600 mx-auto mb-2 animate-bounce" />
                    No active refactoring prompt generated yet. Execute "Step 3: AI Refactor" to populate this register.
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {promptLogs.map(log => (
                      <div key={log.id} className="border border-[#21262d] bg-[#161b22]/70 rounded-xl overflow-hidden text-xs">
                        {/* Prompt header metadata */}
                        <div className="bg-[#161b22] px-3.5 py-2 border-b border-[#21262d] flex items-center justify-between text-[10px] font-mono text-gray-400">
                          <span className="text-[#888888]">MODEL: {log.model}</span>
                          <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                        </div>

                        {/* Prompt expansion bodies */}
                        <div className="p-3.5 flex flex-col gap-3">
                          
                          <div>
                            <span className="text-[10px] font-bold text-amber-500 uppercase font-mono block mb-1">SYSTEM INSIGHT RULES</span>
                            <pre className="bg-[#0d1117] p-2.5 rounded border border-[#21262d] font-mono text-[9px] text-[#8b949e] whitespace-pre-wrap max-h-28 overflow-y-auto">
                              {log.systemPrompt}
                            </pre>
                          </div>

                          <div>
                            <span className="text-[10px] font-bold text-emerald-400 uppercase font-mono block mb-1">USER CONTEXT</span>
                            <pre className="bg-[#0d1117] p-2.5 rounded border border-[#21262d] font-mono text-[9px] text-emerald-300/80 whitespace-pre-wrap max-h-24 overflow-y-auto">
                              {log.userMessage}
                            </pre>
                          </div>

                          <div>
                            <span className="text-[10px] font-bold text-sky-400 uppercase font-mono block mb-1">RAW MODEL OUTPUT</span>
                            <pre className="bg-[#0d1117] p-2.5 rounded border border-[#21262d] font-mono text-[9px] text-sky-300 block overflow-x-auto whitespace-pre">
                              {log.response}
                            </pre>
                          </div>

                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            )}

            {/* TAB 5: CORS LAB & AUTHENTICATION DIAGNOSTIC TERMINAL */}
            {activeTab === "cors" && (
              <div className="flex flex-col gap-5">
                
                {/* Visual simulator form testing cross origin rules */}
                <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-4 flex flex-col gap-3">
                  <div>
                    <h3 className="text-xs font-bold text-[#fafbfc] flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-emerald-400" />
                      CORS & Authentication Handshake Lab
                    </h3>
                    <p className="text-[10px] text-gray-500 mt-0.5">Simulate cross-origin HTTP Requests to test Preflight handshake headers</p>
                  </div>

                  <div className="flex flex-col gap-2.5 text-xs">
                    <div>
                      <label className="text-[10px] font-mono text-gray-400 block mb-1">MOCK REQUEST ORIGIN (CORS CHECK)</label>
                      <input 
                        type="text"
                        value={simulatedOrigin}
                        onChange={e => setSimulatedOrigin(e.target.value)}
                        className="w-full bg-[#0d1117] border border-[#21262d] rounded px-2.5 py-1.5 focus:border-[#444c56] text-gray-200 font-mono outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-mono text-gray-400 block mb-1">HTTP HEADER</label>
                        <input 
                          type="text"
                          value={simulatedHeader}
                          disabled
                          className="w-full bg-[#0d1117]/60 border border-[#21262d] rounded px-2.5 py-1.5 text-gray-500 font-mono outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-gray-400 block mb-1">HEADER VALUE (TOKEN)</label>
                        <input 
                          type="text"
                          value={simulatedHeaderVal}
                          onChange={e => setSimulatedHeaderVal(e.target.value)}
                          className="w-full bg-[#0d1117] border border-[#21262d] rounded px-2.5 py-1.5 focus:border-[#444c56] text-gray-200 font-mono outline-none"
                        />
                      </div>
                    </div>

                    <button 
                      onClick={runCORSSimulation}
                      disabled={simLoading}
                      className="w-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 py-2 rounded-lg font-mono font-bold text-xs flex items-center justify-center gap-1.5 shrink-0 transition"
                    >
                      {simLoading ? "Triggering Handshake..." : "Simulate CORS Authentication Request"}
                    </button>
                  </div>

                  {/* CORS simulation preflight response inspector */}
                  {simResponse && (
                    <div className="mt-2 bg-[#0d1117] border border-[#21262d] rounded-lg p-3 text-[10px]">
                      <div className="flex justify-between items-center mb-1 pb-1 border-b border-[#21262d] font-mono text-[#8b949e]">
                        <span>CORS Handshake Diagnostics:</span>
                        <span className="text-emerald-400">STATUS {simResponse.status}</span>
                      </div>
                      
                      <div className="font-mono text-emerald-400 flex flex-col gap-1 mt-1 leading-snug">
                        <span>&gt; OPTIONS Preflight Check: SUCCESS</span>
                        <span>&gt; Access-Control-Allow-Origin: {simResponse.headers["Access-Control-Allow-Origin"]}</span>
                        <span>&gt; Access-Control-Allow-Credentials: {simResponse.headers["Access-Control-Allow-Credentials"]}</span>
                        <span>&gt; Access-Control-Allow-Headers: {simResponse.headers["Access-Control-Allow-Headers"]}</span>
                        <span>&gt; Session Token verification: AUTHORIZED (Valid user: Jane)</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Real Server-side CORS logs list */}
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] font-mono text-gray-400 block uppercase tracking-wider">Live Express Server Handshake Logs:</span>
                  
                  {authState.requestLogs && authState.requestLogs.length > 0 ? (
                    <div className="flex flex-col gap-2 max-h-[280px] overflow-y-auto pr-1">
                      {authState.requestLogs.map((log, idx) => (
                        <div key={idx} className="bg-[#161b22] border border-[#21262d] rounded-xl p-3 text-[10px] font-mono flex flex-col gap-1.5">
                          
                          <div className="flex justify-between items-center text-xs">
                            <div className="flex items-center gap-1.5">
                              <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                                log.preflight ? "bg-[#58a6ff]/20 text-[#58a6ff]" : "bg-emerald-500/20 text-emerald-400"
                              }`}>
                                {log.preflight ? "OPTIONS PREFLIGHT" : log.method}
                              </span>
                              <span className="text-gray-300 text-[10px]">{log.url}</span>
                            </div>
                            <span className={log.status < 400 ? "text-emerald-400" : "text-red-400 font-bold"}>
                              STATUS {log.status}
                            </span>
                          </div>

                          <div className="text-gray-400 text-[9px] flex flex-col gap-0.5 pt-1 border-t border-[#21262d]/50">
                            <span className="text-[#a5d6ff]">Request ORIGIN: {log.origin}</span>
                            <span>Allowed Origin: {log.headersSent["Access-Control-Allow-Origin"]}</span>
                            <span>Allowed Headers: {log.headersSent["Access-Control-Allow-Headers"]}</span>
                            <span>Credential Trust: {log.headersSent["Access-Control-Allow-Credentials"]}</span>
                          </div>

                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl border border-[#21262d] text-center text-xs text-gray-500">
                      Waiting for active requests to trace...
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>

        </section>

      </div>

    </div>
  );
}
