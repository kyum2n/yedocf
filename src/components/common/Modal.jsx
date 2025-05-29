import { createPortal } from "react-dom";
import Button from "@/components/common/Button";

const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    actionLabel,
    onAction,
    cancelLabel,
    onCancel
}) => {
    if (!isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold mb-4">{title}</h2>

                <div className="space-y-4">{children}</div>

                <div className="mt-6 flex justify-end gap-2">
                    {cancelLabel && (
                        <Button variant="secondary" onClick={onCancel || onClose}>
                            {cancelLabel}
                        </Button>
                    )}
                    <Button variant="success" onClick={onAction}>
                        {actionLabel}
                    </Button>
                </div>

                <button
                    onClick={onClose}
                    aria-label="Close modal"
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
