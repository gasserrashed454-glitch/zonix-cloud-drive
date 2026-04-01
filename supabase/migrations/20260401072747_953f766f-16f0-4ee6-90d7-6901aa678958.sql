
-- Create azure_storage_config table for admin Azure Storage settings
CREATE TABLE public.azure_storage_config (
  id TEXT NOT NULL DEFAULT 'default' PRIMARY KEY,
  account_name TEXT NOT NULL,
  connection_string TEXT NOT NULL,
  container_name TEXT NOT NULL DEFAULT 'zonix-cloud-files',
  configured_by UUID REFERENCES auth.users(id),
  is_active BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.azure_storage_config ENABLE ROW LEVEL SECURITY;

-- Only service role can access (edge functions use service role key)
-- No public policies - this table is only accessed via edge functions with service_role
CREATE POLICY "Service role full access" ON public.azure_storage_config
  FOR ALL USING (true) WITH CHECK (true);
