import { useState } from "react";
import supabase from "../client.js";
import { useNavigate } from "react-router";

export default function AddCreator() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from("creators")
      .insert([{ name, url, imageUrl, description }]);

    if (error) {
      console.error(error);
    } else {
      navigate("/all");
    }
  };

  return (
    <div className="form-wrapper">
      <h2 className="form-title">Add a New Creator</h2>
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

        <button type="submit" className="btn btn-primary">
          Add Creator
        </button>
      </form>
    </div>
  );
}
