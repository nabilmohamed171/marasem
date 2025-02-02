import Link from "next/link";
import "./upper.css";

const Upper = () => {
  return (
    <div className="upper-nav">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                EGY
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link href="#" className="dropdown-item">
                    EN
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col">
            <div className="upper-nav-link">
              <Link href="#">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upper;
