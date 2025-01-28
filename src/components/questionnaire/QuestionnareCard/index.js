import { React, useState } from "react";
import Checkbox from "../Checkbox";
import Radio from "../Radio";
import styles from "./styles.module.scss";
import ProgressBar from "../ProgressBar";
import Dropdown from "../Dropdown";

const QuestionnareCard = ({ questions }) => {
  const [formData, setFormData] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Submit formData to the backend or handle it as needed
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
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
      <form onSubmit={handleSubmit}>
        <div className={styles.questionCon}>
          <div key={currentQuestion.id} style={{ marginBottom: "1rem" }}>
            <p>{currentQuestion.label}</p>
            {currentQuestion.hasAccordion ? (
              <Dropdown accordionOptions={currentQuestion.options} />
            ) : currentQuestion.isCheckbox ? (
              <Checkbox
                options={currentQuestion.options}
                name={currentQuestion.name}
                onChange={handleChange}
              />
            ) : (
              <Radio
                options={currentQuestion.options}
                name={currentQuestion.name}
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
                className={styles.nextButton}
                type="button"
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
