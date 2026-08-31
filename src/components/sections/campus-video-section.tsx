import Image from "next/image";
import { Play } from "lucide-react";
import type { CampusVideoSection as CampusVideoSectionData } from "@/types/sanity";

type CampusVideoSectionProps = {
  section?: CampusVideoSectionData;
};

export function CampusVideoSection({ section }: CampusVideoSectionProps) {
  const poster = section?.poster;
  const videoUrl = section?.videoFileUrl || section?.videoUrl;

  if (!poster?.url && !videoUrl) {
    return null;
  }

  return (
    <section className="campus-video" aria-label="Campus video">
      <div className="campus-video__inner">
        <div className="campus-video__frame">
          {videoUrl ? (
            <video className="campus-video__media" controls preload="metadata" poster={poster?.url}>
              <source src={videoUrl} />
            </video>
          ) : poster?.url ? (
            <Image
              src={poster.url}
              alt={poster.alt || "SAIS Dubai campus video"}
              fill
              sizes="(max-width: 767px) 92vw, 78vw"
              className="campus-video__poster"
            />
          ) : null}

          {!videoUrl ? (
            <span className="campus-video__play" aria-hidden="true">
              <Play size={48} strokeWidth={2.2} fill="currentColor" />
            </span>
          ) : null}
        </div>
      </div>
    </section>
  );
}
