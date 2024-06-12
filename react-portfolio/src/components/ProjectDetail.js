import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProjectDetail.css';

const ProjectDetail = ({ userName }) => {
    const [loading, setLoading] = useState(true);
    const [project, setProject] = useState(null);
    const [error, setError] = useState(null);
    const { name } = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    `https://api.github.com/repos/${userName}/${name}`
                );
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setProject(result);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        if (userName && name) {
            fetchData();
        }
    }, [userName, name]);

    return (
        <div className='Project-container'>
            <h2>Project: {project ? project.name : 'Loading...'}</h2>
            {loading && <span>Loading...</span>}
            {error && <span>Error: {error}</span>}
            {project && !loading && (
                <div>
                    <p><strong>Description:</strong> {project.description}</p>
                    <p><strong>Stars:</strong> {project.stargazers_count}</p>
                    <p><strong>Forks:</strong> {project.forks_count}</p>
                    <p><strong>Language:</strong> {project.language}</p>
                </div>
            )}
        </div>
    );
};

export default ProjectDetail;
