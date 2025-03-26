// Add state for drafts and a delete handler at the top of your Draft component:
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { HiDotsHorizontal } from "react-icons/hi";
import Link from "next/link";
import "./draft.css";

const Draft = ({ drafts: initialDrafts }) => {
  const [draftsData, setDraftsData] = useState(initialDrafts);

  const handleDelete = async (id, groupIndex) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.delete(`http://127.0.0.1:8000/api/artworks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      console.log(response.data.message);
      // Remove the deleted draft from the corresponding group
      const updatedDrafts = [...draftsData];
      updatedDrafts[groupIndex] = updatedDrafts[groupIndex].filter((draft) => draft.id !== id);
      setDraftsData(updatedDrafts);
    } catch (error) {
      console.error("Error deleting artwork:", error);
    }
  };

  return (
    <div className="section-draft">
      <div className="row">
        {draftsData[0].map((draft) => (
          <div className="col-md-4 col-12" key={draft.id}>
            <div className="box-draft">
              <div className="draft-image">
                <div className="overley"></div>
                <Image
                  src={draft.photos[0]}
                  alt="image"
                  width={312}
                  height={300}
                  quality={70}
                  objectFit="cover"
                  loading="lazy"
                />
              </div>
              <div className="draft-info">
                <h2>{draft.name}</h2>
                <p>{draft.description}</p>
              </div>
              <div className="draft-button">
                <Link href={"/artist-edit-product?id=" + draft.id} style={{ textDecoration: "none" }}>
                  <button className="edite-artwork">edit artwork</button>
                </Link>
                <button
                  className="delete-artwork"
                  onClick={() => handleDelete(draft.id, 0)}
                >
                  Delete Artwork
                </button>
                <p>Last Modified {new Date(draft.updated_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="row">
        {draftsData[1].map((draft) => (
          <div className="col-md-4 col-12" key={draft.id}>
            <div className="box-draft">
              <div className="draft-image">
                <div className="overley"></div>
                <Image
                  src={draft.photos[0]}
                  alt="image"
                  width={312}
                  height={300}
                  quality={70}
                  objectFit="cover"
                  loading="lazy"
                />
              </div>
              <div className="draft-info">
                <h2>{draft.name}</h2>
                <p>{draft.description}</p>
              </div>
              <div className="draft-button">
                <p>Last Modified {new Date(draft.updated_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Draft;
