import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const MasterProfile = ({ user }) => {
  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [categories, setCategories] = useState([]);
  const [procedures, setProcedures] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [procedureIds, setProcedureIds] = useState([]);
  const [profileImage, setProfileImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [userData, setUserData] = useState(null);

  const handleAddPhoto = async () => {
    if (!imageUrl) {
      toast.error("Please enter an image URL.");
      return;
    }
  
    const data = {
      profileImageUrl: imageUrl, 
    };
  
    try {
      const response = await fetch(
        `/api/metadata/${user.user_id}/profileImages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
  
      if (response.ok) {
        console.log(data);
        toast.success(
          "Photo added successfully. It will be displayed in the profile."
        );
        setProfileImage(imageUrl); 
        setImageUrl(""); 
      } else {
        toast.error("An error occurred while adding photo.");
        console.log(data);
      }
    } catch (error) {
      console.log(data);
      console.error("Error adding photo:", error);
      toast.error("An error occurred while adding photo.");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/users/${user.user_id}`);
        if (response.ok) {
          const userData = await response.json();
          console.log("User data retrieved:", userData);
          setUserData(userData);
        } else {
          console.error("Failed to fetch user data:", response.status);
        }
        
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user]);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = async () => {
    if (!user || !user.user_id || isNaN(user.user_id)) {
      console.error("Invalid user_id");
      return;
    }

    const userDetails = {
      description,
      phoneNumber,
      address,
      categoryIds: categoryIds.map((id) => parseInt(id)),
      procedureIds: procedureIds.map((id) => parseInt(id)),
    };

    console.log("Data being sent to the server:", userDetails);

    try {
      const response = await fetch(`/api/users/${user.user_id}/details`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });

      if (response.ok) {
        toast("Information successfully saved on the server");
        console.log("Information successfully saved on the server");
      } else {
        toast("Error while saving information on the server");
        console.error("Error while saving information on the server");
      }
    } catch (error) {
      toast("Error while executing request");
      console.error("Error while executing request:", error);
    }

    setEditing(false);
  };

  useEffect(() => {
    if (userData) {
      setDescription(userData.description || "");
      setPhoneNumber(userData.phoneNumber || "");
      setAddress(userData.address || "");
      setCategoryIds(userData.categoryIds || []);
      setProcedureIds(userData.procedureIds || []);
      setProfileImage(userData.profileImageUrl || "");
    }
  }, [userData]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(`/api/categories`);
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          throw new Error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchProcedures() {
      if (userData && userData.procedureIds) {
        const promises = userData.procedureIds.map((id) =>
          fetch(`/api/procedures/${id}`).then((response) => response.json())
        );
        try {
          const results = await Promise.all(promises);
          setProcedures(results);
        } catch (error) {
          console.error("Error fetching procedures:", error);
        }
      }
    }

    fetchProcedures();
  }, [userData]);

  const getCategoryNames = (categoryIds) => {
    return categoryIds
      .map((id) => {
        const category = categories.find((category) => category.id === id);
        return category ? category.name : null;
      })
      .filter((name) => name != null)
      .join(", ");
  };

  const getProcedureNames = (procedureIds) => {
    return procedureIds
      .map((id) => {
        const procedure = procedures.find((procedure) => procedure.id === id);
        return procedure ? procedure.name : null;
      })
      .filter((name) => name != null)
      .join(", ");
  };

  return (
    <div className="bg-green-100 p-4 rounded-lg shadow-md m-5">
      <h2 className="text-green-700 text-2xl font-semibold mb-5">
        Master Profile
      </h2>

      {!editing ? (
        <>

        <div className="flex justify-between ">
  <div>
    <p className="text-green-900 mb-3">Name: {userData?.firstName}</p>
    <p className="text-green-900 mb-3">Last Name: {userData?.lastName}</p>
    <p className="text-green-900 mb-3">Email: {userData?.email}</p>
    <p className="text-green-900 mb-3">Phone Number: {phoneNumber}</p>
    <p className="text-green-900 mb-3">Address: {address}</p>
  </div>
  <div className="mr-6">
    {profileImage && (
      <img
        src={profileImage}
        alt="Profile"
        className="rounded-full w-40 h-40 mr-10"
      />
    )}
  </div>
</div>


         
          

          <p className="text-green-900 mb-3">
            Category: {getCategoryNames(categoryIds)}
          </p>
          <p className="text-green-900 mb-3">
            Procedure: {getProcedureNames(procedureIds)}
          </p>

          <p className="bg-green-300 p-4 rounded-lg shadow-md m-5">
            Description: {description}
          </p>

          <button
            onClick={handleEditClick}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Edit Profile
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block border border-gray-300 rounded-md p-2 mb-2"
            placeholder="Description"
          />
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="block border border-gray-300 rounded-md p-2 mb-2"
            placeholder="Phone Number"
          />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="block border border-gray-300 rounded-md p-2 mb-2"
            placeholder="Address"
          />
          <input
            type="text"
            value={categoryIds.join(",")}
            onChange={(e) => setCategoryIds(e.target.value.split(","))}
            className="block border border-gray-300 rounded-md p-2 mb-2"
            placeholder="Category IDs (comma separated)"
          />
          <input
            type="text"
            value={procedureIds.join(",")}
            onChange={(e) => setProcedureIds(e.target.value.split(","))}
            className="block border border-gray-300 rounded-md p-2 mb-2"
            placeholder="Procedure IDs (comma separated)"
          />

          <button
            onClick={handleSaveClick}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Save Changes
          </button>
          <button
            onClick={() => setEditing(false)}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </>
      )}
      <div className="mt-5">
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Enter image URL"
          className="block border border-gray-300 rounded-md p-2 mb-2"
        />
        <button
          onClick={handleAddPhoto}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Add Photo
        </button>
      </div>
    </div>
  );
};

export default MasterProfile;
