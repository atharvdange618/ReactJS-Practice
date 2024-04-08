import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function ImageGallery({ username }) {
    const [images, setImages] = useState([]);
    const fetchImages = async (endpoint) => {
        try {
            const response = await axios.get(endpoint);
            setImages(response.data.images.map((image, index) => ({
                id: index + 1,
                src: image.url,
                alt: image.text,
                caption: image.text,
                user: image.user
            })));
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchImages('http://localhost:3000/images');
    }, []);

    return (
        <div>
            <hr className='m-2 font-bold h-0.5 bg-black' />
            <button className="bg-slate-400 w-20 p-1 rounded-md font-semibold mt-1 mr-1 ml-1" onClick={() => fetchImages('http://localhost:3000/images')}>Public</button>
            <button className="bg-slate-400 w-20 p-1 rounded-md font-semibold mt-1 mb-4" onClick={() => fetchImages(`http://localhost:3000/images/${username}`)}>Private</button>
            <div className="mt-1">
                <div className="flex flex-wrap justify-around items-start mb-12 md:ml-6">
                    {images.map((image) => (
                        <div key={image.id} className="flex flex-col items-center">
                            <div className="w-52 h-56 m-2 bg-slate-200 rounded-md relative">
                                <img className="w-full h-full rounded-md object-cover" src={image.src} alt={image.alt} />
                            </div>
                            <h3 className="mt-2 px-2 py-1 font-semibold text-[16px]">{image.caption}</h3>
                            <p className="px-2 py-1 text-[14px] text-gray-500">Posted by: {image.user}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ImageGallery;
