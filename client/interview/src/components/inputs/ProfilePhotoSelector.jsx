import React, { useRef, useState, useContext, useEffect } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";
import axiosInstance from "../utills/axios";
import { UserContext } from "../context/UserContext";

const ProfilePhotoSelector = () => {
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
      setImage(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  // Upload image automatically when it's selected
  useEffect(() => {
    const uploadImage = async () => {
      if (!image || !user?.token) return;

      const formData = new FormData();
      formData.append("image", image);

      try {
        setUploading(true);

        const response = await axiosInstance.post(
          "/api/users/upload-profile",
          formData,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Update user context with new image
        setUser(response.data.user);
        alert("Profile image updated!");
        setImage(null);
        setPreviewUrl(null);
      } catch (error) {
        console.error("Upload failed:", error);
        alert("Failed to upload image.");
      } finally {
        setUploading(false);
      }
    };

    uploadImage();
  }, [image]);

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!previewUrl && !user?.profileImage ? (
        <div className="w-20 h-20 flex items-center justify-center bg-orange-50 rounded-full relative cursor-pointer">
          <LuUser className="text-4xl text-orange-500" />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-orange-500 text-white rounded-full absolute -bottom-1 -right-1"
            onClick={onChooseFile}
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewUrl || user?.profileImage}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-orange-500 text-white rounded-full absolute -bottom-1 -right-1"
            onClick={handleRemoveImage}
            disabled={uploading}
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
