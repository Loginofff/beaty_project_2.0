import React, { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { FaPhone } from "react-icons/fa";
import BookAppointment from "./BookAppointment";
import { MdEmail } from "react-icons/md";

function MasterDetails({ master }) {
  const [selectedProcedureId, setSelectedProcedureId] = useState(null);

  const handleProcedureSelection = (procedureId) => {
    setSelectedProcedureId(procedureId);
  };

  const [procedures, setProcedures] = useState([]);

  useEffect(() => {
    async function fetchProcedures() {
      const promises = master.procedureIds.map((id) =>
        fetch(
          process.env.NEXT_PUBLIC_PRODUCTION_SERVER + `/api/procedures/${id}`
        ).then((response) => response.json())
      );
      const results = await Promise.all(promises);
      setProcedures(results);
    }

    if (master && master.procedureIds) {
      fetchProcedures();
    }
  }, [master]);

  const categories = [
    { id: 1, name: "FRISEUR" },
    { id: 2, name: "NÄGEL" },
    { id: 3, name: "KOSMETIK" },
    { id: 5, name: "HAARENVERFUNG" },
    { id: 6, name: "MAKEUP" },
    { id: 7, name: "MASSAGE" },
  ];

  function getCategoryNames(categoryIds, categories) {
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
          <div className="md:col-span-1">
            <img
              src={master.profileImageUrl}
              width={400}
              height={500}
              className="rounded-lg h-[500px] w-[400px] object-cover"
            />
          </div>
          <div className="md:col-span-1 md:col-start-2 mt-5 flex flex-col items-center gap-2">
            {master && master.categoryIds && (
              <h2 className="mt-2 text-[15px] bg-green-700 p-3 rounded-full px-2 text-white">
                {getCategoryNames(master.categoryIds, categories)}
              </h2>
            )}
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
            <BookAppointment masterId={master.id} selectedProcedureId={selectedProcedureId} />
          </div>
          <div className="md:col-span-1 mt-5  md:mt-0 md:col-start-3 flex flex-col">
            <div className=" font-bold text-black border p-2 mt-2 rounded-lg w-full">
              {master.description}
            </div>
            <div className="mt-5">
              {procedures.map((procedure) => (
                <div
                  key={procedure.id}
                  className={`bg-green-700 text-white p-2 mt-2 rounded-lg ml-10 ${
                    selectedProcedureId === procedure.id ? "bg-blue-500" : ""
                  }`}
                >
                  <button
                    className={`hover:bg-green-600 hover:text-white cursor-pointer ${
                      selectedProcedureId === procedure.id
                        ? "bg-green-600 text-white rounded-lg p-1"
                        : ""
                    }`}
                    onClick={() => handleProcedureSelection(procedure.id)}
                  >
                    {procedure.name} - {procedure.price} EUR
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MasterDetails;
