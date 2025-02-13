import DropFlag from "@/components/dropFlags/DropFlags";
import "./edit-profile.css";

const EditProfile = () => {
  return (
    <>
      <div className="section-edit-profile section-edit-profile-pc  d-sm-none d-md-block d-xl-block d-lg-block">
        <form className="form-edit-profile">
          <div className="row">
            <div className="col-4">
              <h2>General Info</h2>
            </div>
            <div className="col-8">
              <div className="button-reset-update">
                <button type="button" className="reset">
                  Reset
                </button>
                <button type="button" className="update">
                  Save Update
                </button>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="general-info">
                <div className="first-name">
                  <label htmlFor="firstName" className="form-label">
                    First name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="Omar"
                  />
                </div>
                <div className="dropdown-country">
                  <div className="dropdown-flags-create-account">
                    <label htmlFor="phoneNumber" className="form-label">
                      Phone Number
                    </label>
                    <DropFlag onChange={(country) => console.log(country)} />
                  </div>
                </div>
                <div className="creat-artist-account">
                  <div className="row">
                    <div className="col-md-6 col-12">
                      <p>Creat Artist Account</p>
                    </div>
                    <div className="col-md-6 col-12">
                      <button type="button">I`m an Artist</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="last-name">
                <label htmlFor="lastName" className="form-label">
                  Last name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Mohsen"
                />
              </div>
              <div className="email-address">
                <label htmlFor="emailAddress" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="emailAddress"
                  placeholder="o.m.elkhodty@gmail.com"
                />
              </div>
              <button type="button" className="change-password">
                Change Password
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="section-edit-profile d-lg-none d-md-none d-xl-none d-sm-block">
        <form className="form-edit-profile">
          <div className="row">
            <div className="col-4">
              <h2>General Info</h2>
            </div>
            <div className="col-8">
              <div className="button-reset-update">
                <button type="button" className="reset">
                  Reset
                </button>
                <button type="button" className="update">
                  Save Update
                </button>
              </div>
            </div>

            <div className="col-6">
              <div className="first-name">
                <label htmlFor="firstName" className="form-label">
                  First name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="Omar"
                />
              </div>
            </div>
            <div className="col-6">
              <div className="last-name">
                <label htmlFor="lastName" className="form-label">
                  Last name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Mohsen"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="dropdown-country">
                <div className="dropdown-flags-create-account">
                  <label htmlFor="phoneNumber" className="form-label">
                    Phone Number
                  </label>
                  <DropFlag onChange={(country) => console.log(country)} />
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="email-address">
                <label htmlFor="emailAddress" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="emailAddress"
                  placeholder="o.m.elkhodty@gmail.com"
                />
              </div>
            </div>
            <div className="col-12">
              <button type="button" className="change-password">
                Change Password
              </button>
            </div>
            <div className="col-12">
              <div className="creat-artist-account creat-artist-account-sm">
                <div className="row">
                  <div className="col-6">
                    <p>Creat Artist Account</p>
                  </div>
                  <div className="col-6">
                    <button type="button">I`m an Artist</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
