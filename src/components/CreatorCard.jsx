import { useNavigate } from "react-router";

export default function CreatorCard({
  id,
  img,
  name,
  description,
  url,
  onClick,   
}) {
  const navigate = useNavigate();
  return (
    <article
      className={`creator-card ${onClick ? "is-clickable" : ""}`}
      onClick={onClick}
      tabIndex={onClick ? 0 : -1}
      onKeyDown={(e) => {
        if (!onClick) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={onClick ? `Open details for ${name}` : undefined}
    >
       {/* Edit icon */}
      <button
        className="creator-card__edit"
        onClick={(e) => {
          e.stopPropagation(); // don’t trigger card click
          navigate(`/edit/${id}`);
        }}
        aria-label={`Edit ${name}`}
      >
        ✎
      </button>
      
      <div className="creator-card__image-wrap">
        <img className="creator-card__image" src={img} alt={name} />
      </div>

      <div className="creator-card__content">
        <h3 className="creator-card__title">{name}</h3>
        <p className="creator-card__desc">{description}</p>
        {url && (
          <a
            className="creator-card__link"
            href={url}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()} // don't trigger modal
            aria-label="View YouTube Channel"
          >
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
              viewBox="0 0 24 24">
              <path d="M23.5 6.2s-.2-1.7-.8-2.5c-.8-.8-1.6-.8-2-1C18.1 2.2 12 2.2 12 2.2h-.1s-6.1 0-8.7.5c-.4.1-1.2.2-2 1-.6.8-.8 2.5-.8 2.5S0 8.2 0 10.2v1.6c0 2 .2 4 .2 4s.2 1.7.8 2.5c.8.8 1.8.8 2.2.9 1.6.2 6.8.4 6.8.4s6.1 0 8.7-.5c.4-.1 1.2-.2 2-1 .6-.8.8-2.5.8-2.5s.2-2 .2-4v-1.6c0-2-.2-4-.2-4zM9.6 14.6V7.7l6.3 3.5-6.3 3.4z"/>
            </svg>
          </a>
        )}
      </div>
    </article>
  );
}

