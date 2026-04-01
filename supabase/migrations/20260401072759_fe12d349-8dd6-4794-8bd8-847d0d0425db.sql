
-- Remove permissive policy
DROP POLICY IF EXISTS "Service role full access" ON public.azure_storage_config;

-- No public policies needed - edge functions use service_role key which bypasses RLS
-- This means no regular user can access this table directly
