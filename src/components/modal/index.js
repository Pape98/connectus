import React from "react";

import Contents from "./contents";
import "./style.scss";

const Modal = (props) => {
  const {
    OnNegativeButtonClick,
    onPositiveButtonClick,
    show,
    children,
    title,
    positiveLabel,
    negativeLabel,
    modalRef,
  } = props;

  const showHideClassName = show ? "modal--show" : "modal--hide";

  return (
    <div className={`modal ${showHideClassName}`}>
      <div className="modal__overlay">
        <div className="modal__container" ref={modalRef}>
          <section className="modal__header">
            <div className="header__title">{title}</div>
            <div>
              <i className="close icon" onClick={OnNegativeButtonClick}></i>
            </div>
          </section>
          <section>{children}</section>
          <section className="modal__buttons">
            {OnNegativeButtonClick && (
              <button
                className="ui button"
                id="modal-cancel-button"
                onClick={OnNegativeButtonClick}
              >
                {" "}
                {negativeLabel}
              </button>
            )}
            {onPositiveButtonClick && (
              <button onClick={onPositiveButtonClick} className="ui button">
                {" "}
                {positiveLabel}
              </button>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

Modal.Contents = Contents;

export default Modal;
