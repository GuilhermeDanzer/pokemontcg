import React, { ReactNode } from 'react'
import styles from './modal.module.css'

interface ModalProps {
  show: boolean
  onClose: () => void
  children: ReactNode
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
  if (!show) return null

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div
        className={styles.modalContent}
        data-testid="modal"
        onClick={e => e.stopPropagation()}>
        <button
          data-testid="close-modal-button"
          className={styles.closeButton}
          onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal
