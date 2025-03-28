import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'


interface StateCardProps{
   type:'appointments'| 'pending'|'cancelled'
   count:number
   label:string
   icon:string
}

const StatCard = ({count=0,label,icon,type}:StateCardProps) => {
  return (
    <div className={clsx('flex flex-1 flex-col gap-6 rounded-2xl bg-cover p-6 shadow-lg',{
      "bg-[url('/assets/images/appointments-bg.png')]":type==='appointments',
      "bg-[url('/assets/images/pending-bg.png')]":type==='pending',
      "bg-[url('/assets/images/cancelled-bg.png')]":type==='cancelled',
      
    })}>
      <div className="flex items-center gap-6">
         <Image 
            src={icon}
            height={32}
            width={32}
            alt={label}
            className='size-8 w-fit'
         />
         <h2 className='text-[32px] text-white'>{count}</h2>
      </div>
         <p className='text-[12px] font-medium'>{label}</p>
    </div>
  )
}

export default StatCard