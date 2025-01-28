import React from "react";
import NavMenu from "../components/navigation/NavMenu";
import QuestionnareCard from "../components/questionnaire/QuestionnareCard";

const Questionnare = () => {
  const questions = [
    {
      id: 1,
      label: "What are your favorite colors?",
      name: "favoriteColors",
      isCheckbox: true,
      hasAccordion: false,
      options: [
        { id: "red", value: "red", label: "Red" },
        { id: "blue", value: "blue", label: "Blue" },
        { id: "green", value: "green", label: "Green" },
      ],
    },
    {
      id: 2,
      label: "What is your preferred mode of transport?",
      name: "preferredTransport",
      isCheckbox: false,
      hasAccordion: false,
      options: [
        { id: "car", value: "car", label: "Car" },
        { id: "bike", value: "bike", label: "Bike" },
        { id: "walk", value: "walk", label: "Walk" },
      ],
    },
    {
      id: 3,
      label: "What is your favorite type of cuisine?",
      name: "favoriteCuisine",
      isCheckbox: true,
      hasAccordion: true,
      options: [
        {
          accordionLabel: "Italian Cuisine",
          accordionOptions: [
            { id: "italian", value: "italian", label: "Italian" },
            { id: "japanese", value: "japanese", label: "Japanese" },
            { id: "greek", value: "greek", label: "Greek" },
            { id: "spanish", value: "spanish", label: "Spanish" },
          ],
        },
        {
          accordionLabel: "Mexican Cuisine",
          accordionOptions: [
            { id: "mexican", value: "mexican", label: "Mexican" },
            { id: "indian", value: "indian", label: "Indian" },
            { id: "thai", value: "thai", label: "Thai" },
            { id: "vietnamese", value: "vietnamese", label: "Vietnamese" },
          ],
        },
      ],
    },
    {
      id: 4,
      label: "Do you like to travel frequently?",
      name: "frequentTraveler",
      isCheckbox: false,
      hasAccordion: false,
      options: [
        { id: "yes", value: "yes", label: "Yes" },
        { id: "no", value: "no", label: "No" },
      ],
    },
    {
      id: 5,
      label: "What time of day do you prefer to work?",
      name: "workTimePreference",
      isCheckbox: true,
      hasAccordion: true,
      options: [
        {
          accordionLabel: "Morning Options",
          accordionOptions: [
            { id: "morning", value: "morning", label: "Morning" },
            {
              id: "earlyMorning",
              value: "earlyMorning",
              label: "Early Morning",
            },
            { id: "midMorning", value: "midMorning", label: "Mid Morning" },
          ],
        },
        {
          accordionLabel: "Afternoon Options",
          accordionOptions: [
            { id: "afternoon", value: "afternoon", label: "Afternoon" },
            {
              id: "lateAfternoon",
              value: "lateAfternoon",
              label: "Late Afternoon",
            },
          ],
        },
        {
          accordionLabel: "Evening Options",
          accordionOptions: [
            { id: "evening", value: "evening", label: "Evening" },
            { id: "lateEvening", value: "lateEvening", label: "Late Evening" },
          ],
        },
      ],
    },
    {
      id: 6,
      label: "Which pets do you own?",
      name: "ownedPets",
      isCheckbox: true,
      hasAccordion: false,
      options: [
        { id: "dog", value: "dog", label: "Dog" },
        { id: "cat", value: "cat", label: "Cat" },
        { id: "bird", value: "bird", label: "Bird" },
        { id: "fish", value: "fish", label: "Fish" },
      ],
    },
    {
      id: 7,
      label: "What is your preferred form of exercise?",
      name: "exercisePreference",
      isCheckbox: true,
      hasAccordion: true,
      options: [
        {
          accordionLabel: "Gym Options",
          accordionOptions: [
            { id: "gym", value: "gym", label: "Gym" },
            { id: "running", value: "running", label: "Running" },
            { id: "cycling", value: "cycling", label: "Cycling" },
            { id: "yoga", value: "yoga", label: "Yoga" },
          ],
        },
      ],
    },
    {
      id: 8,
      label: "What is your preferred way to relax?",
      name: "relaxationMethod",
      isCheckbox: true,
      hasAccordion: true,
      options: [
        {
          accordionLabel: "Reading & Meditation",
          accordionOptions: [
            { id: "reading", value: "reading", label: "Reading" },
            { id: "meditation", value: "meditation", label: "Meditation" },
            { id: "journaling", value: "journaling", label: "Journaling" },
            { id: "walking", value: "walking", label: "Walking" },
          ],
        },
        {
          accordionLabel: "Gaming & Watching TV",
          accordionOptions: [
            { id: "watchingTV", value: "watchingTV", label: "Watching TV" },
            { id: "gaming", value: "gaming", label: "Gaming" },
            {
              id: "bingeWatching",
              value: "bingeWatching",
              label: "Binge Watching",
            },
            { id: "streaming", value: "streaming", label: "Streaming" },
          ],
        },
      ],
    },
    {
      id: 9,
      label: "Do you prefer working in a team or alone?",
      name: "teamPreference",
      isCheckbox: false,
      hasAccordion: false,
      options: [
        { id: "team", value: "team", label: "Team" },
        { id: "alone", value: "alone", label: "Alone" },
      ],
    },
    {
      id: 10,
      label: "What is your level of experience with coding?",
      name: "codingExperience",
      isCheckbox: false,
      hasAccordion: false,
      options: [
        { id: "beginner", value: "beginner", label: "Beginner" },
        { id: "intermediate", value: "intermediate", label: "Intermediate" },
        { id: "advanced", value: "advanced", label: "Advanced" },
      ],
    },
  ];

  console.log("Questionnare");
  return (
    <div className="TourReview">
      <h1>Questionnare</h1>
      <NavMenu />
      <QuestionnareCard questions={questions} />
    </div>
  );
};

export default Questionnare;
