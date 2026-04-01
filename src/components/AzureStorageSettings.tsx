import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link2, CheckCircle2, XCircle, Loader2, AlertTriangle, HardDrive, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AzureStorageSettings = () => {
  const [accountName, setAccountName] = useState("");
  const [connectionString, setConnectionString] = useState("");
  const [containerName, setContainerName] = useState("zonix-cloud-files");
  const [testing, setTesting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"disconnected" | "connected" | "error">("disconnected");

  const handleTestConnection = async () => {
    if (!accountName || !connectionString || !containerName) {
      toast.error("Please fill in all fields");
      return;
    }
    setTesting(true);
    try {
      const { data, error } = await supabase.functions.invoke("azure-storage", {
        body: {
          action: "test",
          accountName,
          connectionString,
          containerName,
        },
      });
      if (error) throw error;
      if (data?.success) {
        setStatus("connected");
        toast.success("Azure Storage connection successful!");
      } else {
        setStatus("error");
        toast.error(data?.error || "Connection test failed");
      }
    } catch (err: any) {
      setStatus("error");
      toast.error(err.message || "Failed to test connection");
    } finally {
      setTesting(false);
    }
  };

  const handleSave = async () => {
    if (!accountName || !connectionString || !containerName) {
      toast.error("Please fill in all fields");
      return;
    }
    setSaving(true);
    try {
      const { data, error } = await supabase.functions.invoke("azure-storage", {
        body: {
          action: "save-config",
          accountName,
          connectionString,
          containerName,
        },
      });
      if (error) throw error;
      if (data?.success) {
        setStatus("connected");
        toast.success("Azure Storage configuration saved! All user files will now be stored in Azure.");
      } else {
        toast.error(data?.error || "Failed to save configuration");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to save configuration");
    } finally {
      setSaving(false);
    }
  };

  const handleDisconnect = () => {
    setAccountName("");
    setConnectionString("");
    setContainerName("zonix-cloud-files");
    setStatus("disconnected");
    toast.info("Azure Storage disconnected");
  };

  return (
    <div className="space-y-6">
      {/* Status banner */}
      <Card className={status === "connected" ? "border-zonix-success/50 bg-zonix-success/5" : ""}>
        <CardContent className="flex items-center gap-4 p-4">
          {status === "connected" ? (
            <CheckCircle2 className="h-8 w-8 text-zonix-success shrink-0" />
          ) : status === "error" ? (
            <XCircle className="h-8 w-8 text-destructive shrink-0" />
          ) : (
            <Link2 className="h-8 w-8 text-muted-foreground shrink-0" />
          )}
          <div className="flex-1">
            <p className="font-medium">
              {status === "connected" ? "Azure Storage Connected" : status === "error" ? "Connection Error" : "Not Connected"}
            </p>
            <p className="text-sm text-muted-foreground">
              {status === "connected"
                ? "All user files are stored in your Azure Blob Storage"
                : status === "error"
                ? "Check your credentials and try again"
                : "Link your Azure Storage account to store all user data and files"}
            </p>
          </div>
          <Badge variant={status === "connected" ? "default" : "secondary"}>
            {status === "connected" ? "Active" : status === "error" ? "Error" : "Inactive"}
          </Badge>
        </CardContent>
      </Card>

      {/* Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <HardDrive className="h-5 w-5" /> Azure Blob Storage Configuration
          </CardTitle>
          <CardDescription>
            Connect your Azure Storage account. All user-uploaded files, documents, and data will be stored in your Azure container.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="azure-account">Storage Account Name</Label>
            <Input
              id="azure-account"
              placeholder="mystorageaccount"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Found in Azure Portal → Storage accounts → your account name
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="azure-connection">Connection String</Label>
            <Input
              id="azure-connection"
              type="password"
              placeholder="DefaultEndpointsProtocol=https;AccountName=...;AccountKey=...;EndpointSuffix=core.windows.net"
              value={connectionString}
              onChange={(e) => setConnectionString(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Found in Azure Portal → Storage account → Access keys → Connection string
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="azure-container">Container Name</Label>
            <Input
              id="azure-container"
              placeholder="zonix-cloud-files"
              value={containerName}
              onChange={(e) => setContainerName(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              The blob container where files will be stored. It will be created if it doesn't exist.
            </p>
          </div>

          <div className="flex gap-2 pt-2">
            <Button onClick={handleTestConnection} variant="outline" disabled={testing || saving}>
              {testing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Test Connection
            </Button>
            <Button onClick={handleSave} disabled={testing || saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save & Connect
            </Button>
            {status === "connected" && (
              <Button onClick={handleDisconnect} variant="destructive" className="ml-auto">
                Disconnect
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Security note */}
      <Card>
        <CardContent className="flex items-start gap-3 p-4">
          <Shield className="h-5 w-5 text-primary mt-0.5 shrink-0" />
          <div className="text-sm">
            <p className="font-medium mb-1">Security</p>
            <p className="text-muted-foreground">
              Your Azure connection string is encrypted and stored securely. Only admin accounts can view or modify storage settings. All data transfers use HTTPS encryption.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Info */}
      <Card>
        <CardContent className="flex items-start gap-3 p-4">
          <AlertTriangle className="h-5 w-5 text-zonix-warning mt-0.5 shrink-0" />
          <div className="text-sm">
            <p className="font-medium mb-1">Important</p>
            <ul className="text-muted-foreground space-y-1 list-disc list-inside">
              <li>Ensure your Azure account has sufficient storage quota</li>
              <li>The container will store files organized by user ID</li>
              <li>Changing the storage account will not migrate existing files</li>
              <li>Azure storage costs are billed separately through your Azure subscription</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AzureStorageSettings;
