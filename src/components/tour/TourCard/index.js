import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../supabaseClient";
import ImageSlider from "../ImageSlider";
import styles from "./styles.module.scss";
import Header from "../../../components/navigation/Header";
import blueBG from "../../../assets/imgs/DrexelBlue.svg";
import CircleButton from "../../../components/common/CircleButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faArrowRightLong,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import SpecialFacilities from "../SpecialFacilities";
import ScrollButtons from "../../navigation/ScrollButtons";
import VoiceoverIcon from "../../../assets/icons/voiceover.svg";
import NotesIcon from "../../../assets/icons/notesblack.svg";
import Button from "../../common/Button";
import ExitModal from "../../modals/ExitModal";


const TourCard = ({
  tag,
  closeCard,
  viewNextStop,
  currentStopNumber,
  currentStopIndex,
  totalStops,
}) => {
  const [cardData, setCardData] = useState(null);
  const [majors, setMajors] = useState([]);
  const [selectedMajor, setSelectedMajor] = useState(null);  
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [isExitModalClosing, setIsExitModalClosing] = useState(false);
  
  const navigate = useNavigate();

  const isLastStop = currentStopIndex === totalStops - 1;

  const handleNextClick = () => {
    if (isLastStop) {
      navigate("/tour/summary"); // Navigate to summary page
    } else {
      viewNextStop(); // Go to next stop
    }
  };

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

  const fetchMajors = async (tag) => {
    console.log(cardData?.catTags);
    if (!tag || cardData?.catTags !== "Academic") return;
    console.log("fetching...", tag);
    const { data, error } = await supabase
      .from("majorsContent")
      .select("*")
      .like("id", `${tag}%`); // Match IDs starting with `tag`\\

    console.log("majros", data);

    if (error) {
      console.error("Error fetching majors:", error);
    } else {
      setMajors(data);
    }
  };

  useEffect(() => {
    if (cardData && cardData.tag && cardData.catTags === "Academic") {
      fetchMajors(cardData.tag);
    }
  }, [cardData]);

  const handleMajorClick = (major) => {
    // Set selectedMajor to the clicked major's id or null if it's already selected
    setSelectedMajor(major.id);
    console.log("set");
  };

  const handleCloseExitModal = () => {
    setIsExitModalClosing(true);
    
    setTimeout(() => {
      setIsExitModalOpen(false);
      setIsExitModalClosing(false);
    }, 400); // Match animation duration
  };
  const handleExitTour = () => {
    localStorage.clear();
    navigate("/tour/summary");
  };

  console.log(cardData);
  console.log(majors);

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
              onClick={() => setIsExitModalOpen(true)}
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
                bgColor="#ffc600"
                iconColor="black"
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
            cardData.headerImages?.length === 1 ? ( // Check if there's exactly 1 image
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
            {cardData?.body1?.length > 0
              ? cardData.body1.map((item) => <p>{item}</p>)
              : null}
          </div>
          {majors.length > 0 && (
              <div>
                <h3>Related Majors</h3>
                <div className={styles.scrollButtonsHolder}>
                  {majors.map((major, index) => (
                    <button
                      key={index}
                      onClick={() => handleMajorClick(major)}
                      className={selectedMajor === major.id ? styles.active : ""}
                    >
                      {major.name}
                    </button>
                  ))}
                </div>
                {selectedMajor && (
                  <div>
                    {majors
                      .filter((major) => major.id === selectedMajor)
                      .map((major) => {
                        const content = Array.isArray(major.content)
                          ? major.content.map((text, index) => <p key={index}>{text}</p>)
                          : <p>{major.content || "No additional details available."}</p>;

                        const images = major?.imgs?.length > 0 ? (
                          major.imgs.length === 1 ? (
                            <img
                              src={major.imgs[0]}
                              alt={`${major.name || 'Major'} image`}
                              className={styles.majorImage || ''}
                            />
                          ) : (
                            <ImageSlider images={major.imgs} />
                          )
                        ) : null;

                        return (
                          <div key={major.id}>
                            {images}

                            {content}
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            )}
          <div>
            <h3>{cardData?.header2}</h3>
            {cardData?.body2?.length > 0
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
              ? cardData.body4?.map((item) => <p>{item}</p>)
              : null}
          </div>
        </div>
        <div class="CTAsingle">
          <p className={styles.tourNum}>
            <b>{currentStopNumber}/{totalStops}</b> stops
          </p>
          <Button
            text={isLastStop ? "FINISH TOUR" : "NEXT STOP"}
            icon={<FontAwesomeIcon icon={faArrowRightLong} />}
            bgColor="#07294d"
            borderColor="#07294d"
            onClick={handleNextClick}
          />
        </div>
        </div>
        {isExitModalOpen && (
              <div className={`exitModalCon ${isExitModalClosing ? 'closing' : ''}`}>
                <ExitModal
                  handleExitTour={handleExitTour}
                  setIsExitModalOpen={handleCloseExitModal}
                  isClosing={isExitModalClosing}
                />
              </div>
            )}
  
    </>
  );
};

export default TourCard;
