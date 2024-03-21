import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ImageGallery({ data }) {
    const [images, setImages] = useState([]);

    useEffect(() => {
        // Fetch images based on user role
        const fetchImages = async () => {
            try {
                let response;
                if (data.userType === 'admin') {
                    console.log(data.userType);
                    // Fetch all images for administrators
                    response = await axios.get('http://localhost:3000/images');
                } else if (data.username) {
                    console.log(data.username);
                    // Fetch images associated with the username for regular users
                    response = await axios.get(`http://localhost:3000/images/${data.username}`);
                } else {
                    console.log("no usertype or username specified");
                }
                console.log(response.data);
                setImages(response.data.images || []); // Ensure that images is always an array
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, [data]); // Include data in the dependency array

    return (
        <div className="image-gallery p-1 w-full h-auto mb-2">
            <h2 className="text-2xl font-bold mb-4 mt-3 px-2">Image Gallery</h2>
            <div className="grid grid-cols-2 gap-7 mr-4">
                {images.map((image, index) => (
                    <div key={index} className="relative rounded-lg">
                        <img className="object-contain w-80 h-ful rounded" src={image.url} alt={`Image ${index}`} />
                        <p className="absolute top-38 pb-1 left-0 right-0 font-semibold text-center pr-6">{image.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ImageGallery;