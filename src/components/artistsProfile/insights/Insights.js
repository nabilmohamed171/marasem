"use client";
import "./insights.css";
import Image from "next/image";

const Insights = ({ insights }) => {
  return (
    <>
      <div className="insights d-sm-none d-md-block d-xl-block d-lg-block">
        <div className="box-insights">
          <div className="row">
            <div className="col-md-3">
              <div className="total-sales">
                <h3>Total Sales Amount</h3>
                <span>EGP {insights.insights.total_sales.toLocaleString()}</span>
              </div>
            </div>
            <div className="col-md-3">
              <div className="total-sold">
                <h3>Total Sold Artworks</h3>
                <span>{insights.insights.total_sold_artworks}</span>
              </div>
            </div>
            <div className="col-md-3">
              <div className="total-todo">
                <h3>To Do</h3>
                <span>{insights.insights.to_do_count}</span>
              </div>
            </div>
            <div className="col-md-3">
              <div className="total-viewa">
                <h3>Profile Views</h3>
                <span>{insights.insights.profile_views.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="box-project-amount">
          <div className="row">
            <div className="col-md-3">
              <div className="project-amount">
                <h3>Project Views</h3>
                <span>{insights.insights.project_views.toLocaleString()}</span>
              </div>
            </div>
            <div className="col-md-3">
              <div className="appreciations">
                <h3>Appreciations</h3>
                <span>{insights.insights.appreciations}</span>
              </div>
            </div>
            <div className="col-md-3">
              <div className="followers">
                <h3>Followers</h3>
                <span>{insights.insights.followers}</span>
              </div>
            </div>
            <div className="col-md-3">
              <div className="following">
                <h3>Following</h3>
                <span>{insights.insights.following}</span>
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

            {insights.artworks.map((artwork, index) => (
              <div key={index} className="row table-row">
                <div className="col-md-2">
                  <div className="performance-image">
                    <div className="overley"></div>
                    <Image
                      src={artwork.photos?.[0] ?? "/images/default-artwork.jpg"}
                      alt="image"
                      width={140}
                      height={140}
                      objectFit="cover"
                      quality={70}
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="performance-info">
                    <h3>
                      {artwork.name} , {artwork.art_type} , {artwork.sizes_prices ? `EGP ${Object.values(artwork.sizes_prices)[0]}` : "N/A"}
                    </h3>
                    <span>Published {new Date(artwork.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="performance-view text-center">
                    <span>{artwork.views}</span>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="performance-appreciations text-center">
                    <span>{artwork.appreciations}</span>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="performance-artwork-status text-center">
                    <span>{(artwork.status.replace('_', ' '))}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="insights-mobile text-center d-lg-none d-md-none d-xl-none d-sm-block">
        <div className="box-total-sales-mobile">
          <div className="row">
            <div className="col-7">
              <div className="total-sales">
                <h3>Total Sales Amount</h3>
                <span>EGP {insights.insights.total_sales.toLocaleString()}</span>
              </div>
            </div>
            <div className="col-5">
              <div className="total-sold">
                <h3>Total Sold Artworks</h3>
                <span>{insights.insights.total_sold_artworks}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="box-views-mobile">
          <div className="row">
            <div className="col-3">
              <div className="total-todo">
                <h3>To Do</h3>
                <span>{insights.insights.to_do_count}</span>
              </div>
            </div>
            <div className="col-3">
              <div className="total-viewa">
                <h3>Profile Views</h3>
                <span>{insights.insights.profile_views.toLocaleString()}</span>
              </div>
            </div>
            <div className="col-3">
              <div className="project-amount">
                <h3>Project Views</h3>
                <span>{insights.insights.project_views.toLocaleString()}</span>
              </div>
            </div>
            <div className="col-3">
              <div className="appreciations">
                <h3>Appreciations</h3>
                <span>{insights.insights.appreciations}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="box-followers-mobile">
          <div className="row">
            <div className="col-4">
              <div className="followers">
                <h3>Followers</h3>
                <span>{insights.insights.followers}</span>
              </div>
            </div>
            <div className="col-4">
              <div className="following">
                <h3>Following</h3>
                <span>{insights.insights.following}</span>
              </div>
            </div>
            <div className="col-4">
              <div className="sold-out">
                <h3>Sold Out</h3>
                <span>{insights.sold_out_artworks.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Insights;
