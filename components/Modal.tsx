import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { AnimatePresence, m } from "framer-motion";

const animateTime = 0.15,
  exitTime = 0.1; // units are in seconds

const animateTransition = {
  duration: animateTime,
  type: "spring",
  damping: 35,
  stiffness: 300,
};

const exitTransition = {
  duration: exitTime,
  type: "spring",
  damping: 35,
  stiffness: 300,
};

const backdropAnimations = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: animateTransition,
  },
  exit: {
    opacity: 0,
    transition: exitTransition,
  },
};

const modalAnimations = {
  initial: {
    opacity: 0,
    scale: "var(--scale-from)",
    y: "var(--slide-from)",
  },
  animate: {
    opacity: 1,
    scale: "var(--scale-to)",
    y: "var(--slide-to)",
    transition: animateTransition,
  },
  exit: {
    opacity: 0,
    scale: "var(--scale-from)",
    y: "var(--slide-from)",
    transition: exitTransition,
  },
};

export default function Modal({
  isModalOpen,
  closeModal,
  children,
  title,
}: {
  isModalOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <AnimatePresence>
      {isModalOpen && (
        <Dialog
          static
          key={`dialog-${title}`}
          open={isModalOpen}
          onClose={() => closeModal()} // modal closes when clicked outside or escape key is pressed
          className="relative z-10" // use higher z-index if some part of ui element behind is still visible
        >
          {/* backdrop */}
          <m.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={backdropAnimations}
            aria-hidden="true"
            className="fixed inset-0 bg-black/10 backdrop-blur-sm"
          ></m.div>
          {/* modal */}
          <div className="fixed inset-0 overflow-hidden">
            <m.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={modalAnimations}
              className="flex min-h-full items-center justify-center p-4 text-center [--scale-from:100%] [--scale-to:100%] [--slide-from:40px] [--slide-to:0px] sm:[--scale-from:90%] sm:[--scale-to:100%] sm:[--slide-from:0px] sm:[--slide-to:0px]"
            >
              <DialogPanel className="w-full max-w-screen-md transform overflow-hidden rounded-2xl bg-black p-4 text-left align-middle shadow-xl transition-all md:p-8">
                <div className="mb-4 flex items-center justify-between">
                  <DialogTitle
                    as="h2"
                    className="text-xl font-medium leading-6 text-white"
                  >
                    {title}
                  </DialogTitle>
                  <button
                    onClick={() => closeModal()}
                    className="focus:ring-0 focus:ring-offset-0"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <Description
                  as="div"
                  className="relative max-h-[80vh] overflow-y-scroll"
                >
                  {children}
                </Description>
              </DialogPanel>
            </m.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
