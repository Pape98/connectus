import About from "./about";
import Additional from "./additional";
import Communication from "./communication";
import Interests from "./interests";
import Peeves from "./peeves";
import Praise from "./praise";
import Significant from "./significant";
import Support from "./support";

import {
  AboutComponents,
  PraiseComponents,
  SupportComponents,
  CommunicationComponents,
  PreferenceComponents,
  InterestsComponents,
} from "./questions";

import "./style.scss";

const Questions = ({ children }) => {
  return children;
};

Questions.About = About;
Questions.Additional = Additional;
Questions.Communication = Communication;
Questions.Interests = Interests;
Questions.Peeves = Peeves;
Questions.Praise = Praise;
Questions.Significant = Significant;
Questions.Support = Support;

Questions.AboutComponents = AboutComponents;
Questions.CommunicationComponents = CommunicationComponents;
Questions.PraiseComponents = PraiseComponents;
Questions.SupportComponents = SupportComponents;
Questions.PreferenceComponents = PreferenceComponents;
Questions.InterestsComponents = InterestsComponents;

export default Questions;
