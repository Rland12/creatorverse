import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import supabase from "../client.js";
import CreatorCard from "../components/CreatorCard.jsx";

export default function ShowCreators() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;
    (async () => {
      const { data, error } = await supabase
        .from("creators")
        .select("id, name, url, description, imageUrl, created_at")
        .order("created_at", { ascending: false });

      if (!ignore) {
        if (error) setErr(error);
        else setCreators(data ?? []);
        setLoading(false);
      }
    })();
    return () => { ignore = true; };
  }, []);

  if (loading) return <div>Loading creators…</div>;
  if (err) return <div style={{ color: "crimson" }}>Error: {err.message}</div>;

  return (
    <div className="page-section">
      <div className="cards-grid">
        {creators.length === 0 ? (
          <p>No creators yet.</p>
        ) : (
          creators.map((c) => (
            <CreatorCard
              key={c.id}
              id={c.id}
              img={c.imageUrl}
              name={c.name}
              description={c.description}
              url={c.url}
              onClick={() => navigate(`/creator/${c.id}`)}
            />
          ))
        )}
      </div>
    </div>
  );
}
