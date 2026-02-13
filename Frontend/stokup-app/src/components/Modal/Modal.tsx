import { CircleX } from "lucide-react";
import styles from './Modal.module.css';


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    disableClose: boolean;
}

export function Modal({ isOpen, onClose, disableClose = false, children}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/40 grid popup transition-all duration 300"
      style={{ gridTemplateColumns: "280px 1fr" }}
      onClick={()=> {
        if(!disableClose){
          onClose();
        }        
        }}>
    <div />


      <div className="flex items-center justify-center">
        <div
          onClick={(e) => e.stopPropagation()}
          className={styles.modal}
        >
          <div
              className="absolute top-4 right-4 text-lg"
            >
              <CircleX className="text-red-600 opacity-50"/>
            </div>

          {!disableClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-lg"
            >
              <CircleX className="text-red-600"/>
            </button>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}

