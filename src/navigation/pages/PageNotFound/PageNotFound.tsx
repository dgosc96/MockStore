import { Link } from "react-router-dom";

export function PageNotFound() {
  return (
    <div className="">
      <h1>Sorry, the page you were looking for was not found.</h1>
      <Link to="/" className="link-button">
        Return to Home
      </Link>
    </div>
  );
}
