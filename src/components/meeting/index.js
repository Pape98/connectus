import Card from "./card";
import CreateNew from "./createNew";
import List from "./list";

const Meeting = ({ children }) => {
  return { children };
};

Meeting.Card = Card;
Meeting.List = List;
Meeting.CreateNew = CreateNew;

export default Meeting;
