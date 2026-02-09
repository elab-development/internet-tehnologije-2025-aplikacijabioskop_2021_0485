import "../../style/moviecard.css";
import MovieCard from "./MovieCard";

function MovieCardContainer({ cardData }) {
  var cards = [];
  for (var i = 0; i < cardData.length; i++) {
    cards.push(<MovieCard movieID={cardData[i].id} img={cardData[i].slika} title={cardData[i].naziv} desc={cardData[i].opis}></MovieCard>);
    cards.push(<br />);
    console.log(i);
    console.log(cards);
  }
  console.log(cardData);
  console.log(cards);
  if (cards.length == 0) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h3>No movies to show.</h3>
      </div>
    );
  }
  return <div className="d-flex flex-column align-items-center justify-content-center">{cards}</div>;
}

export default MovieCardContainer;
