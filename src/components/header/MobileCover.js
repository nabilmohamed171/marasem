import Image from "next/image";
import Link from "next/link";
import "./mobile-cover.css";

const MobileCover = () => {
  return (
    <div className="main-mobile-cover">
      <div className="row">
        <div className="col-6">
          <div className="first-image">
            <Link href="#">
              <Image
                src="/images/1.png"
                alt="Image Cover"
                className="img-fluid"
                width={206}
                height={495}
                loading="lazy"
                quality={70}
              />
            </Link>
            <div className="full-info">
              <ul className="list-unstyled">
                <Link href="#">
                  <Image
                    className="logo-info"
                    src="/images/logo 2.png"
                    alt="Logo"
                    width={45}
                    height={45}
                    quality={70}
                    loading="lazy"
                  />
                </Link>
                <li className="full-link">
                  <Link className="reser-link" href="#">
                    Paintings
                  </Link>
                </li>
                <li className="full-link">
                  <Link className="reser-link" href="#">
                    Hand Made
                  </Link>
                </li>
                <li className="full-link">
                  <Link className="reser-link" href="#">
                    Illustrations <br /> & More
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-6">
          <div className="row">
            <div className="col-12">
              <div className="sec-image">
                <Link href="#">
                  <Image
                    src="/images/2.png"
                    alt="Image Cover"
                    className="img-fluid"
                    width={225}
                    height={285}
                    quality={70}
                    loading="lazy"
                  />
                </Link>
              </div>
            </div>
            <div className="col-12">
              <div className="thr-image">
                <Link href="#">
                  <Image
                    src="/images/3.png"
                    alt="Image Cover"
                    className="img-fluid"
                    width={225}
                    height={285}
                    quality={70}
                    loading="lazy"
                  />
                </Link>
                <div className="large-info">
                  <h2>
                    <Link className="reser-link" href="#">
                      SPECIAL <br /> COLLECTIONS
                    </Link>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-4">
          <div className="fou-image">
            <div className="overley-o-b"></div>
            <Link href="#">
              <Image
                src="/images/4.png"
                alt="Image Cover"
                className="img-fluid"
                width={144}
                height={150}
                quality={70}
                loading="lazy"
              />
            </Link>
            <div className="x-small-info">
              <h2>
                <Link className="reser-link" href="#">
                  Fine Art
                </Link>
              </h2>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="fiv-image">
            <div className="overley-o-b"></div>
            <Link href="#">
              <Image
                src="/images/5.png"
                alt="Image Cover"
                className="img-fluid"
                width={144}
                height={150}
                quality={70}
                loading="lazy"
              />
            </Link>
            <div className="x-small-info">
              <h2>
                <Link className="reser-link" href="#">
                  Hand Craft
                </Link>
              </h2>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="six-image">
            <div className="overley-o-b"></div>
            <Link href="#">
              <Image
                src="/images/6.png"
                alt="Image Cover"
                className="img-fluid"
                width={144}
                height={150}
                quality={70}
                loading="lazy"
              />
            </Link>
            <div className="x-small-info">
              <h2>
                <Link className="reser-link" href="#">
                  Digital Art
                </Link>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileCover;
