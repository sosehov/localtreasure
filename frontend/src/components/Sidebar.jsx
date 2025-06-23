import React from 'react'
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconMap,
  IconCalendarWeek,
  IconMessages,
  IconUserCircle
} from "@tabler/icons-react";
import { useState } from 'react'

const SidebarComponent = ({}) => {

     const links = [
    {
      label: "Messages",
      href: "/messages",
      icon: (
        <IconMessages className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Calendar",
      href: "/events",
      icon: (
        <IconCalendarWeek className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Map",
      href: "/map",
      icon: (
        <IconMap className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Edit Profile",
      href: "#",
      icon: (
        <IconUserCircle className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);


    return (
  <div className="flex min-h-screen flex-row">
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
                        label: "messages",
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

      </div>
    )
}

export default SidebarComponent;