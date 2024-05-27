import ReactDOM from 'react-dom/client';
import React from 'react'; // Ensure React is imported

function App() {
    return <h1>Rick and Morty</h1>;
}

const container = document.getElementById('root');

if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(<App />);
} else {
    console.error('Failed to find the root element.');
}
