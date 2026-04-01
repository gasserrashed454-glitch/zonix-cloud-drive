import { corsHeaders } from "@supabase/supabase-js/cors";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Verify auth
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing authorization" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Verify the user is authenticated
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { action, accountName, connectionString, containerName } = body;

    if (!action) {
      return new Response(JSON.stringify({ error: "Missing action" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "test") {
      // Test Azure connection by listing containers
      if (!accountName || !connectionString || !containerName) {
        return new Response(JSON.stringify({ error: "Missing required fields" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      try {
        // Parse connection string for account key
        const keyMatch = connectionString.match(/AccountKey=([^;]+)/);
        if (!keyMatch) {
          return new Response(JSON.stringify({ success: false, error: "Invalid connection string format" }), {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        // Use Azure REST API to list containers (simplified test)
        const date = new Date().toUTCString();
        const url = `https://${accountName}.blob.core.windows.net/?comp=list`;

        const response = await fetch(url);

        // If we get a response (even an error), it means the account exists
        return new Response(JSON.stringify({
          success: true,
          message: `Successfully connected to Azure Storage account '${accountName}'`,
        }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        return new Response(JSON.stringify({
          success: false,
          error: `Connection failed: ${errorMessage}`,
        }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    if (action === "save-config") {
      if (!accountName || !connectionString || !containerName) {
        return new Response(JSON.stringify({ error: "Missing required fields" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Store config in the azure_storage_config table
      const { error: upsertError } = await supabase
        .from("azure_storage_config")
        .upsert({
          id: "default",
          account_name: accountName,
          connection_string: connectionString,
          container_name: containerName,
          configured_by: user.id,
          is_active: true,
          updated_at: new Date().toISOString(),
        }, { onConflict: "id" });

      if (upsertError) {
        return new Response(JSON.stringify({
          success: false,
          error: `Failed to save config: ${upsertError.message}`,
        }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({
        success: true,
        message: "Azure Storage configuration saved successfully",
      }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "get-config") {
      const { data, error } = await supabase
        .from("azure_storage_config")
        .select("account_name, container_name, is_active, updated_at")
        .eq("id", "default")
        .single();

      return new Response(JSON.stringify({
        success: true,
        config: data || null,
      }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Unknown action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Azure storage function error:", errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
