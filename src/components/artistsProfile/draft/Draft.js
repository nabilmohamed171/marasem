import Image from "next/image";
import { HiDotsHorizontal } from "react-icons/hi";
import "./draft.css";

const Draft = () => {
  return (
    <div className="section-draft">
      <div className="row">
        <div className="col-md-4 col-12">
          <div className="box-draft">
            <div className="draft-image">
              <div className="overley"></div>
              <Image
                src="/images/7.png"
                alt="iamge"
                width={312}
                height={300}
                quality={70}
                objectFit="cover"
                loading="lazy"
              />
            </div>
            <div className="draft-info">
              <h2 className="">Lorem ipsum,</h2>
              <p className="">Lorem ipsum, Lorem ipsum, Lorem ipsum,</p>
            </div>
            <div className="pars-icon">
              <span>
                <HiDotsHorizontal />
              </span>
            </div>
            <div className="draft-button">
              <button className="edite-artwork">Edite Artwork</button>
              <button className="delete-artwork">Delete Artwork</button>
              <p>Last Modified 2 Years Ago</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-12">
          <div className="box-draft">
            <div className="draft-image">
              <div className="overley"></div>
              <Image
                src="/images/7.png"
                alt="iamge"
                width={312}
                height={300}
                quality={70}
                objectFit="cover"
                loading="lazy"
              />
            </div>
            <div className="draft-info">
              <h2 className="">Lorem ipsum,</h2>
              <p className="">Lorem ipsum, Lorem ipsum, Lorem ipsum,</p>
            </div>
            <div className="pars-icon">
              <span>
                <HiDotsHorizontal />
              </span>
            </div>
            <div className="draft-button">
              <button className="edite-artwork">Edite Artwork</button>
              <button className="delete-artwork">Delete Artwork</button>
              <p>Last Modified 2 Years Ago</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-12">
          <div className="box-draft">
            <div className="draft-image">
              <div className="overley"></div>
              <Image
                src="/images/7.png"
                alt="iamge"
                width={312}
                height={300}
                quality={70}
                objectFit="cover"
                loading="lazy"
              />
            </div>
            <div className="draft-info">
              <h2 className="">Lorem ipsum,</h2>
              <p className="">Lorem ipsum, Lorem ipsum, Lorem ipsum,</p>
            </div>
            <div className="pars-icon">
              <span>
                <HiDotsHorizontal />
              </span>
            </div>
            <div className="draft-button">
              <button className="edite-artwork">Edite Artwork</button>
              <button className="delete-artwork">Delete Artwork</button>
              <p>Last Modified 2 Years Ago</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 col-12">
          <div className="box-draft">
            <div className="draft-image">
              <div className="overley"></div>
              <Image
                src="/images/7.png"
                alt="iamge"
                width={312}
                height={300}
                quality={70}
                objectFit="cover"
                loading="lazy"
              />
            </div>
            <div className="draft-info">
              <h2 className="">Lorem ipsum,</h2>
              <p className="">Lorem ipsum, Lorem ipsum, Lorem ipsum,</p>
            </div>
            <div className="pars-icon">
              <span>
                <HiDotsHorizontal />
              </span>
            </div>
            <div className="draft-button">
              <p>Last Modified 2 Years Ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Draft;
