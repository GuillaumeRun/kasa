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

export default function Accommodation() {
  const [imageSlider, setImageSlider] = useState([]);
  const navigate = useNavigate();

  const { id: idAccommodation } = useParams();

  const dataCurrentAccommodation = datas.filter(
    (data) => data.id === idAccommodation
  );

  useEffect(() => {
    const dataCurrentAccommodation = datas.filter(
      (data) => data.id === idAccommodation
    );
    setImageSlider(dataCurrentAccommodation[0]?.pictures || []);
  }, [idAccommodation]);

  const name = dataCurrentAccommodation[0]?.host.name.split(" ") || [];
  const rating = dataCurrentAccommodation[0]?.rating || 0;
  const description = dataCurrentAccommodation[0]?.description;
  const equipments = dataCurrentAccommodation[0]?.equipments;

  useEffect(() => {
    const isIdValid = datas.some((data) => data.id === idAccommodation);
    if (!isIdValid) {
      navigate("/NotFound");
    }
  }, [idAccommodation, navigate]);

  return (
    <>
      <Header />
      <Slider imageSlider={imageSlider} />
      <main className="accommodation">
        <div className="accommodation_content">
          <div className="accommodation_content_infos">
            <h1>{dataCurrentAccommodation[0]?.title}</h1>
            <p>{dataCurrentAccommodation[0]?.location}</p>
            <div>
              {dataCurrentAccommodation[0]?.tags?.map((tag, index) => {
                return <button key={index}>{tag}</button>;
              })}
            </div>
          </div>
          <div className="accommodation_content_host">
            <div>
              <div className="accommodation_content_host_name">
                <span>{name[0]}</span>
                <span>{name[1]}</span>
              </div>
              <img
                src={dataCurrentAccommodation[0]?.host.picture}
                alt="host of this accommodation"
              />
            </div>

            <div className="accommodation_content_host_stars">
              {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                  <img
                    key={index}
                    src={ratingValue <= rating ? redStar : greyStar}
                    alt="star"
                  />
                );
              })}
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
  )
            }
