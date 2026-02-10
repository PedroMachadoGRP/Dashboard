/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Fragment, useState } from "react"
import { NavItems } from "@/config"
import { cn } from "@/libs/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ThemeToggle } from "../ui/ThemeToggle"

export default function SideBar() {
  const [isExpanded, setIsExpand] = useState(true)
  const navItem = NavItems()

  return (
    <div className="relative flex">
      <div
        className={cn(
          isExpanded ? "w-50" : "w-[68px]",
          `
          relative h-screen
          transition-all duration-300 ease-in-out
          border-r
          bg-white dark:bg-neutral-900
          border-neutral-200 dark:border-neutral-800
          `
        )}
      >
        <aside className="flex h-full flex-col w-full px-4">
          {/* TOP */}
          <div className="mt-4 pb-2">
            <div className="flex flex-col space-y-1">
              {navItem.map((item, index) =>
                item.position === "top" ? (
                  <Fragment key={index}>
                    <SideNavItem
                      label={item.name}
                      icon={item.icon}
                      path={item.href}
                      active={item.active}
                      isExpanded={isExpanded}
                    />
                  </Fragment>
                ) : null
              )}
            </div>
          </div>

          {/* BOTTOM */}
          <div className="mt-auto mb-4 space-y-2">
            {navItem.map((item, index) =>
              item.position === "bottom" ? (
                <Fragment key={index}>
                  <SideNavItem
                    label={item.name}
                    icon={item.icon}
                    path={item.href}
                    active={item.active}
                    isExpanded={isExpanded}
                  />
                </Fragment>
              ) : null
            )}

            <ThemeToggle isExpanded={isExpanded} />
          </div>
        </aside>

        {/* TOGGLE SIDEBAR */}
        <button
          type="button"
          onClick={() => setIsExpand(!isExpanded)}
          className="
            absolute top-1/2 -right-3 -translate-y-1/2
            flex h-6 w-6 items-center justify-center rounded-full
            border shadow-md transition
            bg-white dark:bg-neutral-800
            text-neutral-700 dark:text-neutral-200
            border-neutral-300 dark:border-neutral-700
            hover:shadow-lg 
          "
        >
          {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>
    </div>
  )
}

/* ---------------------------------- */
/* NAV ITEM */
/* ---------------------------------- */

export const SideNavItem: React.FC<{
  label: string
  icon: any
  path: string
  active: boolean
  isExpanded: boolean
}> = ({ label, icon, path, active, isExpanded }) => {
  const base =
    "relative flex items-center rounded-md transition-colors text-lm"

  const activeStyle =
    "bg-neutral-200 text-neutral-800 dark:bg-neutral-800 dark:text-white"

  const inactiveStyle =
    "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"

  return isExpanded ? (
    <Link
      href={path}
      className={cn(base, active ? activeStyle : inactiveStyle)}
    >
      <div className="flex items-center gap-2 px-2 py-1.5">
        {icon}
        <span>{label}</span>
      </div>
    </Link>
  ) : (
    <TooltipProvider delayDuration={70}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={path}
            className={cn(
              base,
              "justify-center p-2",
              active ? activeStyle : inactiveStyle
            )}
          >
            {icon}
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={10}>
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
