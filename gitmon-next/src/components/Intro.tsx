import { fetchIntro } from "@hooks/temp/useDummyData";
import React from "react";

import MarkdownRenderer from "./MarkdownRenderer";

const IntroComponent: React.FC = async () => {
  const { intro } = await fetchIntro();

  return <MarkdownRenderer markdown={intro} />;
};

export default IntroComponent;
