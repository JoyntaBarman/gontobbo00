"use client"

import * as React from "react"
import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart, Settings,
    Settings2,
    SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        }
    ],
    navMain: [
        {
            title: "Configuration",
            url: "#",
            icon: Settings,
            isActive: true,
            items: [
                {
                    title: "Subject",
                    url: "/subject",
                },           
                     {
                    title: "Topic",
                    url: "/topic",
                },   
                             {
                    title: "Content Type",
                    url: "/content-type",
                },      
                      
                {
                    title: "Defficulty Level",
                    url: "/defficulty-level",
                },
                 {
                    title: "MCQ",
                    url: "/mcq",
                },                 {
                    title: "Status",
                    url: "/status",
                },
                                 {
                    title: "Role",
                    url: "/role",
                },

            ],
        }
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                {/*<NavProjects projects={data.projects} />*/}
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
