'use client'
import React from 'react'
import { getData } from './data';
import Link from 'next/link';
import './app.css';
export default async function page( { params }) {
  const id = params.id
  const data = await getData(id)

  return (
   <>
   
          <div className="container">
          <Link className='btn btn-info mt-3' href='/vdo'>Vdo</Link>
          </div>
         <div className="container text-center mt-5" >
         
         <div className="card mb-3 mt-5">
          <h2>{data[0].title}</h2>
             <iframe
             className="vdog mx-auto"
              width={1040}
              height={570}
           
            size='cover'
            src={`https://www.youtube.com/embed/${data[0].youtube}`}
            title={data[0].title}
            frameBorder="0"
            allow={data[0].title}
            allowFullScreen
          ></iframe>


  <div className="card-body">
  <h3>{data[0].headline}</h3>
    <p className="card-text">{data[0].content}</p>
   
  </div>
</div>
         

         </div>
   </>
  )
}
