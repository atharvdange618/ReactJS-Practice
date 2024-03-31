import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ImageGallery({ data }) {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchImages = async () => {
            setLoading(true);
            setError('');

            try {
                let response;

                if (data.userType === 'admin') {
                    response = await axios.get('http://localhost:3000/images');
                } else if (data.username) {
                    response = await axios.get(`http://localhost:3000/images/${data.username}`);
                } else {
                    setError('No userType or username specified');
                }

                setImages(response?.data?.images || []);
            } catch (error) {
                setError('Error fetching images');
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, [data]);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="image-gallery p-1 w-full h-auto mb-2">
            <h2 className="text-2xl font-bold mb-4 mt-3 px-2">Image Gallery</h2>
            <div className="grid grid-cols-2 gap-7 mr-4">
                {images.map((image, index) => (
                    <div key={index} className="relative rounded-lg">
                        <img
                            className="object-contain w-80 h-full rounded"
                            src={image.url}
                            alt={`Image ${index}`}
                            onError={(e) => {
                                e.target.src = 'path/to/placeholder-image.jpg'; // Replace with your placeholder image path
                            }}
                        />
                        <p className="absolute top-38 pb-1 left-0 right-0 font-semibold text-center pr-6">{image.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ImageGallery;
