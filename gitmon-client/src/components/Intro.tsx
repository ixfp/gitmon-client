import React from "react";
import ReactMarkdown from "react-markdown";
import Loading from "./Loading";
import { useDummyData } from "@hooks/temp/useDummyData";
import { Card } from "./components/ui/card";

const IntroComponent: React.FC = () => {
  const { data, isLoading, isError } = useDummyData("dummyIntro");

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !data) {
    return <div>Error fetching data</div>;
  }

  return (
    <Card className="max-w-4xl mx-auto my-8 p-6">
      <ReactMarkdown>{data.intro}</ReactMarkdown>
    </Card>
  );
};

export default IntroComponent;
