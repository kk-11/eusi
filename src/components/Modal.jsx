import { createPortal } from 'react-dom';

const Modal = ({ src, location, close }) =>
  // lovely portal, chef's kiss
  createPortal(
    <div className="backdrop" onClick={close}>
      <div className="content">
        <img src={src} />
        <span>{location}</span>
      </div>
    </div>,
    document.body,
  );

export default Modal;
