import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import CloseIcon from '../icons/CloseIcon';
import { useClickAway, useMedia } from 'react-use';
// Modal.setAppElement('#__next');

export const CustomModal = ({
  children,
  className,
  enableClickAway,
  isModalOpen,
  onRequestClose,
  overlayClassName,
  setIsModalOpen,
  style,
}) => {
  const isMobile = useMedia('(max-width: 767px)');
  const ref = useRef(null);
  useClickAway(
    ref,
    () => !isMobile && enableClickAway && setIsModalOpen(false)
  );

  return (
    <Modal
      className={`dds-new-modal ${className}`}
      closeTimeoutMS={300}
      isOpen={isModalOpen}
      onRequestClose={() => onRequestClose && onRequestClose()}
      overlayClassName={`new-modal-overlay ${overlayClassName}`}
      style={style}
    >
      <div className="dds-new-modal__ref" ref={ref}>
        {children}
      </div>
      <div
        className={'dds-new-modal__close'}
        onClick={() => setIsModalOpen(false)}
        onKeyPress={() => setIsModalOpen(false)}
        role="button"
        tabIndex="0"
      >
        <CloseIcon />
      </div>
    </Modal>
  );
};

CustomModal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  enableClickAway: PropTypes.bool,
  isModalOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func,
  overlayClassName: PropTypes.string,
  setIsModalOpen: PropTypes.func.isRequired,
  style: PropTypes.object,
};
