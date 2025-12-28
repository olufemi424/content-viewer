import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        padding: "24px",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "48px",
          fontWeight: 800,
          margin: 0,
          marginBottom: 8,
        }}
      >
        404
      </h1>
      <p
        style={{
          fontSize: "18px",
          color: "#666",
          marginBottom: 24,
        }}
      >
        This page could not be found.
      </p>
      <Link
        href="/"
        style={{
          padding: "10px 20px",
          border: "1px solid #222",
          borderRadius: 6,
          backgroundColor: "#111",
          color: "white",
          textDecoration: "none",
          fontSize: 14,
        }}
      >
        Go Home
      </Link>
    </div>
  );
}
