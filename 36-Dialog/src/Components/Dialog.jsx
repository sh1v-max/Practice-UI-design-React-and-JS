import React, { useEffect, useRef } from 'react'
import { createPortal } from "react-dom";

const Dialog = ({ onClose, children }) => {
  const contentRef = useRef()
  const backdropRef = useRef()

  useEffect(() => {
    document.addEventListener('keydown', handleKeyUp)
    blockOutsideAccess()
    
    return () => {
      unBlockOutsideAccess()
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  function blockOutsideAccess() {
    const body = document.getElementsByTagName("body")[0];

    [...body.children].forEach((el) => {
      if (!el.getAttribute("data-dialog")) {
        el.setAttribute("aria-hidden", true);
        el.setAttribute("inert", true);
      }
    });
  }

  function unBlockOutsideAccess() {
    const body = document.getElementsByTagName("body")[0];

    [...body.children].forEach((el) => {
      if (!el.getAttribute("data-dialog")) {
        el.removeAttribute("aria-hidden");
        el.removeAttribute("inert");
      }
    });
  }
  
  function handleKeyUp(e) {
    if (e.key === "Escape") {
      handleClose();
    }

    if (e.key === "Tab") {
      if (document.activeElement.classList.contains("cancel")) {
        e.preventDefault();
        e.stopPropagation();
        document.getElementsByClassName("dialog-close")[0].focus();
      }
    }
  }

  function handleClose() {
    // onClose()
    contentRef.current.classList.add('hide-dialog')
    backdropRef.current.classList.add('hide-dialog')

    contentRef.current.addEventListener('animationend', handleAnimationEnd, {
      once: true,
    })
  }

  function handleAnimationEnd() {
    onClose()
  }

  // createPortal(), it takes two arguments, the first is the element to render, the second is the container where to render it
  return createPortal(
    <div data-dialog="true" className="dialog">
      <div
        onClick={handleClose}
        ref={backdropRef}
        className="dialog-backdrop"
      ></div>
      <div ref={contentRef} className="dialog-content">
        {!!onClose && (
          <button className="dialog-close" onClick={handleClose} type="button">
            &times;
          </button>
        )}
        {children}
      </div>
    </div>,
    document.getElementsByTagName('body')[0]
  )
}

export default Dialog
