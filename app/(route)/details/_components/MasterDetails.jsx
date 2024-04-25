import React, { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { FaPhone } from "react-icons/fa";
import BookAppointment from "./BookAppointment";
import { MdEmail } from "react-icons/md";

function MasterDetails({ master }) {
  const [procedures, setProcedures] = useState([]);

  useEffect(() => {
    async function fetchProcedures() {
      const promises = master.procedureIds.map((id) =>
        fetch(`/api/procedures/${id}`).then((response) => response.json())
      );
      const results = await Promise.all(promises);
      setProcedures(results);
    }

    if (master && master.procedureIds) {
      fetchProcedures();
    }
  }, [master]);

  const categories = [
    { id: 1, name: "Haarschnitt" },
    { id: 2, name: "Maniküre" },
    { id: 3, name: "Kosmetiker" },
    { id: 5, name: "Epilation" },
    { id: 6, name: "Tätowierung" },
    { id: 7, name: "Piercing" },
  ];

  function getCategoryNames(categoryIds) {
    return categoryIds
      .map((id) => {
        const category = categories.find((category) => category.id === id);
        return category ? category.name : null;
      })
      .filter((name) => name != null)
      .join(", ");
  }

  return (
    <>
      {master && (
        <div className="grid grid-cols-1 md:grid-cols-3 border-[1px] p-5 mt-5 rounded-lg">
          <div>
            <img
              src={master.profileImageUrl}
              width={400}
              height={300}
              className="rounded-lg h-[300px] w-[400px] object-cover"
            />
          </div>
          <div className="col-span-2 mt-5 flex flex-col items-center gap-2">
            <h2 className="mt-2 text-[15px] bg-green-700 p-3 rounded-full px-2 text-white">
              {getCategoryNames(master.categoryIds)}
            </h2>
            <h2 className="font-bold">
              {master.firstName} {master.lastName}
            </h2>
            <h2 className="text-green-800 text-md flex items-center">
              <MdEmail className="mr-1" />
              {master.email}
            </h2>
            <h2 className="text-md flex gap-2 text-green-800 items-center">
              <MapPin />
              {master.address}
            </h2>
            <h2 className="text-md flex gap-2 text-green-800 items-center">
              <FaPhone />
              {master.phoneNumber}
            </h2>
            {procedures.map((procedure) => (
              <div
                key={procedure.id}
                className="bg-green-700 text-white p-2 mt-2 rounded-lg"
              >
                {procedure.name} - {procedure.price} EUR
              </div>
            ))}
            <BookAppointment />
          </div>
        </div>
      )}
    </>
  );
}

export default MasterDetails;

