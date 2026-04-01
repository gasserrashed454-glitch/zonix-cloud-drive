import { SidebarProvider } from "@/components/ui/sidebar";
import DriveSidebar from "@/components/DriveSidebar";
import DriveHeader from "@/components/DriveHeader";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { File, FolderOpen, Image, FileText, MoreVertical, Upload, FolderPlus, Share2, Star, Trash2, Download } from "lucide-react";

const mockFiles = [
  { name: "Documents", type: "folder", modified: "Mar 15, 2026", size: "-", icon: FolderOpen },
  { name: "Photos", type: "folder", modified: "Mar 12, 2026", size: "-", icon: FolderOpen },
  { name: "Project Files", type: "folder", modified: "Mar 10, 2026", size: "-", icon: FolderOpen },
  { name: "Report Q1.pdf", type: "file", modified: "Mar 14, 2026", size: "2.4 MB", icon: FileText },
  { name: "Presentation.pptx", type: "file", modified: "Mar 13, 2026", size: "8.1 MB", icon: File },
  { name: "Budget.xlsx", type: "file", modified: "Mar 11, 2026", size: "156 KB", icon: FileText },
  { name: "vacation.jpg", type: "file", modified: "Mar 9, 2026", size: "4.2 MB", icon: Image },
  { name: "meeting-notes.docx", type: "file", modified: "Mar 8, 2026", size: "89 KB", icon: FileText },
];

const Drive = () => (
  <SidebarProvider>
    <div className="min-h-screen flex w-full">
      <DriveSidebar />
      <div className="flex-1 flex flex-col">
        <DriveHeader />
        <main className="flex-1 p-6">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-semibold">My files</h1>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Upload className="h-3.5 w-3.5" /> Upload
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5">
                <FolderPlus className="h-3.5 w-3.5" /> New folder
              </Button>
            </div>
          </div>

          {/* File list - OneDrive style table */}
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/40 text-xs text-muted-foreground">
                  <th className="text-left font-medium px-4 py-2.5">Name</th>
                  <th className="text-left font-medium px-4 py-2.5 hidden sm:table-cell">Modified</th>
                  <th className="text-left font-medium px-4 py-2.5 hidden md:table-cell">Size</th>
                  <th className="w-10 px-2"></th>
                </tr>
              </thead>
              <tbody>
                {mockFiles.map((file) => (
                  <tr key={file.name} className="border-b last:border-0 hover:bg-accent/40 cursor-pointer transition-colors">
                    <td className="px-4 py-2.5 flex items-center gap-3">
                      <file.icon className={`h-5 w-5 shrink-0 ${file.type === "folder" ? "text-zonix-warning" : "text-primary"}`} />
                      <span className="text-sm font-medium truncate">{file.name}</span>
                    </td>
                    <td className="px-4 py-2.5 text-sm text-muted-foreground hidden sm:table-cell">{file.modified}</td>
                    <td className="px-4 py-2.5 text-sm text-muted-foreground hidden md:table-cell">{file.size}</td>
                    <td className="px-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem><Share2 className="mr-2 h-4 w-4" />Share</DropdownMenuItem>
                          <DropdownMenuItem><Download className="mr-2 h-4 w-4" />Download</DropdownMenuItem>
                          <DropdownMenuItem><Star className="mr-2 h-4 w-4" />Star</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  </SidebarProvider>
);

export default Drive;
