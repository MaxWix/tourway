import { React, useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";
import ImageSlider from "../ImageSlider";
import DrexelOverview1 from "../../../assets/imgs/drexel-overview-1.jpg";
import DrexelOverview2 from "../../../assets/imgs/drexel-overview-2.jpg";
const TourCard = (tag) => {
  const [cardData, setCardData] = useState(null);

  const images = [DrexelOverview1, DrexelOverview2];

  const tagId = tag.tag;

  useEffect(() => {
    if (!tagId) return; // Prevent query if tag is null/undefined

    const fetchCardData = async () => {
      const { data, error } = await supabase
        .from("cardContent")
        .select("*")
        .eq("tag", tagId)
        .single();

      if (error) {
        console.error("Error fetching card data:", error);
      } else {
        setCardData(data);
        console.log("Data:", data);
      }
    };

    fetchCardData();
  }, [tagId]); // Runs when `tag` changes

  console.log(cardData);
  return (
    <>
      <div>
        <h1>{cardData?.title}</h1>
        <h2>{cardData?.subTitle}</h2>
      </div>
      <ImageSlider images={images} />
      <div>
        <h3>{cardData?.header1}</h3>
        {cardData?.body1.length > 0
          ? cardData.body1.map((item) => <p>{item}</p>)
          : null}
      </div>
      <div>
        <h3>{cardData?.header2}</h3>
        {cardData?.body2.length > 0
          ? cardData.body2.map((item) => <p>{item}</p>)
          : null}
        {/* quad images + facilities */}
        {cardData?.body21?.length > 0
          ? cardData.body21.map((item) => <p>{item}</p>)
          : null}
        <img src={cardData?.image2} alt=" 1" />
      </div>
      <div>
        <h3>{cardData?.header3}</h3>
        {cardData?.body3.length > 0
          ? cardData.body3.map((item) => <p>{item}</p>)
          : null}
        <img style={{ width: "20vh" }} src={cardData?.image3} alt="3" />
        {cardData?.body31.length > 0
          ? cardData.body31.map((item) => <p>{item}</p>)
          : null}
      </div>
      <div>
        <h3>{cardData?.header4}</h3>
        {cardData?.body4?.length > 0
          ? cardData.body4.map((item) => <p>{item}</p>)
          : null}
      </div>
    </>
  );
};

export default TourCard;
