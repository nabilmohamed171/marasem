import Link from "next/link";
import Image from "next/image";
import "./collections.css";

const FirstCollections = () => {
  return (
    <div className="first-collections">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-6 first">
            <div className="row">
              <div className="col-md-6 col-5">
                <div className="row">
                  <div className="col">
                    <div className="info">
                      <h2>EGYPTIANS</h2>
                      <p>
                        is simply dummy text of the printing and typesetting
                        industry.
                      </p>
                      <Link href="/collections">Find</Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-7">
                <div className="row">
                  <div className="col-md-8 col-7">
                    <div className="first-image">
                      <Link href="/collections">
                        <Image
                          src="/images/7.png"
                          alt="image"
                          width={177}
                          height={177}
                          quality={70}
                          loading="lazy"
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-4 col-5">
                    <div className="sec-image">
                      <Image
                        src="/images/6.png"
                        alt="image"
                        width={85}
                        height={85}
                        quality={70}
                        loading="lazy"
                      />

                      <div className="dark-theme">
                        <div className="overley-r-r-b"></div>

                        <Image
                          src="/images/2.png"
                          alt="image"
                          width={85}
                          height={85}
                          quality={70}
                          loading="lazy"
                        />
                      </div>
                      <span>5k</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-6 sec">
            <div className="row">
              <div className="col-md-6 col-5">
                <div className="info">
                  <h2>GIFTS</h2>
                  <p>
                    is simply dummy text of the printing and typesetting
                    industry.
                  </p>
                  <Link href="/collections">Find</Link>
                </div>
              </div>
              <div className="col-md-6 col-7">
                <div className="row">
                  <div className="col-md-8 col-7">
                    <div className="first-image">
                      <Link href="/collections">
                        <Image
                          src="/images/3.png"
                          alt="image"
                          width={177}
                          height={177}
                          quality={70}
                          loading="lazy"
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-4 col-5">
                    <div className="sec-image">
                      <Image
                        src="/images/4.png"
                        alt="image"
                        width={85}
                        height={85}
                        quality={70}
                        loading="lazy"
                      />

                      <div className="dark-theme">
                        <div className="overley-r-r-b"></div>
                        <Image
                          src="/images/5.png"
                          alt="image"
                          width={85}
                          height={85}
                          quality={70}
                          loading="lazy"
                        />
                      </div>
                      <span>3k</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstCollections;
