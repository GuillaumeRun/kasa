import "./accommodation.scss";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import datas from "../../data/data";
import Header from "../../components/header/Header";
import Slider from "../../components/carrousel/Carrousel";
import Footer from "../../components/footer/Footer";
import Collapse from "../../components/collapse/Collapse";
import greyStar from "../../assets/grey_star.png";
import redStar from "../../assets/red_star.png";

function Accommodation() {
  const { id: idAccommodation } = useParams();
  const navigate = useNavigate();
  const [currentAccommodation, setCurrentAccommodation] = useState(null);
  const [imageSlider, setImageSlider] = useState([]);

  useEffect(() => {
    const accommodation = datas.find((data) => data.id === idAccommodation);
    if (!accommodation) {
      navigate("/NotFound");
    } else {
      setCurrentAccommodation(accommodation);
      setImageSlider(accommodation.pictures || []);
    }
  }, [idAccommodation, navigate]);

  if (!currentAccommodation) {
    return null;
  }

  const name = currentAccommodation.host.name.split(" ");
  const rating = currentAccommodation.rating || 0;
  const description = currentAccommodation.description;
  const equipments = currentAccommodation.equipments;

  return (
    <>
      <Header />
      <Slider imageSlider={imageSlider} />
      <main className="accommodation">
        <div className="accommodation_content">
          <div className="accommodation_content_infos">
            <h1>{currentAccommodation.title}</h1>
            <p>{currentAccommodation.location}</p>
            <div>
              {currentAccommodation.tags.map((tag, index) => (
                <button key={index}>{tag}</button>
              ))}
            </div>
          </div>
          <div className="accommodation_content_host">
            <div>
              <div className="accommodation_content_host_name">
                <span>{name[0]}</span>
                <span>{name[1]}</span>
              </div>
              <img
                src={currentAccommodation.host.picture}
                alt="accommodation's host"
              />
            </div>
            <div className="accommodation_content_host_stars">
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
        <div className="accommodation_collapse">
          <div className="accommodation_collapse_item">
            <Collapse title={"Description"} content={description} />
          </div>
          <div className="accommodation_collapse_item">
            <Collapse title={"Équipements"} content={equipments} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Accommodation;
