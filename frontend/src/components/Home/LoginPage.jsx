import HomePage from "../Home/HomePage";
import Last from "../Home/Last";
import Stats from "../Home/Stats";
import "./global.css";
import Login from "./Login";

const isBrowser = () => typeof window !== "undefined";
export default function LoginPage() {
  function handleBtn() {
    document.getElementById("form").scrollIntoView("behavior: smooth");
    return;
  }
  function handleNav() {
    // if (window.scrollY >= (document.getElementById("client").offsetTop - document.getElementById("navbar").clientHeight)) {
    //     document.getElementById("navbar").style.transition = "all 0.5s ease-in-out";
    //     document.getElementById("navbar").style.display = "none";
    // } else {
    //     document.getElementById("navbar").style.transition = "all 0.5s ease-in-out";
    //     document.getElementById("navbar").style.display = "flex"
    // }
  }

  if (isBrowser()) {
    window.addEventListener("scroll", handleNav);
  }

  return (
    <div>
      <title>Outliers</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />

      <main>
        {/* <Navbar /> */}
        <div className="section-1">
          <HomePage />
          <Login />
        </div>
        <Stats />
        <Last />
      </main>
      <footer>
        <span>©2023 Incento,Inc. All rights reserved.</span>
      </footer>
      <div className="get_started_btn">
        <div>
          Get a Call back from us{" "}
          <button onClick={handleBtn}>Get Started</button>
        </div>
      </div>
    </div>
  );
}
