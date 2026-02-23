import React from "react";

export default function App() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.logo}>CasaPro AI</h1>
      </header>

      <section style={styles.hero}>
        <h2 style={styles.title}>
          Design Residencial Inteligente
        </h2>
        <p style={styles.subtitle}>
          Transforme sua casa com tecnologia e inteligência artificial.
        </p>
        <button style={styles.button}>
          Começar Projeto
        </button>
      </section>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    background: "#f4f6f8",
    minHeight: "100vh",
    margin: 0,
  },
  header: {
    padding: "20px 40px",
    background: "#111",
    color: "white",
  },
  logo: {
    margin: 0,
  },
  hero: {
    padding: "100px 40px",
    textAlign: "center" as const,
  },
  title: {
    fontSize: "40px",
    marginBottom: "20px",
  },
  subtitle: {
    fontSize: "18px",
    marginBottom: "30px",
    color: "#555",
  },
  button: {
    padding: "12px 28px",
    fontSize: "16px",
    background: "#111",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
