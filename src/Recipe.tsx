import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Markdown from "react-markdown";
import "github-markdown-css/github-markdown.css";

function Recipe() {
  const { slug } = useParams<{ slug: string }>();
  const [markdown, setMarkdown] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadRecipe() {
      if (!slug) {
        setError("No recipe specified");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Dynamically import the markdown file
        const module = await import(`./recipes/${slug}.md?raw`);
        setMarkdown(module.default);
      } catch (err) {
        console.error("Error loading recipe:", err);
        setError("Recipe not found");
      } finally {
        setLoading(false);
      }
    }

    loadRecipe();
  }, [slug]);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "980px",
        margin: "0 auto",
        padding: "2rem 1rem",
        textAlign: "left",
      }}
    >
      <Link to="/" style={{ color: "#0969da", fontSize: "14px" }}>
        ← Back to recipes
      </Link>
      {loading && (
        <div style={{ textAlign: "center", padding: "2rem", color: "#666" }}>
          Loading recipe...
        </div>
      )}
      {error && (
        <div style={{ textAlign: "center", padding: "2rem", color: "#d1242f" }}>
          {error}
        </div>
      )}
      {!loading && !error && (
        <article className="markdown-body" style={{ marginTop: "2rem", maxWidth: "none" }}>
          <Markdown>{markdown}</Markdown>
        </article>
      )}
    </div>
  );
}

export default Recipe;
