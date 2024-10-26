"use client";
import { domAnimation, LazyMotion } from "framer-motion";

import CastCard from "@/components/CastCard";
import Modal from "@/components/Modal";
import { useModal } from "@/libs/hooks";
import { Cast } from "@/libs/types";

function CastGallery({ casts }: { casts: Cast[] }) {
  return (
    <div className="z-20 grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-8">
      {casts.map((cast) => {
        return <CastCard key={cast.id} cast={cast} />;
      })}
    </div>
  );
}

function ViewCasts({ casts }: { casts: Cast[] }) {
  const [isModalOpen, openModal, closeModal] = useModal();

  return (
    <>
      <button
        onClick={openModal}
        className="overflow-hidden rounded text-sm text-white/50 underline decoration-white/50 outline-none transition-colors hover:text-white focus:ring-0 focus:ring-offset-0"
      >
        See all
      </button>
      <LazyMotion strict features={domAnimation}>
        <Modal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          title="Casts gallery"
        >
          <CastGallery casts={casts} />
        </Modal>
      </LazyMotion>
    </>
  );
}

export default ViewCasts;
