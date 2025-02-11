import DropFlag from "@/components/dropFlags/DropFlags";
import "./edit-profile.css";

const EditProfile = () => {
  return (
    <div className="section-edit-profile">
      <form className="form-edit-profile">
        <div className="row">
          <div className="col-md-6">
            <div className="general-info">
              <h2>General Info</h2>
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
                  <div className="col-md-6">
                    <p>Creat Artist Account</p>
                  </div>
                  <div className="col-md-6">
                    <button type="button">I`m an Artist</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="button-reset-update">
              <button type="button" className="reset">
                Reset
              </button>
              <button type="button" className="update">
                Save Update
              </button>
            </div>
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
  );
};

export default EditProfile;
