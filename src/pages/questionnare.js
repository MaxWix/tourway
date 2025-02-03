import { React } from "react";

import NavMenu from "../components/navigation/NavMenu";
import QuestionnareCard from "../components/questionnaire/QuestionnareCard";

const Questionnare = () => {
  const questions = [
    {
      id: 1,
      label: "What year will you be entering?",
      name: "year",
      isCheckbox: false,
      hasAccordion: false,
      options: [
        {
          id: "freshmanHousing",
          value: "freshmanHousing",
          label: "First Year",
        },
        {
          id: "sophomoreHousing",
          value: "sophomoreHousing",
          label: "Second Year",
        },
        { id: "upper", value: "upper", label: "Upper Classmen" },
      ],
    },
    {
      id: 2,
      label: "What Major are you interested in?",
      name: "major",
      isCheckbox: true,
      hasAccordion: true,
      options: [
        {
          accordionLabel: "Lebow College of Business",
          accordionOptions: [
            { id: "accounting", value: "accounting", label: "Accounting" },
          ],
        },
        {
          accordionLabel: "Westphal College of Art and Design",
          accordionOptions: [
            {
              id: "graphicDesign",
              value: "graphicDesign",
              label: "Graphic Design",
            },
          ],
        },
      ],
    },
    {
      id: 3,
      label: "What activities are you interesting in?",
      name: "activities",
      isCheckbox: true,
      hasAccordion: false,
      options: [
        {
          id: "performingArts",
          value: "performingArts",
          label: "Performing Arts",
        },
        { id: "workout", value: "workout", label: "Gym and sports" },
      ],
    },
  ];

  return (
    <div className="TourReview">
      <h1>Questionnare</h1>
      <NavMenu />
      <QuestionnareCard questions={questions} />
    </div>
  );
};

export default Questionnare;
