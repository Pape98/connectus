import React from 'react';

import "./style.scss";

const Dates = ({titles}) => {

    const renderedTitles = titles.map((title, key) => {
        return (
            <div className="dates__item" key={key}>
                {title}
            </div>
        );
    });

    return (
        <div className="dates-container">
            <div className="dates">
            {renderedTitles}
            </div>
        </div>
    );
};

export default Dates;