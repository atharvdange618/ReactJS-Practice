import ReactDOM from 'react-dom/client';
import List from './components/List';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <div>
            <nav className='navbar sticky-top navbar-dark bg-dark'>
                <h1 className='navbar-brand text-light mx-2 px-2'>Rick and Morty</h1>
            </nav>
            <List />
        </div>
    );
}

const container = document.getElementById('root');

const root = ReactDOM.createRoot(container);

root.render(<App />);   