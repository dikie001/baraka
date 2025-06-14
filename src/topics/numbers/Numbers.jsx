import React from "react";
import revisionData from "./Notes.json";

const NumbersRevision = () => {
  const { topic, grade, revision_content } = revisionData;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #1e293b, #0f172a)",
        color: "white",
        padding: "2rem",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1
            style={{ fontSize: "3rem", fontWeight: "bold", color: "#14b8a6" }}
          >
            📘 {topic}
          </h1>
          <p
            style={{
              color: "#cbd5e1",
              marginTop: "0.5rem",
              fontSize: "1.2rem",
            }}
          >
            Grade {grade} Revision Guide
          </p>
          <p
            style={{ marginTop: "1rem", color: "#94a3b8", fontStyle: "italic" }}
          >
            {revision_content.description}
          </p>
        </div>

        <div
          style={{ maxHeight: "75vh", overflowY: "auto", paddingRight: "1rem" }}
        >
          {revision_content.subtopics.map((subtopic, index) => (
            <div
              key={index}
              style={{
                background: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "1rem",
                padding: "1.5rem",
                marginBottom: "1.5rem",
                boxShadow: "0 0 10px rgba(20, 184, 166, 0.1)",
              }}
            >
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "#5eead4",
                  marginBottom: "1rem",
                }}
              >
                {index + 1}. {subtopic.title}
              </h2>

              {subtopic.definition && (
                <p style={{ marginBottom: "0.75rem" }}>
                  <strong>🧠 Definition:</strong> {subtopic.definition}
                </p>
              )}

              {subtopic.symbol && (
                <p style={{ marginBottom: "0.75rem", color: "#22d3ee" }}>
                  <strong>🔣 Symbol:</strong> {subtopic.symbol}
                </p>
              )}

              {subtopic.example && (
                <div style={{ marginBottom: "0.75rem" }}>
                  <strong>📝 Example:</strong>
                  <div style={{ marginLeft: "1rem", marginTop: "0.5rem" }}>
                    <p>Q: {subtopic.example.question}</p>
                    <p style={{ color: "#4ade80" }}>
                      A: {subtopic.example.answer}
                    </p>
                  </div>
                </div>
              )}

              {subtopic.whyItMatters && (
                <p style={{ marginBottom: "0.75rem", color: "#cbd5e1" }}>
                  <strong>💡 Why It Matters:</strong> {subtopic.whyItMatters}
                </p>
              )}

              {subtopic.quickTips && subtopic.quickTips.length > 0 && (
                <div
                  style={{
                    fontSize: "0.95rem",
                    color: "#a1a1aa",
                    marginTop: "0.5rem",
                  }}
                >
                  <strong>⚡ Quick Tips:</strong>
                  <ul style={{ paddingLeft: "1.2rem", marginTop: "0.5rem" }}>
                    {subtopic.quickTips.map((tip, i) => (
                      <li key={i} style={{ lineHeight: "1.7" }}>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NumbersRevision;
