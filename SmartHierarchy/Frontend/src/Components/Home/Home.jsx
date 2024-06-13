import React, { useEffect } from 'react';

const Home = () => {

    useEffect(() => {
        const feat = fetch("/api")
        console.log("fetch request sent")
    }, [])


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">Home</h1>
            <p>Welcome to the homepage!</p>
        </div>
    );
};

export default Home;
