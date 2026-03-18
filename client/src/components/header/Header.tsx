import { Link } from "react-router";

export default function Header() {
  return (
    <header>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            daisyUI
          </Link>
        </div>
        <div className="flex gap-2">
          <Link to="/register" className="btn">
            Inscription
          </Link>
          <Link to="/login" className="btn">
            Connexion
          </Link>
        </div>
      </div>
    </header>
  );
}
