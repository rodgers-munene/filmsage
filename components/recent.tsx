import React from 'react'


type Recentprops = {
    recentList: string[]
}

const Recent = ( { recentList }: Recentprops ) => {
  return (
    <div className='flex flex-col gap-1 w-80 min-h-[30rem] rounded-xl bg-gray-200'>
      <h1 className='font-semibold text-2xl text-center'>Recently Viewed</h1>
      <div>
        {recentList.length === 0 ? (
            <div className='mt-5'>
                <p className='text-gray-700 dark:text-gray-100 text-center font-semibold'>Nothing here yet-explore to add shows.</p>
            </div>
        ): 
        (
            <div>
                {recentList}
            </div>
        )}
      </div>

    </div>
  )
}

export default Recent