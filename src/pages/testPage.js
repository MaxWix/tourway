import React, { useState } from "react";
import Navbar from "../components/navigation/Navbar";
import InProgressCard from "../components/universities/InProgressCard";
import StopsProgress from "../components/tour/StopsProgress";
import CategoryTag from "../components/common/CategoryTag";
import Counselor from "../components/nextsteps/Counselor";
import ShareModal from "../components/modals/ShareModal";
const TestPage = () => {
  const handleTagStateChange = (newState) => {};

  return (
    <div className="TestPage">
      <h1>Test Page</h1>
      {/* <ShareModal/> */}
      <br></br>
      <div>
        <h4>In progress card</h4>
        <InProgressCard />
        <h4>Stops progress</h4>
        <StopsProgress stops="1/6" />
        <br></br>
        <h4>Tag with Toggle Ability</h4>
        <CategoryTag
          label="Toggle Tag"
          defaultSelected={false}
          selectable={true}
          onClick={handleTagStateChange}
        />
        <br></br>
        <br></br>
        <h4>Static Tag (Non-Selectable)</h4>
        <CategoryTag
          label="Static Tag"
          defaultSelected={true}
          selectable={false}
        />
        <br></br>
        <br></br>
        <h4>Counselor card</h4>
        <Counselor />
      </div>

      <div>
        <Navbar />
      </div>
    </div>
  );
};

export default TestPage;
