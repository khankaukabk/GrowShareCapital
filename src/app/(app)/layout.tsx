'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from "@/components/ui/sidebar"
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import { Logo } from "@/components/logo";
import { Header } from "@/components/header";
import { ArrowRightLeft, Briefcase, BrainCircuit, LayoutDashboard, Newspaper, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { user } from "@/lib/data";


const navItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/portfolio', icon: Briefcase, label: 'Portfolio' },
    { href: '/trade', icon: ArrowRightLeft, label: 'Trade' },
    { href: '/news', icon: Newspaper, label: 'News' },
    { href: '/ai-advisor', icon: BrainCircuit, label: 'AI Advisor' },
];

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();

  const getPageTitle = () => {
    return navItems.find(item => pathname.startsWith(item.href))?.label || 'GrowShare';
  }

  return (
      <div className="flex min-h-screen w-full flex-col">
        <Sidebar>
            <SidebarHeader>
                <Logo />
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {navItems.map((item) => (
                        <SidebarMenuItem key={item.href}>
                            <Link href={item.href}>
                                <SidebarMenuButton 
                                    isActive={pathname.startsWith(item.href)}
                                    tooltip={item.label}
                                >
                                    <item.icon />
                                    <span>{item.label}</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
               <div className="flex items-center gap-3 rounded-md p-2 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                 <Avatar className="h-9 w-9">
                    <AvatarImage src={user.avatar.imageUrl} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="overflow-hidden">
                    <p className="truncate font-semibold">{user.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                </div>
               </div>
            </SidebarFooter>
        </Sidebar>
        <SidebarInset>
            <Header title={getPageTitle()} />
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
                {children}
            </main>
        </SidebarInset>
      </div>
  )
}
