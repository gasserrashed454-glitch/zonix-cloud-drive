import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Clock, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const mockTickets = [
  { id: "ZC-1024", subject: "Cannot upload large files", status: "open", created: "Mar 14, 2026" },
  { id: "ZC-1018", subject: "Storage not updating", status: "in-progress", created: "Mar 10, 2026" },
  { id: "ZC-1005", subject: "Sharing permission issue", status: "resolved", created: "Mar 5, 2026" },
];

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
  open: { label: "Open", variant: "default" },
  "in-progress": { label: "In Progress", variant: "secondary" },
  resolved: { label: "Resolved", variant: "outline" },
};

const Support = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Support ticket created! We'll get back to you soon.");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-12 max-w-4xl animate-fade-in">
        <h1 className="text-3xl font-bold mb-2">Support</h1>
        <p className="text-muted-foreground mb-8">Get help from the Zonix Cloud team</p>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* New ticket */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" /> New Ticket
              </CardTitle>
              <CardDescription>Describe your issue and we'll respond within 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="billing">Billing</SelectItem>
                      <SelectItem value="storage">Storage</SelectItem>
                      <SelectItem value="account">Account</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Brief description" required />
                </div>
                <div className="space-y-2">
                  <Label>Message</Label>
                  <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Describe your issue in detail…" rows={4} required />
                </div>
                <Button type="submit" className="w-full">Submit ticket</Button>
              </form>
            </CardContent>
          </Card>

          {/* Existing tickets */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" /> Your Tickets
              </CardTitle>
              <CardDescription>Track your support requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockTickets.map((ticket) => (
                  <div key={ticket.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/40 cursor-pointer transition-colors">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground font-mono">{ticket.id}</span>
                        <Badge variant={statusConfig[ticket.status].variant} className="text-xs">
                          {statusConfig[ticket.status].label}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium mt-0.5">{ticket.subject}</p>
                      <p className="text-xs text-muted-foreground">{ticket.created}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Support;
