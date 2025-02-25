import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

import QuestionnareCard from "../components/questionnaire/QuestionnareCard";
import Header from "../components/navigation/Header";
import QuestionnaireILL1 from "../assets/tourway/questionnaire-ill1.png";
import QuestionnaireILL2 from "../assets/tourway/questionnaire-ill2.png";

import CircleButton from "../components/common/CircleButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const Questionnare = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);

  // const questions = [
  //   {
  //     id: 1,
  //     label: "What year will you be entering?",
  //     name: "year",
  //     illustration: QuestionnaireILL1,
  //     isCheckbox: false,
  //     hasAccordion: false,
  //     options: [
  //       {
  //         id: "freshmanHousing",
  //         value: "freshmanHousing",
  //         label: "Incoming Freshman",
  //       },
  //       {
  //         id: "sophomoreHousing",
  //         value: "sophomoreHousing",
  //         label: "Transfer Student",
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     label: "What Major are you interested in?",
  //     name: "major",
  //     isCheckbox: true,
  //     illustration: QuestionnaireILL2,
  //     hasAccordion: true,
  //     options: [
  //       {
  //         accordionLabel: "Business",
  //         accordionOptions: [
  //           { id: "accounting", value: "accounting", label: "Accounting" },
  //           { id: "marketing", value: "marketing", label: "Marketing" },

  //         ],
  //       },
  //       {
  //         accordionLabel: "Art and Design",
  //         accordionOptions: [
  //           {
  //             id: "graphicDesign",
  //             value: "graphicDesign",
  //             label: "Graphic Design",
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     label: "What activities are you interesting in?",
  //     name: "activities",
  //     isCheckbox: true,
  //     illustration: QuestionnaireILL1,
  //     hasAccordion: false,
  //     options: [
  //       {
  //         id: "performingArts",
  //         value: "performingArts",
  //         label: "Performing Arts and Music",
  //       },
  //       { id: "workout", value: "workout", label: "Gym and Sports" },
  //     ],
  //   },
  // ];

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data, error } = await supabase.from("questionnare").select("*");
      if (error) {
        console.error("error fetching questions:", error);
      } else {
        setQuestions(data);
        console.log(data);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="TourReview">
      <Header HeaderIMG={QuestionnaireILL1} height="155px" swoopTop="83px" />
      <div className="backButton">
        <CircleButton
          icon={<FontAwesomeIcon icon={faX} />}
          bgColor="#DFF3F4"
          iconColor="#0BA3A8"
          onClick={() => navigate("../university/choose-tour")}
        />
      </div>

      <div className="mainContent mainContentChooseTour">
        <h1>Tour Questionnaire</h1>
        <p>
          Answer <b>8 questions </b> below to build your own tour!
        </p>

        {questions.length > 2 && <QuestionnareCard questions={questions} />}
      </div>
    </div>
  );
};

export default Questionnare;
