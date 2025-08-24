import { useEffect } from "react";
import { useNavigate } from "react-router";
import supabase from "../client.js";

export default function ViewCreator({ open, creator, onClose, onDeleted }) {
  const navigate = useNavigate();

  //Hooks must run every render
  useEffect(() => {
    if (!open) return;               // run only when open

    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  const handleDelete = async () => {
    if (!creator) return;
    if (!confirm(`Delete ${creator.name}?`)) return;
    const { error } = await supabase.from("creators").delete().eq("id", creator.id);
    if (error) return alert(error.message);
    onClose?.();
    onDeleted?.(creator.id);
  };

  // Early return AFTER hooks are declared
  if (!open || !creator) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-media">
          <img src={creator.imageUrl || ""} alt={creator.name} className="modal-image" />
        </div>
        <div className="modal-body">
          <h2 className="modal-title">{creator.name}</h2>
          <p className="modal-desc">{creator.description}</p>
          {creator.url && (
            <a className="modal-link" href={creator.url} target="_blank" rel="noreferrer" aria-label="View YouTube Channel">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M23.5 6.2s-.2-1.7-.8-2.5c-.8-.8-1.6-.8-2-1C18.1 2.2 12 2.2 12 2.2h-.1s-6.1 0-8.7.5c-.4.1-1.2.2-2 1-.6.8-.8 2.5-.8 2.5S0 8.2 0 10.2v1.6c0 2 .2 4 .2 4s.2 1.7.8 2.5c.8.8 1.8.8 2.2.9 1.6.2 6.8.4 6.8.4s6.1 0 8.7-.5c.4-.1 1.2-.2 2-1 .6-.8.8-2.5.8-2.5s.2-2 .2-4v-1.6c0-2-.2-4-.2-4zM9.6 14.6V7.7l6.3 3.5-6.3 3.4z"/>
                </svg>
            </a>
          )}
          <div className="modal-actions">
            <button className="btn btn-secondary" onClick={() => navigate(`/edit/${creator.id}`)}>
              Edit
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
            <button className="btn btn-ghost" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
