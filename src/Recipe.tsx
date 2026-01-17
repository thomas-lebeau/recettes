import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Markdown from "react-markdown";
import Loading from "./Loading";
import Error from "./Error";

export default function Recipe() {
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
    <>
      <nav className="nav">
        <Link to="/">← Back to recipes</Link>
      </nav>

      {loading && <Loading />}
      {error && <Error message={error} />}

      {!loading && !error && (
        <article className="markdown-body recipe-article">
          <Markdown>{markdown}</Markdown>
        </article>
      )}
    </>
  );
}
