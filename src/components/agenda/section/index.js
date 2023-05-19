import React from 'react';
import { connect } from 'react-redux';

import { Accordion, ReadOnly } from '../../';
import { noteActions } from '../../../state/actions';
import Note from '../note';
import './style.scss';

const Section = props => {
  const { createNote, icon, meetingId, title, readOnly } = props;

  const handleAddNewItem = async () => {
    createNote(meetingId);
  };

  const renderedNotes = [1, 2, 3].map(note => {
    return <Note key={note.id} note={note} meetingId={meetingId} />;
  });

  const hideAddItemClass = readOnly ? 'notes__add-item--hidden' : '';

  return (
    <Accordion title={title} icon={icon}>
      <ReadOnly readOnly={readOnly}>
        {' '}
        <div className='section__notes'>
          {renderedNotes}
          <div
            className={`notes__add-item ${hideAddItemClass}`}
            onClick={handleAddNewItem}
          >
            Add Item
            <i className='plus icon'></i>
          </div>
        </div>
      </ReadOnly>
    </Accordion>
  );
};

const mapStateToProps = state => {
  const {
    note: { notes },
    user: { accessToken },
  } = state;
  return { notes, accessToken };
};

const mapDispatchToProps = dispatch => {
  return {
    createNote: newNote => {
      dispatch(noteActions.createNote(newNote));
    },
    fetchAllNotes: meetingId => {
      dispatch(noteActions.fetchAllNotes(meetingId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Section);
