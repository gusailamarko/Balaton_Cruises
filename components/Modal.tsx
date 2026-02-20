const Modal = ({open, onClose, children}:any) => {
    if (!open) return null

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-window" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
  )
}

export default Modal