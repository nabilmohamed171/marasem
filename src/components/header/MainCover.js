import Image from "next/image";
import Link from "next/link";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GoPlus } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa";
import "./main-cover.css";

const MainCover = () => {
  return (
    <div className="cover-header">
      <div className="row">
        <div className="col-md-4">
          <div className="image-header full">
            <Link href="#">
              <Image
                className="full-image"
                src="/images/1.png"
                alt="Image 1"
                width={515.66}
                height={578.89}
                quality={100}
                loading="lazy"
              />
            </Link>
            <div className="full-info">
              <div className="container">
                <ul className="list-unstyled">
                  <Link href="#">
                    <Image
                      className="logo-info"
                      src="/images/logo 2.png"
                      alt="Logo"
                      width={45}
                      height={45}
                      quality={100}
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
        </div>

        <div className="col-md-8">
          <div className="row">
            <div className="col-md-5">
              <div className="image-header small">
                <div className="overley"></div>
                <Link href="#">
                  <Image
                    className="small-image"
                    src="/images/22.jpeg"
                    alt="Small Image"
                    width={500}
                    height={338}
                    quality={100}
                    loading="lazy"
                  />
                </Link>
                <div className="addons">
                  <div className="add-heart">
                    <span className="heart">
                      <FaRegHeart />
                    </span>
                  </div>
                  <div className="add-cart">
                    <span className="cart-shopping">
                      <HiOutlineShoppingBag />
                    </span>
                    <span className="plus">
                      <GoPlus />
                    </span>
                  </div>
                </div>
                <div className="small-info">
                  <h4>Balzi Rossi</h4>
                  <p>
                    35 x 25 x 0.3cm - Lorem Ipsum, Lorem Ipsum, Lorem Ipsum,
                    Lorem Ipsum
                  </p>
                  <span>EGP 2,500</span>
                  <div className="user">
                    <div className="user-image">
                      <Link href="#">
                        <Image
                          src="/images/avatar.avif"
                          alt="User Avatar"
                          width={40}
                          height={40}
                          quality={100}
                          loading="lazy"
                        />
                      </Link>
                    </div>
                    <span>Omar Mohsen</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <div className="image-header large">
                <Link href="#">
                  <Image
                    className="large-image"
                    src="/images/55.jpg"
                    alt="Large Image"
                    width={700}
                    height={338}
                    quality={100}
                    loading="lazy"
                  />
                </Link>
                <div className="large-info">
                  <h2>
                    <Link href="#">
                      SPECIAL <br /> COLLECTIONS
                    </Link>
                  </h2>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="image-header x-small">
                <div className="overley-o-b"></div>
                <Link href="#">
                  <Image
                    className="x-small-imge"
                    src="/images/4.png"
                    alt="X Small Image 1"
                    width={337.77}
                    height={220.88}
                    quality={100}
                    loading="lazy"
                  />
                </Link>
                <div className="x-small-info">
                  <h2>
                    <Link href="#">Fine Art</Link>
                  </h2>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="image-header x-small">
                <div className="overley-o-b"></div>
                <Link href="#">
                  <Image
                    className="x-small-imge"
                    src="/images/5.png"
                    alt="X Small Image 2"
                    width={337.77}
                    height={220.88}
                    quality={100}
                    loading="lazy"
                  />
                </Link>
                <div className="x-small-info">
                  <h2>
                    <Link href="#">Hand Craft</Link>
                  </h2>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="image-header x-small">
                <div className="overley-o-b"></div>
                <Link href="#">
                  <Image
                    className="x-small-imge"
                    src="/images/6.png"
                    alt="X Small Image 3"
                    width={337.77}
                    height={220.88}
                    quality={100}
                    loading="lazy"
                  />
                </Link>
                <div className="x-small-info">
                  <h2>
                    <Link href="#">Digital Art</Link>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCover;
