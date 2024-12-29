import { NavLink } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

// Create a context for authentication state


const Menu = () => {

  const { isAuthenticated } = useAuth();

  return (
    <div>
     
      {isAuthenticated ? null : <div><NavLink to="/">Login</NavLink></div>}
   
      {isAuthenticated ? (
        <>
          <div><NavLink to="/accounts">Accounts</NavLink></div>
          <div><NavLink to="/profile">Profile</NavLink></div>
        </>
      ) : null}
    </div>
  );
};

export default Menu;
