import React from 'react'
import Message from './components/Message'
import Form from './components/Form'

const Page = ( { params } : {
    params: {
        id: string
    }
} ) => {


  return (
    <div>
        <Message id={params.id}/>
        <Form id={params.id}/>
    </div>
  )
}

export default Page