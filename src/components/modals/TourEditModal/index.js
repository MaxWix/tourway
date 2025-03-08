import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { supabase } from "../../../supabaseClient";
import Dropdown from "../../questionnaire/Dropdown";
import CircleButton from "../../common/CircleButton";
import addStopsIcon from "../../../assets/icons/add_stops-white.svg";

const TourEditModal = ({ onClose, matchedStops }) => {
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});

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

  const handleSaveChanges = () => {
    // Retrieve existing formData from localStorage
    const storedFormData = localStorage.getItem("formData");
    let formData = storedFormData ? JSON.parse(storedFormData) : {};

    // Ensure formData.selectedStops is an array
    if (!Array.isArray(formData.selectedStops)) {
      formData.selectedStops = [];
    }

    // Extract values from selectedOptions and flatten into a single array
    const newStops = Object.values(selectedOptions).flat();

    formData.selectedStops = [
      ...new Set([...formData.selectedStops, ...newStops]),
    ];

    localStorage.setItem("formData", JSON.stringify(formData));
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalCon}>
        <div className={styles.modalHeader}>
          <div>
            <img src={addStopsIcon} />
            <h2>Add Stops</h2>
          </div>

          <CircleButton
            icon={<FontAwesomeIcon icon={faXmark} />}
            bgColor="#D0E4F6"
            iconColor="#07294D"
            onClick={onClose}
          />
        </div>
        <div className={styles.modalContent}>
          <div className={styles.stopsSearchBar}>
            <input type="text" placeholder="Search for stops to add" />
            <FontAwesomeIcon
              className={styles.searchIcon}
              icon={faMagnifyingGlass}
            />
          </div>
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
        <button onClick={handleSaveChanges}> SAVE CHANGES</button>
      </div>
    </div>
  );
};

export default TourEditModal;
