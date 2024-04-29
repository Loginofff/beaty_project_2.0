"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

function Search({ params }) {
  const [masters, setMasters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const categories = [
    { id: 1, name: "FRISEUR" },
    { id: 2, name: "NÄGEL" },
    { id: 3, name: "KOSMETIK" },
    { id: 5, name: "HAARENVERFUNG" },
    { id: 6, name: "MAKEUP" },
    { id: 7, name: "MASSAGE" },
  ];

  useEffect(() => {
    if (params.cname) {
      const decodedCategoryName = decodeURIComponent(params.cname);
      const category = categories.find(
        (cat) => cat.name === decodedCategoryName
      );
      if (category) {
        getMasters(category.id);
      }
    }
  }, [params.cname]);

  const getMasters = async (categoryId) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_PRODUCTION_SERVER +
          `/api/users/by-category/${categoryId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await response.json();
      console.log("Data received from server:", data);
      setMasters(data);
    } catch (error) {
      console.error("Error fetching masters:", error);
      setError("Failed to fetch masters");
    }
    setLoading(false);
  };

  const MasterCard = ({ master }) => {
    const categoryNames = master.categoryIds.map((categoryId) => {
      const category = categories.find((cat) => cat.id === categoryId);
      return category ? category.name : null;
    });

    return (
      <div className="border-[1px] rounded-lg p-3 cursor-pointer hover:border-green-700 hover:shadow-sm transition-all ease-in-out mt-5 master-card-container">
        <div className="flex items-center">
          <img
            src={master.profileImageUrl}
            alt="searchPhoto"
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              objectFit: "cover",
              marginRight: "10px",
            }}
          />
          <div className="ml-2">
          <p className="text-[15px] text-center bg-green-900 p-2 rounded-full mt-1 text-white">
              {categoryNames.join(", ")}
            </p>
            <h2 className="font-bold m-2">
              {master.firstName} {master.lastName}
            </h2>
            <h2 className="text-gray-500 text-sm mt-2">
              Address: {master.address}
            </h2>
            
          </div>
          <div className="ml-auto">
            <Link href={`/details/${master.id}`}>
              <button className="p-2 px-3 border-[1px] border-green-700 text-green-700 rounded-full text-center cursor-pointer hover:bg-green-700 hover:text-white">
                Booking Jetzt
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : masters.length > 0 ? (
        masters.map((master) => (
          <MasterCard key={master.id} master={master} />
        ))
      ) : (
        <p>No masters found in this category.</p>
      )}
    </div>
  );
}

export default Search;
