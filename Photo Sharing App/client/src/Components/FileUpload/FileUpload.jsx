import React, { useState } from 'react'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const FileUpload = ({ username, showUploadModal, setShowUploadModal }) => { // Receive showUploadModal and setShowUploadModal from props

    const [images, setImages] = useState([]);
    const [fileCaption, setFileCaption] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleFileCaptionChange = (e) => {
        setFileCaption(e.target.value);
    };

    const handleFileSelection = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setSelectedFile(file);
            setPreviewImage(reader.result);
        };

        file && reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('fileCaption', fileCaption);
        formData.append('username', username);

        try {
            const response = await axios.post('http://localhost:3000/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            toast.success(response.data.message);

            const newImage = {
                id: images.length + 1,
                src: response.data.imageUrl,
                alt: `Uploaded by ${username}`,
                caption: fileCaption,
            };

            setImages([...images, newImage]);
            setSelectedFile(null);
            setFileCaption('');
            setPreviewImage(null);
            setShowUploadModal(false); // Call setShowUploadModal from props
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <Toaster />
            {showUploadModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-md">
                        <h2 className="text-lg font-semibold mb-4">Upload Image</h2>
                        <div className="mb-4">
                            <input
                                type="file"
                                name="file"
                                onChange={handleFileSelection}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        {previewImage && (
                            <div className="w-52 h-56 m-2 bg-slate-200 rounded-md">
                                <img className="w-full h-full rounded-md object-cover" src={previewImage} alt="Preview" />
                            </div>
                        )}
                        <input
                            type="text"
                            placeholder="Enter caption..."
                            className="border p-2 rounded-md w-full mt-2"
                            value={fileCaption}
                            onChange={handleFileCaptionChange}
                        />
                        <button className="bg-slate-400 w-24 p-1 rounded-md font-semibold mt-2" onClick={handleSubmit}>Upload</button>
                        <button className="bg-red-400 w-24 p-1 rounded-md font-semibold mt-2 ml-2" onClick={() => setShowUploadModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default FileUpload;
