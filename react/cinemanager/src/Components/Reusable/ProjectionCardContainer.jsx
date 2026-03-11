import "../../style/moviecard.css";
import ProjectionCard from "./ProjectionCard";

function ProjectionCardContainer({ cardData }) {
  var cards = [];
  for (var i = 0; i < cardData.length; i++) {
    cards.push(<ProjectionCard key={i} projID={cardData[i].id} title={cardData[i].film.naziv} location={cardData[i].objekat.naziv} date={cardData[i].datum} timeStart={cardData[i].vreme_pocetka} timeEnd={cardData[i].vreme_kraja}></ProjectionCard>);
    cards.push(<br />);
    console.log(i);
    console.log(cards);
  }
  console.log(cardData);
  console.log(cards);
  if (cards.length == 0) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h3>No projections to show.</h3>
      </div>
    );
  }
  return <div className="d-flex flex-column align-items-center justify-content-center">{cards}</div>;
}

export default ProjectionCardContainer;
