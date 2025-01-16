"use client"
import React from "react";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const ProfileUpload = () => {
    const { data: session, status } = useSession();
    useEffect(() => {
        handleSubmit()
    }, [])
    const [image, setImage] = useState(session?.user?.image);
    const [loading, setLoading] = useState(false);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result); // Saving the uploaded image in state
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        if (!image) return;

        setLoading(true);

        const formData = new FormData();
        formData.append('image', image); // Attach image to form data

        try {
            // Replace with your backend URL
            const response = await axios.post('/upload-profile-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Image uploaded successfully:', response.data);
        } catch (error) {
            console.error('Error uploading image:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="px-24">

            {image ? (
                <div>
                    <img
                        src={image}
                        alt="Profile Preview"
                        className="w-24 h-24 rounded-full mt-2"
                    />
                    {/* <button onClick={handleSubmit} disabled={loading}>
                        {loading ? 'Uploading...' : 'Upload Image'}
                    </button> */}
                </div>
            ) : <div>
                <img
                    src={"user.png"}
                    alt="Profile Preview"
                    className="w-24 h-24 rounded-full mt-2"
                />
            </div>}
            {/* <input
                id="Image"
                type="file"
                style={{ display: 'none' }} // Hide the file input
                accept="image/*"
                onChange={handleImageUpload}
                className=""
            />
            {/* Custom Upload Button (only show if no image is selected) */}
           {/** {!image && (
                <label
                    htmlFor="Image"
                    className="font-sans font-medium text-[15px] text-blue block justify-center items-center text-center w-24 bg-[#ea002a] px-[4px] py-3 rounded my-2 cursor-pointer"
                >
                    {image ? "Change Image" : "UPLOAD"} {/* Show "Change Image" text after image upload */}
                {/* </label> */}
            {/* )}  */}

        </div>
    );
};

export default ProfileUpload;




