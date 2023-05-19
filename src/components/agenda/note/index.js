import React, { useState } from "react";
import { connect } from "react-redux";

import { useIsAllowed } from "../../../hooks";
import { noteActions } from "../../../state/actions";
import { Form, Text } from "../..";
import { useGetEmployee } from "../../../hooks";
import "./style.scss";

const Note = (props) => {
  const { deleteNote, meetingId, note, updateNote } = props;
  const [isEditMode, setIsEditMode] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(note.is_priority);
  const author = useGetEmployee(note.created_by);
  const isNoteCreator = useIsAllowed(note.created_by);
  const highlighted = isHighlighted ? "note--highlighted " : "";
  const showTrashIcon = isNoteCreator ? "" : "note__trash--hidden";

  const deleteHandler = () => {
    deleteNote(meetingId, note.id);
  };

  const renderNoteText = () => {
    if (isNoteCreator) {
      return (
        <Text.Editable
          object={note}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          text={note.text}
          tag="input"
          updateText={updateNote}
          fieldName="text"
        ></Text.Editable>
      );
    } else {
      return <span>{note.text}</span>;
    }
  };

  if (author)
    return (
      <div className={`note ${highlighted}`}>
        <div className="note__checkbox">
          <Form.Checkbox
            note={note}
            isInForm={false}
            updateNote={updateNote}
            setIsHighlighted={setIsHighlighted}
            isDisabled={!isNoteCreator}
          />
        </div>
        <div className="note__content" onClick={() => setIsEditMode(true)}>
          <p className="content_text">
            <span className="editable__text">{renderNoteText()}</span>
          </p>
          <p className="content__author">
            Added by <u>{author.first_name + " " + author.last_name}</u>
          </p>
        </div>
        <div className="note__buttons">
          <i
            className={`${showTrashIcon}trash alternate outline icon`}
            onClick={deleteHandler}
          ></i>
        </div>
      </div>
    );

  return null;
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteNote: (meetingId, noteId) => {
      dispatch(noteActions.deleteNote(meetingId, noteId));
    },
    updateNote: (noteId, updates) => {
      dispatch(noteActions.updateNote(noteId, updates));
    },
  };
};
export default connect(null, mapDispatchToProps)(Note);
