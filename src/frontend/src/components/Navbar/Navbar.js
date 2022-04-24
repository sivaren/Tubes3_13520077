import './Navbar.css'
// import { Link } from 'react-router-dom'

function Navbar() {

    return (
      <div className="nav flex flex-col gap-y-6">
        <div className="nav-item px-4 rounded-md transition">
            <h2>HOME</h2>
        </div>
        <div className="nav-item px-4 rounded-md transition">
            <h2>ADD</h2>
        </div>
        <div className="nav-item px-4 rounded-md transition">
            <h2>TEST</h2>
        </div>
        <div className="nav-item px-4 rounded-md transition">
            <h2>RESULT</h2>
        </div>
      </div>
    );
}
  
export default Navbar;
