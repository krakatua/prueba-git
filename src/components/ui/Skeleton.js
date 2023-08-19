import React from 'react'

function Skeleton() {
  return (
    <div className='bg-neutral-800 rounded-lg'>
        <div className='w-[320px] overflow-hidden lg:w-[700px] h-[50px] relative rounded-lg flex gap-1 shadow before:absolute
        before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/20
        hover:shadow-lg before:animate-[shimmer_1.5s_infinite]'>
            <div className='flex justify-center items-center pl-1'>

            <div className='w-[30px] h-[30px] bg-gray-600 rounded-full'/>
            </div>
            <div className='flex flex-col gap-1 p-1'>
            <div className='w-[400px] bg-gray-600 h-[30px] rounded-lg'/>
            <div className='flex gap-1'>

            <div className='w-[40px] h-[15px] rounded-lg bg-gray-600'/>
            <div className='w-[40px] h-[15px] rounded-lg bg-gray-600'/>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Skeleton