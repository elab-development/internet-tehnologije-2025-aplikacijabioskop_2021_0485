import Header from "../Reusable/Header.jsx";
import Footer from "../Reusable/Footer.jsx";
import "../../style/pos.css";

function Home() {
  return (
    <div className="maincontent">
      <Header></Header>
      <br></br>
      <br></br>
      <div className="container text-center">
        <h1 className="centeredheadline">CINEPLAZA</h1>
        <img src="https://media.timeout.com/images/105771947/750/562/image.jpg" className="img-fluid" alt="cinema"></img>
        <br></br>
        <br></br>
        <p className="centeredheadline">
          Welcome to <i>CinePlaza</i> , your choice for fun! Whether it's a family movie night, a movie date or a solo watching experience - our cinema facilities are there to meet your needs! Find the best movie choices, ranging from classics to the newest blockbusters, across different genres like : comedy, horror, romantic movies etc. Have a fun cinematic experience!
        </p>
      </div>
      <br></br>
      <br></br>
      <Footer></Footer>
    </div>
  );
}

export default Home;
