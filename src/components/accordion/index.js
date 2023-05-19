import React from 'react';
import MaterialAccordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import './style.scss';

const CustomAccordion = ({ children, title, icon }) => {
  return (
    <div className='accordion'>
      <MaterialAccordion id='material-accordion' defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
          className='accordion__title'
        >
          <div className='section__title'>
            <i className={icon + ' icon title__icon'}></i>
            <div className='title__text'>{title}</div>
          </div>
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </MaterialAccordion>
    </div>
  );
};

export default CustomAccordion;
