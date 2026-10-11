-- Supports tenant-scoped dashboard aggregates and the sales checkout flow.
CREATE INDEX IF NOT EXISTS "inventories_variantId_idx" ON "inventories"("variantId");
CREATE INDEX IF NOT EXISTS "payments_tenantId_createdAt_idx" ON "payments"("tenantId", "createdAt");
CREATE INDEX IF NOT EXISTS "sales_tenantId_createdAt_idx" ON "sales"("tenantId", "createdAt");
CREATE INDEX IF NOT EXISTS "sale_items_variantId_idx" ON "sale_items"("variantId");
