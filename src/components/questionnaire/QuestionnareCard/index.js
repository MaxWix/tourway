import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Checkbox from "../Checkbox";
import Radio from "../Radio";
import styles from "./styles.module.scss";
import ProgressBar from "../ProgressBar";
import Dropdown from "../Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

const QuestionnareCard = ({ questions }) => {
  const navigate = useNavigate();
  // Sort questions by ID before using them
  const sortedQuestions = [...questions].sort((a, b) => {
    // If questions have numeric IDs
    return parseInt(a.id) - parseInt(b.id);
    // Or if IDs are strings: return a.id.localeCompare(b.id);
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleChange = (name, value) => {
    const updatedValues = Array.isArray(value) ? value : [value]; // Ensure it's always an array

    setSelectedOptions((prev) => ({
      ...prev,
      [name]: updatedValues,
    }));

    return updatedValues; // Return only the array of values
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("formData", JSON.stringify(selectedOptions));
    navigate("/tour/overview");
  };

  const handleNext = (e) => {
    e.preventDefault(); // Prevent form submission
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleStepClick = (index) => {
    setCurrentQuestionIndex(index);
  };

  const currentQuestion = sortedQuestions[currentQuestionIndex];
  const currentQuestionNumber = currentQuestionIndex + 1;

  return (
    <>
      <ProgressBar
        questions={sortedQuestions}
        currentQuestion={currentQuestionIndex}
        onStepClick={handleStepClick}
      />
      <form
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        onSubmit={handleSubmit}
      >
        <div className={styles.questionCon}>
          <div>
            <p className={styles.questionLabel}>{currentQuestion.label}</p>
            {currentQuestion.hasAccordian ? (
              <Dropdown
                accordionOptions={currentQuestion.options}
                selectedOptions={selectedOptions}
                onChange={handleChange}
              />
            ) : currentQuestion.isCheckbox ? (
              <Checkbox
                options={currentQuestion.options}
                name={currentQuestion.name}
                selectedValues={selectedOptions[currentQuestion.name] || []}
                onChange={handleChange}
              />
            ) : (
              <Radio
                options={currentQuestion.options}
                name={currentQuestion.name}
                selectedValue={selectedOptions[currentQuestion.name]?.[0] || ""}
                onChange={handleChange}
              />
            )}
          </div>
          <div className={styles.navigationButtons}>
            <div className={styles.btnsWhiteBg}>
              <p className={styles.questNum}>
                <b>
                  {currentQuestionNumber}/{questions.length}
                </b>
                questions
              </p>
              {currentQuestionIndex < sortedQuestions.length - 1 ? (
                <button
                  type="button"
                  className={styles.nextButton}
                  onClick={handleNext}
                >
                  Next{" "}
                  <span>
                    {" "}
                    <FontAwesomeIcon icon={faArrowRightLong} />{" "}
                  </span>
                </button>
              ) : (
                <button type="submit">
                  Submit{" "}
                  <span>
                    {" "}
                    <FontAwesomeIcon icon={faArrowRightLong} />
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default QuestionnareCard;
