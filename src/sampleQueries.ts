/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SampleQuery {
  id: string;
  name: string;
  description: string;
  content: string;
}

export const SAMPLE_QUERIES: SampleQuery[] = [
  {
    id: "query-1",
    name: "fetch_user_metrics.sql",
    description: "Contains SELECT *, implicit joins, mixed casing, and single-letter aliases.",
    content: `-- Legacy user metrics fetch query
select *
from users u, orders o
where u.userId = o.userId
and u.status = 'active'
and o.amount > 100
order by o.createdAt desc;`
  },
  {
    id: "query-2",
    name: "update_camelCase_pricing.sql",
    description: "Contains camelCase columns, mixed keywords, and unformatted SQL lines.",
    content: `-- Update regional prices for product catalog
Update products
Set basePrice = currentPrice * 1.05,
    updatedAt = NOW(),
    lastModifiedBy = 'system_broker'
where isActive = true
and categoryCode = 'ELEC';`
  },
  {
    id: "query-3",
    name: "legacy_implicit_joins.sql",
    description: "Heavy multi-table comma-separated FROM join style and single-letter aliases.",
    content: `-- Revenue and customer analytics query
select c.customerName, p.productName, s.salePrice, s.saleDate
from customers c, products p, sales s
where c.id = s.customerId
and p.id = s.productId
and s.salePrice > 500
and s.saleDate > '2026-01-01'
order by s.salePrice desc;`
  },
  {
    id: "query-4",
    name: "clean_billing_report.sql",
    description: "A fully valid, properly formatted SQL report with no violations.",
    content: `-- Optimized clean billing report query
SELECT 
    usr.id,
    usr.display_name,
    ord.order_date,
    ord.total_amount
FROM users AS usr
JOIN orders AS ord ON usr.id = ord.user_id
WHERE usr.status = 'ACTIVE'
ORDER BY ord.order_date DESC;`
  }
];
