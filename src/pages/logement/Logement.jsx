import "./logement.scss";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import datas from "../../data/data";
import Header from "../../components/header/Header";
import Slider from "../../components/carrousel/Carrousel";
import Footer from "../../components/footer/Footer";
import Collapse from "../../components/collapse/Collapse";
import greyStar from "../../assets/grey_star.png";
import redStar from "../../assets/red_star.png";

function Logement() {
  const { id: idLogement } = useParams();
  const navigate = useNavigate();
  const [currentLogement, setCurrentLogement] = useState(null);
  const [imageSlider, setImageSlider] = useState([]);

  useEffect(() => {
    const logement = datas.find((data) => data.id === idLogement);
    if (!logement) {
      navigate("/NotFound");
    } else {
      setCurrentLogement(logement);
      setImageSlider(logement.pictures || []);
    }
  }, [idLogement, navigate]);

  if (!currentLogement) {
    return null;
  }

  const name = currentLogement.host.name.split(" ");
  const rating = currentLogement.rating || 0;
  const description = currentLogement.description;
  const equipments = currentLogement.equipments;

  return (
    <>
      <Header />
      <Slider imageSlider={imageSlider} />
      <main className="logement">
        <div className="logement_content">
          <div className="logement_content_infos">
            <h1>{currentLogement.title}</h1>
            <p>{currentLogement.location}</p>
            <div>
              {currentLogement.tags.map((tag, index) => (
                <button key={index}>{tag}</button>
              ))}
            </div>
          </div>
          <div className="logement_content_host">
            <div>
              <div className="logement_content_host_name">
                <span>{name[0]}</span>
                <span>{name[1]}</span>
              </div>
              <img
                src={currentLogement.host.picture}
                alt="propiétaire"
              />
            </div>
            <div className="logement_content_host_stars">
              {[...Array(5)].map((_, index) => (
                <img
                  key={index}
                  src={index < rating ? redStar : greyStar}
                  alt="star"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="logement_collapse">
          <div className="logement_collapse_item">
            <Collapse title={"Description"} content={description} />
          </div>
          <div className="logement_collapse_item">
            <Collapse title={"Équipements"} content={equipments} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Logement;
