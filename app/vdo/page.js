"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Page() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const res = await fetch("https://api.service-ads.com/vdo");
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await res.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <>
      <div className="container">
        <Link href='/' className="btn btn-info h3" ><b>Home</b></Link>
        <div className="row row-cols-1 row-cols-md-2 g-3">
          {data && data.map(ads => (
            <div key={ads.id} className="col">
              <div className="card">
                <div className="card-body">
                  <iframe 
                    className="vdox"
                    width="100%"
                    height={280}
                    size='cover'
                    src={`https://www.youtube.com/embed/${ads.youtube}`}
                    title={ads.title}
                    frameBorder="0"
                    allow={ads.title}
                    allowFullScreen
                  ></iframe>
                  <br/>
                  <a href={`/vdo/${ads.id}`}>{ads.headline}</a>
                  {ads.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
