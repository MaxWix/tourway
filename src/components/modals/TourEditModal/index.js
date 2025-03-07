import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { supabase } from "../../../supabaseClient";
import Dropdown from "../../questionnaire/Dropdown";

const TourEditModal = ({ onClose, matchedStops }) => {
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});

  console.log(matchedStops);

  // Fetch questionnaire data and filter for "major"
  useEffect(() => {
    const fetchQuestions = async () => {
      const { data, error } = await supabase.from("questionnare").select("*");
      if (error) {
        console.error("Error fetching questions:", error);
        return;
      }

      // Get the list of already selected tags
      const existingTags = new Set(matchedStops.map((stop) => stop.tag));

      // Filter out majors that already exist in matchedStops
      const majorQuestions = data
        .filter((item) => item.name === "major")
        .map((question) => ({
          ...question,
          options: question.options.map((option) => ({
            ...option,
            accordionOptions: option.accordionOptions.filter(
              (opt) => !existingTags.has(opt.value)
            ),
          })),
        }));

      setQuestions(majorQuestions);
    };

    fetchQuestions();
  }, [matchedStops]);

  console.log(questions);

  // Handle changes when checkboxes are selected
  const handleOptionChange = (name, value) => {
    const updatedValues = Array.isArray(value) ? value : [value]; // Ensure it's always an array

    setSelectedOptions((prev) => ({
      ...prev,
      [name]: updatedValues,
    }));

    return updatedValues; // Return only the array of values
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <h2>Edit Tour</h2>

        {/* Display Dropdown Only if There are Questions */}
        {questions.length > 0 ? (
          <Dropdown
            accordionOptions={questions[0]?.options}
            selectedOptions={selectedOptions}
            onChange={handleOptionChange}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default TourEditModal;
