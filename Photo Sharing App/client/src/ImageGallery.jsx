import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ImageGallery() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        // Fetch images from the backend
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:3000/images');
                // console.log(response.data);
                setImages(response.data.images || []); // Ensure that images is always an array
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    return (
        <div className="image-gallery p-1 w-full h-auto mb-2">
            <h2 className="text-2xl font-bold mb-4 mt-3 px-2">Image Gallery</h2>
            <div className="grid grid-cols-2 gap-4 mr-4">
                {images.map((image, index) => (
                    <div key={index} className="relative rounded-lg">
                        <img className="object-contain w-80 h-ful rounded" src={image.url} alt={`Image ${index}`} />
                        <p className="absolute bottom-0 pb-1 left-0 right-0 bg-white bg-opacity-70 text-center pr-6">{image.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ImageGallery;