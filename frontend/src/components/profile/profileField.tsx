import React from 'react'
import { Input } from '../ui/input'

interface ProfileFieldProps {
    title:string
    info?:string
}

export default function ProfileField({title, info}:ProfileFieldProps) {
  return (
<div className="flex flex-col w-full gap-1">

      {/* Label */}
      <label className="text-sm md:text-base text-muted-foreground">
        {title}
      </label>

      {/* Campo */}
      <Input
        value={info ?? ""}
        placeholder="—"
        disabled
        className="
          w-full
          text-sm md:text-base
          text-neutral-700 dark:text-neutral-100
          truncate
        "
      />

    </div>
  )
}
