import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

import Checkbox from "../Checkbox";
import Radio from "../Radio";
import styles from "./styles.module.scss";
import ProgressBar from "../ProgressBar";
import Dropdown from "../Dropdown";

const QuestionnareCard = ({ questions }) => {
  const navigate = useNavigate();
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
    console.log("Selected Option Values:", selectedOptions);

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

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      <ProgressBar
        questions={questions}
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
          <div style={{ marginBottom: "1rem" }}>
            <p className={styles.questionLabel}>{currentQuestion.label}</p>
            {currentQuestion.hasAccordion ? (
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
            {currentQuestionIndex > 0 && (
              <button type="button" onClick={handleBack}>
                Back
              </button>
            )}
            {currentQuestionIndex < questions.length - 1 ? (
              <button
                type="button"
                className={styles.nextButton}
                onClick={handleNext}
              >
                Next
              </button>
            ) : (
              <button type="submit">Submit</button>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default QuestionnareCard;
