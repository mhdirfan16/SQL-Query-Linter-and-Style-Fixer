# AI Prompts Used during Development

This document records the key AI prompts utilized during the development of **sql-lint-fixer** for structural and stylistic SQL refactoring tasks.

---

## 1. SQL Rule Refactoring Prompt (Gemini API Model Input)

This system instructions block guides the Gemini model to analyze, identify, and repair the complex styling rules of implicit joins, asterisk column replacement, snake_case transformations, and correct table aliasing.

### System Instructions Profile

```text
You are an expert database administrator and SQL styling evaluator.
Your purpose is to take an SQL query with identified styling violations and reformulate it into valid, correct, production-grade SQL matching standard conventions.

SPECIFIC RULES TO FIX (only if requested/active):
1. Resolve 'SELECT *' violations (RULE-001): 
   - Examine table joins, table references, or common structures.
   - Infer or invent descriptive, context-appropriate explicit column names (e.g. id, created_at, user_name, status, item_amount, etc.) based on the tables. Say SELECT usr.id, usr.name, usr.created_at, ord.order_total, ord.status...
2. Ensure table names and columns follow snake_case (RULE-002) - convert camelCase or PascalCase.
3. Replace single-letter table aliases like 'a', 'b', 't1' with descriptive abbreviations (RULE-003):
   - e.g. table 'users' -> alias 'usr' or 'u_acct'.
   - e.g. table 'orders' -> alias 'ord' or 'o_hdr'.
4. Eliminate comma-separated FROM joined tables (RULE-004):
   - Rewrite 'FROM table1, table2 WHERE table1.id = table2.table1_id' as explicit 'FROM table1 JOIN table2 ON table1.id = table2.table1_id'
5. Consistent UPPERCASE keywords: SELECT, INSERT, UPDATE, JOIN, FROM, WHERE, ON, GROUP BY, ORDER BY, LEFT OUTER JOIN, etc. (RULE-005)

FORMAT INSTRUCTIONS:
- Return ONLY valid runnable SQL.
- Place explicit inline SQL comments (--) next to edited lines explaining the refactor decision (e.g. -- Refactored implicit join; -- Replaced * with explicit schema columns; -- Renamed alias to fit standard).
- Do not output any chat preambles or post-conversations, only pure SQL code block with decisions.
```

### User Input Prompt Pattern

```text
Refactor this SQL Query. It has the following specific rule violations:
[
  {
    "id": "v-1-2",
    "line_no": 2,
    "rule_id": "RULE-001",
    "rule_name": "no_select_star",
    "severity": "ERROR",
    "message": "SELECT * detected. Use explicit column names instead of wildcards to optimize execution paths.",
    "suggestion": "Request explicit columns from schema or utilize LLM Refactoring capability."
  },
  {
    "id": "v-4-3",
    "line_no": 3,
    "rule_id": "RULE-004",
    "rule_name": "no_implicit_join",
    "severity": "WARN",
    "message": "Implicit comma-separated join syntax detected. Avoid comma syntax; use explicit INNER JOIN instead.",
    "suggestion": "Rewrite tables with explicit JOIN keyword."
  }
]

Original SQL to Refactor:
```sql
select *
from users u, orders o
where u.userId = o.userId
and u.status = 'active'
and o.amount > 100
order by o.createdAt desc;
```

Return the final refactored SQL with comments:
```

---

## 2. In-App Interactive Simulation Flow (Demo Agent Fallback Mode)

When the Gemini API key is not actively configured or is offline, the system falls back onto a high-fidelity local parser to evaluate and reconstruct code structures line-by-line while keeping visual annotations intact.

### Rule-004 Implicit Join to Explicit Conversion Pattern

```typescript
const implicitJoinRegex = /\bfrom\s+(\w+)(?:\s+(?:as\s+)?(\w+))?\s*,\s*(\w+)(?:\s+(?:as\s+)?(\w+))?/i;
if (implicitJoinRegex.test(currLine)) {
  temp = temp.replace(implicitJoinRegex, (match, tbl1, alias1, tbl2, alias2) => {
    const a1 = alias1 ? ` AS ${alias1}` : "";
    const a2 = alias2 ? ` AS ${alias2}` : "";
    let onCondition = ` ON ${alias1 || tbl1}.userId = ${alias2 || tbl2}.userId`;
    return `FROM ${tbl1}${a1} JOIN ${tbl2}${a2}${onCondition} -- Converted comma list to explicit modern ANSI JOIN`;
  });
}
```
