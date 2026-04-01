import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Check } from "lucide-react";
import { toast } from "sonner";

const StudentApply = () => {
  const [schoolEmail, setSchoolEmail] = useState("");
  const [step, setStep] = useState<"email" | "verify">("email");
  const [code, setCode] = useState("");

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Verification code sent to ${schoolEmail}`);
    setStep("verify");
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Student status verified! Your account has been upgraded.");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-20 max-w-md animate-fade-in">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Student Verification</CardTitle>
            <CardDescription>
              Verify your student status to get 50 GB free storage with AI features
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === "email" ? (
              <form onSubmit={handleSendCode} className="space-y-4">
                <div className="space-y-2">
                  <Label>School email address</Label>
                  <Input
                    type="email"
                    placeholder="your.name@university.edu"
                    value={schoolEmail}
                    onChange={(e) => setSchoolEmail(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter your official school email. We'll send a verification code.
                  </p>
                </div>
                <Button type="submit" className="w-full">Send verification code</Button>
              </form>
            ) : (
              <form onSubmit={handleVerify} className="space-y-4">
                <div className="space-y-2">
                  <Label>Verification code</Label>
                  <Input
                    placeholder="Enter 6-digit code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                    maxLength={6}
                  />
                  <p className="text-xs text-muted-foreground">
                    Code sent to {schoolEmail}
                  </p>
                </div>
                <Button type="submit" className="w-full gap-2">
                  <Check className="h-4 w-4" /> Verify & upgrade
                </Button>
                <Button type="button" variant="ghost" className="w-full text-sm" onClick={() => setStep("email")}>
                  Use a different email
                </Button>
              </form>
            )}

            <div className="mt-6 rounded-lg bg-muted p-4 space-y-2">
              <p className="text-sm font-medium">Student plan includes:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                {["50 GB storage", "20 GB upload limit", "Full AI assistant", "AI file organization"].map((perk) => (
                  <li key={perk} className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-primary" /> {perk}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentApply;
