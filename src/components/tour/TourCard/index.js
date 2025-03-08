import { React, useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";
import ImageSlider from "../ImageSlider";
import styles from "./styles.module.scss";
import Header from "../../../components/navigation/Header";
import blueBG from "../../../assets/imgs/DrexelBlue.svg";
import CircleButton from "../../../components/common/CircleButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faArrowLeftLong,
  faArrowRightLong,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import SpecialFacilities from "../SpecialFacilities";
import ScrollButtons from "../../navigation/ScrollButtons";
import VoiceoverIcon from "../../../assets/icons/voiceover.svg";
import NotesIcon from "../../../assets/icons/notes-outline.svg";
import Button from "../../common/Button";

const TourCard = ({ tag, closeCard, viewNextStop, currentStopNumber }) => {
  const [cardData, setCardData] = useState(null);

  const tagId = tag;

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

  const getHeadersFromDatabase = (cardData) => {
    // Define the columns to check
    const columns = ["header1", "header2", "header3", "header4"];

    // Filter out columns with no value and map to their values
    const headers = columns
      .map((column) => cardData?.[column]?.trim()) // Trim whitespace and handle undefined/null
      .filter((header) => header); // Remove empty strings, null, or undefined

    return headers;
  };

  const headers = cardData ? getHeadersFromDatabase(cardData) : [];

  const navigate = useNavigate();
  console.log(cardData);

  return (
    <>
      <div className="mainContent mainContentChooseTour tourCardContent">
        {/* <div> */}
        <div className={styles.cardTop}>
          <Header HeaderIMG={blueBG} height="90px" swoopTop="53px" />
          <div className="backButton">
            <CircleButton
              icon={<FontAwesomeIcon icon={faArrowLeftLong} />}
              bgColor="#D0E4F6"
              iconColor="#07294d"
              onClick={() => closeCard()}
            />
          </div>
          <div className="voiceoverButton">
            <CircleButton
              icon={<img src={VoiceoverIcon} alt="Voiceover Icon" />}
              bgColor="#D0E4F6"
              iconColor="#07294d"
              onClick={() => navigate("#")}
            />
          </div>
          <div className="exitButton">
            <CircleButton
              icon={<FontAwesomeIcon icon={faXmark} />}
              bgColor="#D0E4F6"
              iconColor="#07294d"
              onClick={() => navigate("#")}
            />
          </div>
          <div className={styles.cardtitle}>
            <div className={styles.titleNum}>
              <div>
                <p>{currentStopNumber}</p>
              </div>
              <div>
                <h1> {cardData?.title} </h1>
                <h2> {cardData?.subTitle} </h2>
              </div>
            </div>

            <div className={styles.notesButton}>
              <CircleButton
                icon={<img src={NotesIcon} />}
                bgColor="#0BA3A8"
                iconColor="white"
                onClick={() => navigate("#")}
              />
            </div>
          </div>
          {headers.length > 0 && (
            <ScrollButtons
              headers={headers}
              scrollOffset={210}
              topBuffer={-300}
              bottomBuffer={-300}
            />
          )}
          {/* </div> */}
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
            <p className={styles.invis}>&nbsp;</p> // Render nothing (or an empty space) if there are no images
          )}

          {cardData?.facilitiesText && cardData.facilitiesText.length > 0 ? (
            <SpecialFacilities
              facilitiesTextS={cardData.facilitiesText}
              facilitiesIcons={cardData.facilitiesIcons}
            />
          ) : (
            <p className={styles.invis}>&nbsp;</p> // Fallback message
          )}

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
              <p className={styles.invis}>&nbsp;</p> // Render nothing (or an empty space) if there are no images
            )}
          </div>
          {cardData?.header3 && ( // Only render the block if header3 is not null
            <div>
              <h3>{cardData.header3}</h3> {/* Render the header */}
              {cardData?.body3?.length > 0 && // Check if body3 exists and has items
                cardData.body3.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}{" "}
              {/* Render body3 paragraphs */}
              {/* Render images */}
              {cardData?.image3?.length > 0 ? ( // Check if there are images
                cardData.image3.length === 1 ? ( // Check if there's exactly 1 image
                  <img src={cardData.image3[0]} alt="Single Image" /> // Render a single img element
                ) : (
                  <ImageSlider images={cardData.image3} /> // Render the image slider for multiple images
                )
              ) : (
                <p className={styles.invis}>&nbsp;</p> // Render nothing (or an empty space) if there are no images
              )}
              {cardData?.body31?.length > 0 && // Check if body31 exists and has items
                cardData.body31.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}{" "}
              {/* Render body31 paragraphs */}
            </div>
          )}
          <div>
            <h3>{cardData?.header4}</h3>
            {cardData?.body4?.length > 0
              ? cardData.body4.map((item) => <p>{item}</p>)
              : null}
          </div>
        </div>
        <div class="CTAsingle">
          <Button
            text="NEXT STOP"
            icon={<FontAwesomeIcon icon={faArrowRightLong} />}
            bgColor="#07294d"
            borderColor="#07294d"
            onClick={() => viewNextStop()}
          />
        </div>
      </div>
    </>
  );
};

export default TourCard;
