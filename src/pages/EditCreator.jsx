import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import supabase from "../client.js";

export default function EditCreator() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("creators")
        .select("id, name, url, imageUrl, description")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        setErr(error);
      } else if (data) {
        setName(data.name ?? "");
        setUrl(data.url ?? "");
        setImageUrl(data.imageUrl ?? "");
        setDescription(data.description ?? "");
      }
      setLoading(false);
    })();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase
      .from("creators")
      .update({ name, description, url, imageUrl })
      .eq("id", id);

    setSaving(false);
    if (error) {
      console.error(error);
      setErr(error);
    } else {
      navigate("/all"); // or navigate(`/view/${id}`) if you add that route
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this creator? This cannot be undone.")) return;
    const { error } = await supabase.from("creators").delete().eq("id", id);
    if (error) {
      console.error(error);
      setErr(error);
    } else {
      navigate("/all");
    }
  };

  if (loading) return <div className="form-wrapper">Loading…</div>;

  return (
    <div className="form-wrapper">
      <h2 className="form-title">Edit Creator</h2>

      {err && (
        <div style={{ color: "#ff7a7a", marginBottom: "1rem" }}>
          {err.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="creator-form">
        <label>
          Creator Name
          <input
            type="text"
            placeholder="Creator Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Social Link
          <input
            type="url"
            placeholder="Creator Social Link"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </label>

        <label>
          Image URL
          <input
            type="text"
            placeholder="Link to Creator Image"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </label>

        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a description for this creator"
            rows={4}
          />
        </label>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Saving…" : "Save Changes"}
          </button>
          <button type="button" className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => navigate("/all")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
