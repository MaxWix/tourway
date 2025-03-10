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
      <Header HeaderIMG={QuestionnaireILL1} height="155px" swoopTop="53px" />
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
          Answer <b>5 questions </b> below to build your own tour!
        </p>

        {questions.length > 2 && <QuestionnareCard questions={questions} />}
      </div>
    </div>
  );
};

export default Questionnare;
