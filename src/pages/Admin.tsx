import { SidebarProvider } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Activity, HardDrive, Shield, Globe, Settings } from "lucide-react";
import AzureStorageSettings from "@/components/AzureStorageSettings";
import DriveSidebar from "@/components/DriveSidebar";
import DriveHeader from "@/components/DriveHeader";

const mockUsers = [
  { name: "Alice Johnson", email: "alice@school.edu", tier: "Student", role: "user", storage: "12.4 GB", status: "active" },
  { name: "Bob Smith", email: "bob@gmail.com", tier: "Premium", role: "moderator", storage: "45.1 GB", status: "active" },
  { name: "Carol Davis", email: "carol@company.com", tier: "Free", role: "user", storage: "2.1 GB", status: "active" },
  { name: "Dave Wilson", email: "dave@outlook.com", tier: "Free", role: "user", storage: "0.8 GB", status: "suspended" },
];

const Admin = () => (
  <SidebarProvider>
    <div className="min-h-screen flex w-full">
      <DriveSidebar />
      <div className="flex-1 flex flex-col">
        <DriveHeader />
        <main className="flex-1 p-6 overflow-auto">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">Admin Panel</h1>
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-4 mb-6">
            {[
              { label: "Total Users", value: "1,284", icon: Users },
              { label: "Active Now", value: "42", icon: Activity },
              { label: "Storage Used", value: "2.4 TB", icon: HardDrive },
              { label: "Open Tickets", value: "12", icon: Globe },
            ].map((s) => (
              <Card key={s.label}>
                <CardContent className="flex items-center gap-3 p-4">
                  <s.icon className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="users">
            <TabsList>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="network">Network</TabsTrigger>
              <TabsTrigger value="tickets">Tickets</TabsTrigger>
              <TabsTrigger value="azure">Azure Storage</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">User Management</CardTitle>
                  <CardDescription>View and manage user accounts, tiers, and roles</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg overflow-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/40">
                          <th className="text-left font-medium px-4 py-2.5">User</th>
                          <th className="text-left font-medium px-4 py-2.5">Tier</th>
                          <th className="text-left font-medium px-4 py-2.5">Role</th>
                          <th className="text-left font-medium px-4 py-2.5">Storage</th>
                          <th className="text-left font-medium px-4 py-2.5">Status</th>
                          <th className="px-4 py-2.5">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockUsers.map((u) => (
                          <tr key={u.email} className="border-b last:border-0 hover:bg-accent/40">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-7 w-7">
                                  <AvatarFallback className="text-xs">{u.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-sm">{u.name}</p>
                                  <p className="text-xs text-muted-foreground">{u.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <Select defaultValue={u.tier.toLowerCase()}>
                                <SelectTrigger className="h-7 w-24 text-xs"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="free">Free</SelectItem>
                                  <SelectItem value="student">Student</SelectItem>
                                  <SelectItem value="premium">Premium</SelectItem>
                                </SelectContent>
                              </Select>
                            </td>
                            <td className="px-4 py-3">
                              <Select defaultValue={u.role}>
                                <SelectTrigger className="h-7 w-28 text-xs"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="user">User</SelectItem>
                                  <SelectItem value="moderator">Moderator</SelectItem>
                                  <SelectItem value="support">Support</SelectItem>
                                  <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                              </Select>
                            </td>
                            <td className="px-4 py-3 text-muted-foreground">{u.storage}</td>
                            <td className="px-4 py-3">
                              <Badge variant={u.status === "active" ? "default" : "destructive"} className="text-xs">
                                {u.status}
                              </Badge>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <Button variant="ghost" size="sm" className="text-xs">View</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="network" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Network Monitoring</CardTitle>
                  <CardDescription>Monitor user activity, location changes, and login events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <Activity className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>Network monitoring dashboard will show real-time activity data</p>
                    <p className="text-sm">Login events, IP addresses, location changes</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tickets" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Support Tickets</CardTitle>
                  <CardDescription>Manage and respond to user support requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <Settings className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>Ticket management system for support team</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="azure" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Link2 className="h-5 w-5" /> Azure Storage Integration
                  </CardTitle>
                  <CardDescription>Connect your Azure Blob Storage account to store all user data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Azure Storage Account Name</Label>
                    <Input placeholder="mystorageaccount" />
                  </div>
                  <div className="space-y-2">
                    <Label>Connection String</Label>
                    <Input type="password" placeholder="DefaultEndpointsProtocol=https;AccountName=…" />
                  </div>
                  <div className="space-y-2">
                    <Label>Container Name</Label>
                    <Input placeholder="zonix-cloud-files" />
                  </div>
                  <Button>Connect Azure Storage</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  </SidebarProvider>
);

export default Admin;
