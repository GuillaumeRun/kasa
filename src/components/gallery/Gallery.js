import "./gallery.scss";
import datas from "../../data/data";
import Card from "../card/Card";

export default function Gallery() {
  return (
    <main className="home_gallery">
      {datas &&
        datas.map((data) => {
          return (
            <Card
              key={data?.id}
              id={data?.id}
              title={data?.title}
              cover={data?.cover}
            />
          );
        })}
    </main>
  );
}
// datas && datas vérifie si data a bien une valeur avant de faire la boucle map
