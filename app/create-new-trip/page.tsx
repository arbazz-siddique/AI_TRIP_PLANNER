import React from 'react'
import ChatBox from './_components/ChatBox'
import Iternerary from './_components/Iternerary'

const CreateNewTrip = () => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 gap-5 p-10'>
        <div>
            <ChatBox/>
        </div>
        <div className='col-span-2'>
           <Iternerary/>
        </div>
    </div>
  )
}

export default CreateNewTrip