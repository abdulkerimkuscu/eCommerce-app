import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Button } from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { isLogged } = useAuth();
  console.log(isLogged);
  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Link to="/">e-Commerce</Link>
        </div>
        <ul className={styles.menu}>
          <li>
            <Link to="/">Products</Link>
          </li>
        </ul>
      </div>
      <div className={styles.rigth}>
        {!isLogged && (
          <>
            <Link to="/signin">
              <Button colorScheme="green">Log In</Button>
            </Link>
            <Link to="/signup">
              <Button colorScheme="green">Register</Button>
            </Link>
          </>
        )}
        
        {isLogged && (
          <>
            <Link to="/profile">
              <Button >Profile</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
