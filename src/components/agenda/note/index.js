import React, { useState } from 'react';
import { connect } from 'react-redux';

import { useIsAllowed } from '../../../hooks';
import { noteActions } from '../../../state/actions';
import { Form } from '../..';
import './style.scss';

const Note = props => {
  const { deleteNote, meetingId, note, updateNote } = props;
  const [isHighlighted, setIsHighlighted] = useState(note.is_priority);
  const isNoteCreator = useIsAllowed(note.created_by);
  const highlighted = isHighlighted ? 'note--highlighted ' : '';
  const showTrashIcon = isNoteCreator ? '' : 'note__trash--hidden';

  const deleteHandler = () => {
    deleteNote(meetingId, note.id);
  };

  return (
    <div className={`note ${highlighted}`}>
      <div className='note__checkbox'>
        <Form.Checkbox
          note={note}
          isInForm={false}
          updateNote={updateNote}
          setIsHighlighted={setIsHighlighted}
          isDisabled={!isNoteCreator}
        />
      </div>
      <div className='note__content'>
        <p className='content_text'>
          <span className='editable__text'>
            Vivamus aliquet pulvinar sagittis. Aliquam convallis nisi vitae
            bibendum vestibulum. Curabitur vehicula varius faucibus.{' '}
          </span>
        </p>
        <p className='content__author'>
          Added by <u>John Smith</u>
        </p>
      </div>
      <div className='note__buttons'>
        <i
          className={`${showTrashIcon}trash alternate outline icon`}
          onClick={deleteHandler}
        ></i>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
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
