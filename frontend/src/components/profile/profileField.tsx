import React from 'react'
import { Input } from '../ui/input'

interface ProfileFieldProps {
    title:string
    info?:string
}

export default function ProfileField({title, info}:ProfileFieldProps) {
  return (
    <div className='flex flex-col bg-transparent text-xl rounded-lg   '>
        <label className='text-lg text-muted-foreground'>{title}</label>
        <Input className='text-neutral-700 dark:text-neutral-100' value={info ?? ""} placeholder={info} disabled></Input>
    </div>
  )
}
