const title = "Day Fruit – The easiest way to viewing fruit around.";
const description = "Viewing shop vary fruit type";

// automatic added into head
const SEO = {
  title,
  description,
  canonical: "https://dayfruit.staging.selfpaths.com",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://dayfruit.staging.selfpaths.com",
    title,
    description,
    images: [
      {
        url: "https://dayfruit.staging.selfpaths.com/og.png",
        alt: title,
        width: 1280,
        height: 720,
      },
    ],
  },
};

export default SEO;
