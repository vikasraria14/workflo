import React from 'react'
import DashboardCard from './DashboardCard'

export default function DashboardCardContainer() {

 const content =   [
        {
          "title": "Introducing tags",
          "description": "Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient."
        },
        {
          "title": "Share Notes Instantly",
          "description": "Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options."
        },
        {
          "title": "Access Anywhere",
          "description": "Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer."
        }
      ]

      
  return (
        <div className='flex gap-x-4 w-full-screen'>
            {
        content.map((card)=>(
            <DashboardCard title={card.title} description={card.description}/>
        ))
    }
        </div>
  )
}
