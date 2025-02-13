import "./insights.css";
import Image from "next/image";

const Insights = () => {
  return (
    <>
      <div className="insights d-sm-none d-md-block d-xl-block d-lg-block">
        <div className="box-insights">
          <div className="row">
            <div className="col-md-3">
              <div className="total-sales">
                <h3>Total Sales Amount</h3>
                <span>EGP 29.2K</span>
              </div>
            </div>
            <div className="col-md-3">
              <div className="total-sold">
                <h3>Total Sold Artworks</h3>
                <span>29</span>
              </div>
            </div>
            <div className="col-md-3">
              <div className="total-todo">
                <h3>To Do</h3>
                <span>3</span>
              </div>
            </div>
            <div className="col-md-3">
              <div className="total-viewa">
                <h3>Profile Views</h3>
                <span>2.2K</span>
              </div>
            </div>
          </div>
        </div>
        <div className="box-project-amount">
          <div className="row">
            <div className="col-md-3">
              <div className="project-amount">
                <h3>Project Views</h3>
                <span>29K</span>
              </div>
            </div>
            <div className="col-md-3">
              <div className="appreciations">
                <h3>Appreciations</h3>
                <span>46</span>
              </div>
            </div>
            <div className="col-md-3">
              <div className="followers">
                <h3>Followers</h3>
                <span>352</span>
              </div>
            </div>
            <div className="col-md-3">
              <div className="following">
                <h3>Following</h3>
                <span>1,329</span>
              </div>
            </div>
          </div>
        </div>

        <div className="table-artwork-performance">
          <div className="artwork-performance">
            <div className="row table-head">
              <div className="col-md-5">
                <h3>Artwork Performance</h3>
              </div>
              <div className="col-md-2">
                <h3 className="text-center">Views</h3>
              </div>
              <div className="col-md-2">
                <h3 className="text-center">Appreciations</h3>
              </div>
              <div className="col-md-3">
                <h3 className="text-center">Artwork Status</h3>
              </div>
            </div>

            {/* Row for the first artwork */}
            <div className="row table-row">
              <div className="col-md-2">
                <div className="performance-image">
                  <div className="overley"></div>
                  <Image
                    src="/images/55.png"
                    alt="image"
                    width={500}
                    height={500}
                    objectFit="cover"
                    quality={100}
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="performance-info">
                  <h3>Art Work Name , Type , Calligraphy EGP 2,079.00</h3>
                  <span>Published September 17th, 2025</span>
                </div>
              </div>
              <div className="col-md-2">
                <div className="performance-view text-center">
                  <span>255</span>
                </div>
              </div>
              <div className="col-md-2">
                <div className="performance-appreciations text-center">
                  <span>15</span>
                </div>
              </div>
              <div className="col-md-3">
                <div className="performance-artwork-status text-center">
                  <span>Sold</span>
                </div>
              </div>
            </div>

            {/* Row for the second artwork */}
            <div className="row table-row">
              <div className="col-md-2">
                <div className="performance-image">
                  <Image
                    src="/images/55.png"
                    alt="image"
                    width={500}
                    height={500}
                    objectFit="cover"
                    quality={100}
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="performance-info">
                  <h3>Art Work Name , Type , Calligraphy EGP 2,079.00</h3>
                  <span>Published September 17th, 2025</span>
                </div>
              </div>
              <div className="col-md-2">
                <div className="performance-view text-center">
                  <span>255</span>
                </div>
              </div>
              <div className="col-md-2">
                <div className="performance-appreciations text-center">
                  <span>15</span>
                </div>
              </div>
              <div className="col-md-3">
                <div className="performance-artwork-status text-center">
                  <span></span>
                </div>
              </div>
            </div>

            {/* Row for the third artwork */}
            <div className="row table-row">
              <div className="col-md-2">
                <div className="performance-image">
                  <div className="overley"></div>
                  <Image
                    src="/images/55.png"
                    alt="image"
                    width={500}
                    height={500}
                    objectFit="cover"
                    quality={100}
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="performance-info">
                  <h3>Art Work Name , Type , Calligraphy EGP 2,079.00</h3>
                  <span>Published September 17th, 2025</span>
                </div>
              </div>
              <div className="col-md-2">
                <div className="performance-view text-center">
                  <span>255</span>
                </div>
              </div>
              <div className="col-md-2">
                <div className="performance-appreciations text-center">
                  <span>15</span>
                </div>
              </div>
              <div className="col-md-3">
                <div className="performance-artwork-status text-center">
                  <span>Sold</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="insights-mobile text-center d-lg-none d-md-none d-xl-none d-sm-block">
        <div className="box-total-sales-mobile">
          <div className="row">
            <div className="col-7">
              <div className="total-sales">
                <h3>Total Sales Amount</h3>
                <span>EGP 29.2K</span>
              </div>
            </div>
            <div className="col-5">
              <div className="total-sold">
                <h3>Total Sold Artworks</h3>
                <span>29</span>
              </div>
            </div>
          </div>
        </div>
        <div className="box-views-mobile">
          <div className="row">
            <div className="col-3">
              <div className="total-todo">
                <h3>To Do</h3>
                <span>3</span>
              </div>
            </div>
            <div className="col-3">
              <div className="total-viewa">
                <h3>Profile Views</h3>
                <span>2.2K</span>
              </div>
            </div>
            <div className="col-3">
              <div className="project-amount">
                <h3>Project Views</h3>
                <span>29K</span>
              </div>
            </div>
            <div className="col-3">
              <div className="appreciations">
                <h3>Appreciations</h3>
                <span>46</span>
              </div>
            </div>
          </div>
        </div>
        <div className="box-followers-mobile">
          <div className="row">
            <div className="col-4">
              <div className="followers">
                <h3>Followers</h3>
                <span>352</span>
              </div>
            </div>
            <div className="col-4">
              <div className="following">
                <h3>Following</h3>
                <span>1,329</span>
              </div>
            </div>
            <div className="col-4">
              <div className="sold-out">
                <h3>Sold Out</h3>
                <span>52</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Insights;
