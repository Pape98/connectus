import React from "react";

import Checkbox from "./checkbox";
import Input from "./input";
import Picker from "./picker";
import Radio from "./radio";
import Selection from "./selection";
import TextArea from "./textArea";

const Form = ({ children }) => {
  return <>{children}</>;
};

Form.Checkbox = Checkbox;
Form.Input = Input;
Form.Radio = Radio;
Form.Selection = Selection;
Form.Picker = Picker;
Form.TextArea = TextArea;

export default Form;
