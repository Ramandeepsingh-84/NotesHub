// Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>
        © {new Date().getFullYear()} Ramandeep Singh - Developer. All rights reserved.
      </p>
    </footer>
  );
};

const styles = {
  footer: {
    background: "linear-gradient(to right, #4b6cb7, #182848)",
    color: "#fff",
    textAlign: "center",
    padding: "1rem 0",
    position: "relative",
    bottom: 0,
    width: "100%",
    fontFamily: "Arial, sans-serif",
  },
  text: {
    margin: 0,
    fontSize: "1rem",
  },
};

export default Footer;
