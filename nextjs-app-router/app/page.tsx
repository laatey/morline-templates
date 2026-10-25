export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.5rem",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: "var(--accent)",
        }}
      />
      <div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 600, margin: 0 }}>
          Next.js App Router Template
        </h1>
        <p style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>
          Running — edit <code>app/page.tsx</code> to get started.
        </p>
      </div>
      <a
        href="/api/health"
        style={{
          fontSize: "0.85rem",
          color: "var(--text-muted)",
          border: "1px solid var(--border)",
          borderRadius: "6px",
          padding: "0.4rem 0.8rem",
          textDecoration: "none",
        }}
      >
        /api/health
      </a>
    </main>
  );
}
