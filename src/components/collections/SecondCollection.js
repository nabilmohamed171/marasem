import Link from "next/link";
import Image from "next/image";
import "./collections.css";

const SecCollections = () => {
  return (
    <div className="sec-collections">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-6 first">
            <div className="row">
              <div className="col-md-6 col-5">
                <div className="info">
                  <h2>VINTAGE</h2>
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
                          src="/images/6.png"
                          alt="Vintage Image"
                          width={500}
                          height={500}
                          quality={100}
                          loading="lazy"
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-4 col-5">
                    <div className="sec-image">
                      <Image
                        src="/images/2.png"
                        alt="Second Image"
                        width={500}
                        height={500}
                        quality={100}
                        loading="lazy"
                      />
                      <div className="dark-theme">
                        <div className="overley-r-r-b"></div>
                        <Image
                          src="/images/6.png"
                          alt="Overlay Image"
                          width={500}
                          height={500}
                          quality={100}
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
          <div className="col-md-6 col-6 sec">
            <div className="row">
              <div className="col-md-6 col-5">
                <div className="info">
                  <h2>BOHEMIAN</h2>
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
                          src="/images/4.png"
                          alt="Bohemian Image"
                          width={500}
                          height={500}
                          quality={100}
                          loading="lazy"
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-4 col-5">
                    <div className="sec-image">
                      <Image
                        src="/images/5.png"
                        alt="Second Image Bohemian"
                        width={500}
                        height={500}
                        quality={100}
                        loading="lazy"
                      />
                      <div className="dark-theme">
                        <div className="overley-r-r-b"></div>
                        <Image
                          src="/images/6.png"
                          alt="Overlay Image"
                          width={500}
                          height={500}
                          quality={100}
                          loading="lazy"
                        />
                      </div>
                      <span>8k</span>
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

export default SecCollections;
