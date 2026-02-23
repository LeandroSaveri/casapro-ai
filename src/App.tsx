import React from "react";

export default function App() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.logo}>CasaPro AI</h1>
      </header>

      <section style={styles.hero}>
        <h2 style={styles.title}>
          Transforme sua casa com Inteligência Artificial
        </h2>
        <p style={styles.subtitle}>
          Crie projetos residenciais modernos, inteligentes e personalizados em minutos.
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
    background: "linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%)",
    minHeight: "100vh",
    margin: 0,
  },
  header: {
    padding: "20px 40px",
    background: "#0f172a",
    color: "white",
  },
  logo: {
    margin: 0,
    fontWeight: 600,
    letterSpacing: "1px",
  },
  hero: {
    padding: "120px 40px",
    textAlign: "center" as const,
    maxWidth: "900px",
    margin: "0 auto",
  },
  title: {
    fontSize: "48px",
    marginBottom: "24px",
    fontWeight: 700,
  },
  subtitle: {
    fontSize: "20px",
    marginBottom: "40px",
    color: "#475569",
  },
  button: {
    padding: "14px 34px",
    fontSize: "18px",
    background: "#0f172a",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
};
