'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import { Header } from "@/components/header";
import { 
    ArrowRightLeft, Briefcase, BrainCircuit, Building, LandPlot, LayoutDashboard, 
    Newspaper, Settings, Sprout, Stethoscope 
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { user } from "@/lib/data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const navItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/portfolio', icon: Briefcase, label: 'Portfolio' },
    { href: '/trade', icon: ArrowRightLeft, label: 'Trade' },
    { href: '/news', icon: Newspaper, label: 'News' },
    { href: '/ai-advisor', icon: BrainCircuit, label: 'AI Advisor' },
];

const sectorNavItems = {
  icon: Building,
  label: 'Sectors',
  basePath: '/sectors',
  items: [
      { href: '/sectors/real-estate', label: 'Real Estate', icon: LandPlot },
      { href: '/sectors/agriculture', label: 'Agriculture', icon: Sprout },
      { href: '/sectors/healthcare', label: 'Healthcare', icon: Stethoscope },
  ]
};

const footerNavItems = [
    { href: '/settings', icon: Settings, label: 'Settings' },
];

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();

  return (
      <div className="flex min-h-screen w-full flex-col">
        <Sidebar>
            <SidebarContent className="mt-14">
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
                    <SidebarMenuItem>
                        <Accordion type="single" collapsible className="w-full" defaultValue={pathname.startsWith(sectorNavItems.basePath) ? "sectors" : undefined}>
                            <AccordionItem value="sectors" className="border-none">
                                <AccordionTrigger
                                    className={cn(
                                        "flex w-full items-center justify-between gap-2 rounded-md p-2 text-left text-sm font-normal text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:no-underline",
                                        pathname.startsWith(sectorNavItems.basePath) && "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                                    )}
                                >
                                    <div className="flex items-center gap-2">
                                        <sectorNavItems.icon className="h-4 w-4 shrink-0" />
                                        <span>{sectorNavItems.label}</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pt-1 pl-7">
                                    <SidebarMenu className="gap-0">
                                        {sectorNavItems.items.map((item) => (
                                            <SidebarMenuItem key={item.href}>
                                                <Link href={item.href}>
                                                    <SidebarMenuButton 
                                                        isActive={pathname.startsWith(item.href)}
                                                        tooltip={item.label}
                                                        className="h-9 justify-start w-full"
                                                    >
                                                        <item.icon className="h-3.5 w-3.5" />
                                                        <span>{item.label}</span>
                                                    </SidebarMenuButton>
                                                </Link>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    {footerNavItems.map((item) => (
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
               <SidebarSeparator />
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
            <Header />
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
                {children}
            </main>
            <footer className="border-t bg-card p-4 text-center text-xs text-muted-foreground">
                &copy; {new Date().getFullYear()} GrowShare Capital. All Rights Reserved.
            </footer>
        </SidebarInset>
      </div>
  )
}
