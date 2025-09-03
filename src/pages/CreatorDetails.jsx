import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import supabase from "../client.js";

export default function CreatorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("creators")
        .select("id,name,description,url,imageUrl,created_at")
        .eq("id", id)
        .single();
      if (error) setErr(error);
      else setCreator(data);
    })();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm(`Delete ${creator?.name}?`)) return;
    const { error } = await supabase.from("creators").delete().eq("id", id);
    if (error) return alert(error.message);
    navigate("/all");
  };

  if (err) return <div style={{ color: "crimson" }}>Error: {err.message}</div>;
  if (!creator) return <div>Loading…</div>;

  return (
    <section className="detail-page">
      <div className="detail-panel">
        {/* Left: image */}
        <div className="detail-media">
          <img className="detail-image" src={creator.imageUrl} alt={creator.name} />
        </div>

        {/* Right: content */}
        <div className="detail-body">
          <h2 className="detail-title">{creator.name}</h2>
          <p className="detail-desc">{creator.description}</p>
          {creator.url && (
            <a className="modal-link" href={creator.url} target="_blank" rel="noreferrer">
              Visit Youtube
            </a>
          )}

          <div className="modal-actions">
            <button className="btn btn-secondary" onClick={() => navigate(`/edit/${creator.id}`)}>
              Edit
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
            <button className="btn btn-ghost" onClick={() => navigate("/all")}>
              Back
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
