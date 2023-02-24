import "./banner.scss";

export default function Banner() {
  const aboutPage = false;

  return (
    <section className={aboutPage ? "banner_about" : "banner"}>
      {!aboutPage && <p>Chez vous, partout et ailleurs</p>}
    </section>
  );
}
