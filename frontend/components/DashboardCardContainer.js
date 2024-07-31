import React from 'react'
import DashboardCard from './DashboardCard'

export default function DashboardCardContainer() {
  return (
        <div className='flex gap-x-4 w-full-screen'>
            {
        [1,2,3,4].map((card)=>(
            <DashboardCard/>
        ))
    }
        </div>
  )
}
