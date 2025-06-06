import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconSettings,
  IconUserBolt,
  IconList
} from "@tabler/icons-react";


function App() {
   
  const links = [
    {
      label: "Listings",
      href: "#",
      icon: (
        <IconList className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-row">
        {/* Sidebar */}
          <Sidebar open={open} setOpen={setOpen} animate={true} >
                <SidebarBody className="justify-between gap-10 min-h-screen">
                  <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
                   
                    <div className="mt-8 flex flex-col gap-2">
                      {links.map((link, idx) => (
                        <SidebarLink key={idx} link={link} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <SidebarLink
                      link={{
                        label: "Profile",
                        href: "#",
                        icon: (
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png"
                            className="h-7 w-7 shrink-0 rounded-full"
                            width={50}
                            height={50}
                            alt="Avatar" />
                        ),
                      }} />
                  </div>
                </SidebarBody>
              </Sidebar>
        {/* End Sidebar */}

        {/* Add all other UI components here */}
             <p>tester</p>
      </div>
  )
}

export default App
