"use client"

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

function MasterList() {

  const categories = [
    { id: 1, name: 'Haarschnitt' },
    { id: 2, name: 'Maniküre' },
    { id: 3, name: 'Kosmetiker' },
    { id: 5, name: 'Epilation' },
    { id: 6, name: 'Tätowierung' },
    { id: 7, name: 'Piercing' }
  ];

  const [masterList, setMasterList] = useState([]);
  
  useEffect(() => {
    getMasterList();
  }, []);


  const getMasterList = async () => {
    try {
      const res = await fetch("/api/users/masters", {
        headers: { accept: "*/*" },
      });
      const arr = await res.json();
      console.log(arr);
      setMasterList(arr);
    } catch (error) {
      console.error("Error fetching masters:", error);
    }
  };

  function getCategoryNames(categoryIds) {
    return categoryIds.map(id => {
      const category = categories.find(category => category.id === id);
      return category ? category.name : null;
    }).filter(name => name != null).join(', '); 
  }

  

  return (


    <div className="mb-10 px-8">
      <h2 className="font-bold text-xl ">Beliebte Meister</h2>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
       lg:grid-cols-4 gap-7 mt-4" 
       >
        {masterList&&masterList.map((master, index)=>(
           <div className="border-[1px] rounded-lg p-3
               cursor-pointer hover:border-green-700 hover:shadow-sm 
               transition-all ease-in-out" key={index}> 
               
            <img src={master.profileImageUrl} width={500} height={400}
              className="h-[400px] w-full object-cover rounded-lg"
              />

      <div className="mt-3 items-baseline flex flex-col">
             <h2 className="text-[11px] bg-green-900 p-2 rounded-full px-2
              text-white ">{getCategoryNames(master.categoryIds)}</h2>
         <h2 className="font-bold">{master.firstName} {master.lastName}</h2>
         <h2 className="text-gray-500 text-sm">{master.address}</h2>
         <Link className="w-full" href={`/details/${master.id}`}>
         <h2
           className="p-2 px-3 border-[1px] border-green-700
         text-green-700 rounded-full w-full text-center m-2
         cursor-pointer hover:bg-green-700 hover:text-white">
           Booking Jetzt
         </h2>
         </Link>
       </div>
          </div>
          
        ))}
      </div>
    </div>

  );
}

export default MasterList;

