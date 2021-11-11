import React from "react";
import { useForm, useStep } from "react-hooks-helper";
import { About } from "./stepForm/About";
import { Experience } from "./stepForm/Experience";
import { Rate } from "./stepForm/Rate";
import { Submit } from "./stepForm/Submit";

const defaultData = {
  company: "Select Compnay from given or Create New",
  profile: "",
  title: "",
  tags: "",

  experience: "# Add Your Experience as MarkDown",

  dataStructuresAndAlgoriths: 5,
  dbms: 5,
  operatingSystems: 5,
  computerNetworks: 5,
  systemDesign: 5,
  aptitude: 5,
  communicationSkills: 5,
};

const steps = [
  { id: "about" },
  { id: "experience" },
  { id: "rate" },
  { id: "submit" },
];

export const MultiStepForm = ({ state }) => {
  const [formData, setForm] = useForm(defaultData);
  const { step, navigation } = useStep({
    steps,
    initialStep: 0,
  });

  const props = { formData, setForm, navigation };

  switch (step.id) {
    case "about":
      return <About {...props} state={state} />;
    case "experience":
      return <Experience {...props} />;
    case "rate":
      return <Rate {...props} state={state} />;
    case "submit":
      return <Submit {...props} />;
    default:
      return (
        <div className="mt-2">
          <h1>Take You Corporates</h1>
        </div>
      );
  }
};
