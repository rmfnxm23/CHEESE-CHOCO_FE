import Link from "next/link";

export default function Custom404() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
        color: "#666",
      }}
    >
      <h1 style={{ fontSize: "4rem", marginBottom: "1rem" }}>404</h1>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>
        This page could not be found.
      </h2>
      <Link
        href="/"
        style={{
          color: "#0070f3",
          textDecoration: "underline",
          fontWeight: "bold",
          fontSize: "1.2rem",
        }}
      >
        Go back home
      </Link>
    </div>
  );
}
