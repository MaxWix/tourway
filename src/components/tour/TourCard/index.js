import { React, useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";
import ImageSlider from "../ImageSlider";
import DrexelOverview1 from "../../../assets/imgs/drexel-overview-1.jpg";
import DrexelOverview2 from "../../../assets/imgs/drexel-overview-2.jpg";
import styles from "./styles.module.scss";
import Header from "../../../components/navigation/Header";
import blueBG from "../../../assets/imgs/DrexelBlue.svg";
import CircleButton from "../../../components/common/CircleButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import SpecialFacilities from "../SpecialFacilities";


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
  const navigate = useNavigate(); 
  console.log(cardData);
  return (
    <>

      <Header
      HeaderIMG={blueBG}
      height="156px"
      swoopTop="83px"
      />
      <div className="backButton">
      <CircleButton
          icon={<FontAwesomeIcon icon={faArrowLeftLong} />}
          bgColor="#DFF3F4"
          iconColor="#0BA3A8"
          onClick={() => navigate('../tour/overview')} 
        />
      </div>


      <div className="mainContent mainContentChooseTour">


      <div className={styles.cardHead}>
        <div>
          <p>
            #
          </p>
        </div>
        <div>
        <h1>{cardData?.title}</h1>
        <h2>{cardData?.subTitle}</h2>
        </div>
      </div>


      <div className={styles.allSections}>
   {/* For every image, put it in the slide */}
 {/* For every image, put it in the slide */}
 {cardData?.headerImages?.length > 0 ? ( // Check if there are images
      cardData.headerImages.length === 1 ? ( // Check if there's exactly 1 image
        <img src={cardData.headerImages[0]} alt="Single Image" /> // Render a single img element
      ) : (
        <ImageSlider images={cardData.headerImages} /> // Render the image slider for multiple images
      )
    ) : (
      <p>&nbsp;</p> // Render nothing (or an empty space) if there are no images
    )}  

{cardData?.facilitiesText && cardData.facilitiesText.length > 0 ? (
    <SpecialFacilities
      facilitiesIcons={cardData.facilitiesIcons} // Pass the icons array
      facilitiesTextS={cardData.facilitiesText} // Pass the text array
    />
  ) : (
    <p>&nbsp;</p> // Fallback message
  )
}

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

 {/* For every image, put it in the slide */}
 {cardData?.image2?.length > 0 ? ( // Check if there are images
      cardData.image2.length === 1 ? ( // Check if there's exactly 1 image
        <img src={cardData.image2[0]} alt="Single Image" /> // Render a single img element
      ) : (
        <ImageSlider images={cardData.image2} /> // Render the image slider for multiple images
      )
    ) : (
      <p> &nbsp; </p> // Render nothing (or an empty space) if there are no images
    )}   


      </div>
      {cardData?.header3 && ( // Only render the block if header3 is not null
  <div>
    <h3>{cardData.header3}</h3> {/* Render the header */}
    {cardData?.body3?.length > 0 && // Check if body3 exists and has items
      cardData.body3.map((item, index) => <p key={index}>{item}</p>)} {/* Render body3 paragraphs */}

    {/* Render images */}
    {cardData?.image3?.length > 0 ? ( // Check if there are images
      cardData.image3.length === 1 ? ( // Check if there's exactly 1 image
        <img src={cardData.image3[0]} alt="Single Image" /> // Render a single img element
      ) : (
        <ImageSlider images={cardData.image3} /> // Render the image slider for multiple images
      )
    ) : (
      <p>&nbsp;</p> // Render nothing (or an empty space) if there are no images
    )}

    {cardData?.body31?.length > 0 && // Check if body31 exists and has items
      cardData.body31.map((item, index) => <p key={index}>{item}</p>)} {/* Render body31 paragraphs */}
  </div>
)}
      <div>
        <h3>{cardData?.header4}</h3>
        {cardData?.body4?.length > 0
          ? cardData.body4.map((item) => <p>{item}</p>)
          : null}
      </div>
      </div>
      </div>
    </>
  );
};

export default TourCard;
