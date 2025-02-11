import Link from "next/link";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import "./todo.css";

const ToDo = () => {
  return (
    <div className="section-todo">
      <div className="row customiz">
        <div className="col-12">
          <h2>Customiz request</h2>
          <div className="box-customiz">
            <div className="row">
              <div className="col-md-2">
                <div className="todo-image">
                  <Image
                    src="/images/55.png"
                    alt="iamge"
                    width={500}
                    height={500}
                    quality={100}
                    loading="lazy"
                    objectFit="cover"
                  />
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="todo-info">
                  <h3>Art Work Name, Type, Calligraphy</h3>
                  <p>
                    Username Calligraphy , 20 x 29 x 3.5 cm placed on Dec 2,
                    2025
                  </p>
                  <span>EGP 2,079.00</span>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="todo-buttons">
                  <button className="button-reject">Reject</button>
                  <button className="button-request">Accept request</button>
                </div>
              </div>
              <div className="col-md-2 col-12">
                <div className="todo-more">
                  <h3>Customiz request</h3>
                  <Link href="">
                    View Details
                    <span className="arrow-next-icon">
                      <IoIosArrowForward />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="box-customiz">
            <div className="row">
              <div className="col-md-2">
                <div className="todo-image">
                  <Image
                    src="/images/55.png"
                    alt="iamge"
                    width={500}
                    height={500}
                    quality={100}
                    loading="lazy"
                    objectFit="cover"
                  />
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="todo-info">
                  <h3>Art Work Name, Type, Calligraphy</h3>
                  <p>
                    Username Calligraphy , 20 x 29 x 3.5 cm placed on Dec 2,
                    2025
                  </p>
                  <span>EGP 2,079.00</span>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="todo-buttons">
                  <button className="button-reject">Reject</button>
                  <button className="button-request">Accept request</button>
                </div>
              </div>
              <div className="col-md-2 col-12">
                <div className="todo-more">
                  <h3>Customiz request</h3>
                  <Link href="">
                    View Details
                    <span className="arrow-next-icon">
                      <IoIosArrowForward />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row section-order">
        <div className="col-12">
          <h2>Accepted Orders </h2>
          <div className="box-order">
            <div className="row">
              <div className="col-md-2">
                <div className="todo-image">
                  <Image
                    src="/images/55.png"
                    alt="iamge"
                    width={500}
                    height={500}
                    quality={100}
                    loading="lazy"
                    objectFit="cover"
                  />
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="todo-info">
                  <h3>Art Work Name, Type, Calligraphy</h3>
                  <p>
                    Username Calligraphy , 20 x 29 x 3.5 cm placed on Dec 2,
                    2025
                  </p>
                  <span>EGP 2,079.00</span>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="todo-time-delivery">
                  <span className="delivery">Time to delivery</span>
                  <span className="time">3 days left</span>
                </div>
              </div>
              <div className="col-md-2 col-12">
                <div className="todo-more">
                  <h3>Customiz request</h3>
                  <Link href="">
                    View Details
                    <span className="arrow-next-icon">
                      <IoIosArrowForward />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="box-order">
            <div className="row">
              <div className="col-md-2">
                <div className="todo-image">
                  <Image
                    src="/images/55.png"
                    alt="iamge"
                    width={500}
                    height={500}
                    quality={100}
                    loading="lazy"
                    objectFit="cover"
                  />
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="todo-info">
                  <h3>Art Work Name, Type, Calligraphy</h3>
                  <p>
                    Username Calligraphy , 20 x 29 x 3.5 cm placed on Dec 2,
                    2025
                  </p>
                  <span>EGP 2,079.00</span>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="todo-time-delivery">
                  <span className="delivery">Time to delivery</span>
                  <span className="time">3 days left</span>
                </div>
              </div>
              <div className="col-md-2 col-12">
                <div className="todo-more">
                  <h3>Customiz request</h3>
                  <Link href="">
                    View Details
                    <span className="arrow-next-icon">
                      <IoIosArrowForward />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDo;
