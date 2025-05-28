import { createPortal } from "react-dom";

const Modal = ({ isOpen, onClose, title, children, actionLabel, onAction }) => {
    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-bold mb-4">{title}</h2>

                <div className="space-y-4">{children}</div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onAction}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        {actionLabel}
                    </button>
                </div>

                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-gray-500 text-lg font-bold"
                >
                    ✕
                </button>
            </div>
        </div>,
        document.body
    );
};

export default Modal;
