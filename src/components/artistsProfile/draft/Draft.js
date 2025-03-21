import Image from "next/image";
import { HiDotsHorizontal } from "react-icons/hi";
import Link from "next/link";
import "./draft.css";

const Draft = (drafts) => {
  drafts = drafts.drafts;
  return (
    <div className="section-draft">
      <div className="row">
        {drafts[0].map((draft, index) => (
          <div className="col-md-4 col-12">
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
                <h2 className="">{draft.name}</h2>
                <p className="">{draft.description}</p>
              </div>
              {/* <div className="pars-icon">
                <span>
                  <HiDotsHorizontal />
                </span>
              </div> */}
              <div className="draft-button">
                <Link href={"/artist-edit-product?id=" + draft.id} className="edite-artwork">Edit Artwork</Link>
                <button className="delete-artwork">Delete Artwork</button>
                <p>Last Modified {new Date(draft.updated_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="row">
        {drafts[1].map((draft, index) => (
          <div className="col-md-4 col-12">
            <div className="box-draft">
              <div className="draft-image">
                <div className="overley"></div>
                <Image
                  src={draft.photos[0]}
                  alt="iamge"
                  width={312}
                  height={300}
                  quality={70}
                  objectFit="cover"
                  loading="lazy"
                />
              </div>
              <div className="draft-info">
                <h2 className="">{draft.name}</h2>
                <p className="">{draft.description}</p>
              </div>
              {/* <div className="pars-icon">
                <span>
                  <HiDotsHorizontal />
                </span>
              </div> */}
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
