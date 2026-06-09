/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SQLFile {
  id: string;
  name: string;
  originalContent: string;
  currentContent: string;
  isClean: boolean;
  violations: LintViolation[];
  fixedContent?: string;
  llmSuggestions?: string[];
}

export interface LintViolation {
  id: string;
  file_path: string;
  line_no: number;
  rule_id: string;
  rule_name: string;
  severity: "ERROR" | "WARN" | "INFO";
  message: string;
  suggestion: string | null;
}

export interface RuleConfig {
  id: string;
  name: string;
  severity: "ERROR" | "WARN" | "INFO";
  trigger: string;
  fixStrategy: string;
  enabled: boolean;
}

export interface AIPromptLog {
  id: string;
  timestamp: string;
  model: string;
  systemPrompt: string;
  userMessage: string;
  response: string;
}

export interface CORSConfig {
  allowedOrigins: string[];
  allowCredentials: boolean;
  allowedHeaders: string[];
  allowedMethods: string[];
}

export interface AuthState {
  token: string | null;
  user: {
    name: string;
    email: string;
    role: string;
  } | null;
  corsVerified: boolean;
  requestLogs: CORSReqLog[];
}

export interface CORSReqLog {
  timestamp: string;
  method: string;
  url: string;
  origin: string;
  preflight: boolean;
  headersSent: Record<string, string>;
  headersReceived: Record<string, string>;
  status: number;
}
