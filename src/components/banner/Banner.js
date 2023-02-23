import "./banner.scss";

import { useState } from "react";

export default function Banner() {
  const [aboutPage] = useState(false);

  return (
    <section className={aboutPage ? "banner_about" : "banner"}>
      {!aboutPage && <p>Chez vous, partout et ailleurs</p>}
    </section>
  );
}
