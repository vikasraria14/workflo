import React from 'react'

export default function DashboardCard({title,description,iconCode}) {
  return (
    <div class="mt-1 mx-3 flex gap-x-3">
    <div class="flex items-center justify-between rounded-xl bg-white py-1 px-2 shadow-sm">
      <div class="flex h-[60px] w-[100px] !items-center justify-center rounded-xl border border-blue-100 bg-blue-50">
        <img src={`${iconCode}.svg`} alt='a'/>
      </div>
      <div class="ml-3">
        <div class="text-[19px]">{title}</div>
        <p class="mt-1 text-sm text-gray-500">{description}</p>
      </div>
    </div>
    </div>

  )
}
