import supabase from "../client.js";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import CreatorCard from "../components/CreatorCard.jsx";
import ViewCreator from "../components/ViewCreator.jsx";

export default function ShowCreators() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get("c"); // ?c=<id>

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("creators")
        .select("id, name, url, description, imageUrl, created_at")
        .order("created_at", { ascending: false });

      if (error) setErr(error);
      else setCreators(data ?? []);
      setLoading(false);
    })();
  }, []);

  // pick the selected creator from the list
  const selectedCreator = useMemo(
    () => creators.find(c => String(c.id) === String(selectedId)),
    [creators, selectedId]
  );

  const openModal = (id) => setSearchParams({ c: id });       // updates URL
  const closeModal = () => setSearchParams(params => {         // clears ?c
    const next = new URLSearchParams(params);
    next.delete("c");
    return next;
  });

  const handleDeleted = (id) => {
    closeModal();
    setCreators(cs => cs.filter(c => c.id !== id));
  };

  if (loading) return <div>Loading creators…</div>;
  if (err) return <div style={{ color: "crimson" }}>Error: {err.message}</div>;

  return (
    <div className="page-section">
      <div className="cards-grid">
        {creators.map((c) => (
          <CreatorCard
            key={c.id}
            id={c.id}
            img={c.imageUrl}
            name={c.name}
            description={c.description}
            url={c.url}
            onClick={() => openModal(c.id)}
          />
        ))}
      </div>

      {/* modal component */}
      <ViewCreator
        open={!!selectedId && !!selectedCreator}
        creator={selectedCreator}
        onClose={closeModal}
        onDeleted={handleDeleted}
      />
    </div>
  );
}
