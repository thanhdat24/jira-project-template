import ConentMain from "../../../components/Cyberbugs/Main/ConentMain";
import HeaderMain from "../../../components/Cyberbugs/Main/HeaderMain";
import InfoMain from "../../../components/Cyberbugs/Main/InfoMain";
import React from "react";

export default function indexCyberBugs() {
  return (
    <div className="main">
      <HeaderMain />
      <h3>Cyber Board</h3>
      <InfoMain />
      <ConentMain />
    </div>
  );
}
