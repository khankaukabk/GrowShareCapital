import {
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { UserNav } from "./user-nav";
import { Logo } from "./logo";


export function Header() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6 fixed top-0 right-0 left-0 z-20 md:left-[var(--sidebar-width-icon)] lg:left-[var(--sidebar-width)] group-data-[collapsible=icon]:lg:left-[var(--sidebar-width-icon)] transition-[left] duration-200">
      <SidebarTrigger className="shrink-0 md:hidden" />
      <div className="w-full flex-1">
        <Logo />
      </div>
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search assets..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>
      <UserNav />
    </header>
  );
}
