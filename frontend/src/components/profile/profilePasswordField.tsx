import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Eye, EyeOff } from 'lucide-react'

interface ProfilePasswordFieldProps {
  title: string
  info?: string

}

export default function ProfilePasswordField({ title, info }: ProfilePasswordFieldProps) {
  
  return (
    <div className="flex flex-col w-full gap-1">


      {/* Label */}
      <label className="text-sm md:text-base text-muted-foreground">
        {title}
      </label>

      {/* Campo */}
      <div className="relative">
        <Input
          value={info ?? "********"}
          disabled
          className="
            w-full
            pr-10
            text-sm md:text-base
            text-neutral-700 dark:text-neutral-100
          "
        />
      </div>

    </div>
  )
}
