import axios from "axios";

export default function Layout({ children }) {
  return (
    <>
      <div className="container-fluid  ">
        <nav class="navbar nav-custom  row navbar-primary ">
          <a class="navbar-brand col-1" href="#">
            <h5 className="text-primary text-center ">Fast Chat</h5>
          </a>

          <div class="col-1">
            <button
              className="btn text-dark"
              onClick={async () => {
                var res = await axios.get("/signout");
                if (res.data.message === "redirect") {
                  window.location = "/login";
                }
              }}
            >
              logout
            </button>
          </div>
        </nav>
        <div className="nav"></div>

        <main>{children}</main>
      </div>
    </>
  );
}
