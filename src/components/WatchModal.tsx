import { createPortal } from "react-dom";
import { X } from "lucide-react";

type ModalProp = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

function Modal({isOpen, onClose, children}:ModalProp) {


    if (!isOpen) return null;

    const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return  createPortal(
        <div 
            className="fixed inset-0 z-200 flex h-screen w-screen items-center justify-center bg-(--bg)"
            onClick={handleBackgroundClick}
        >
            <button type="button" 
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onClose();
            }}
            className="fixed top-4 left-4 z-210 rounded-full bg-slate-950/70 p-2 text-white transition-colors hover:bg-slate-950"
            >
                <X size={18} />
            </button>
          <div className="w-full h-full flex items-center justify-center">
            {children}
          </div>
        </div>,
        document.body,
    )
}

export default function WatchModal({iframelink, isOpen, onClose}:{iframelink:string, isOpen:boolean, onClose:() => void}) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <iframe
                width="100%"
                height="100%"
                src={iframelink}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            ></iframe>
        </Modal>
    );
}
