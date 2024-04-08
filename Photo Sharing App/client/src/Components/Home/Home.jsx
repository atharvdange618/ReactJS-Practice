import React from 'react';

function Home() {
    return (
        <div className="bg-gray-100 h-screen flex justify-center items-center">
            <div className="max-w-lg p-8 bg-white shadow-md rounded-md">
                <h1 className="text-3xl font-semibold mb-4">Welcome to Our Social Media Platform</h1>
                <p className="text-lg mb-4">This is a small social media platform where users can share images and connect with friends.</p>
                <p className="text-lg mb-4">Features:</p>
                <ul className="list-disc pl-6 mb-4">
                    <li>Share images with your friends and followers</li>
                    <li>Discover new and trending content</li>
                    <li>Connect with friends and follow their updates</li>
                    <li>Customize your profile and preferences</li>
                </ul>
                <p className="text-lg">Sign up now to start sharing and connecting!</p>
            </div>
        </div>
    );
}

export default Home;