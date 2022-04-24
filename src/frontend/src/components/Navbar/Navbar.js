import { Link } from 'react-router-dom';

import './Navbar.css'

function Navbar() {

    return (
      <>
        <div className="nav flex flex-col gap-y-6">
            <Link to="/" className="nav-item px-4 rounded-md transition">
                <h2  className="text-color-1">HOME</h2>
            </Link>
            <Link to="/add-disease" className="nav-item px-4 rounded-md transition">
                <h2 className="text-color-1">ADD</h2>
            </Link>
            <Link to="/test-dna" className="nav-item px-4 rounded-md transition">
                <h2 className="text-color-1">TEST</h2>
            </Link>
            <Link to="/test-result" className="nav-item px-4 rounded-md transition">
                <h2 className="text-color-1">RESULT</h2>
            </Link>
        </div>
      </>
    );
}
  
export default Navbar;
