import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import type {
  StudentProgramsLeadershipMember,
  StudentProgramsLeadershipStructureSection as StudentProgramsLeadershipStructureSectionData,
} from "@/types/sanity";

type StudentProgramsLeadershipStructureSectionProps = {
  section?: StudentProgramsLeadershipStructureSectionData;
  fallbackSection: StudentProgramsLeadershipStructureSectionData;
  titleId?: string;
};

function resolveMembers(
  members?: StudentProgramsLeadershipMember[],
  fallbackMembers?: StudentProgramsLeadershipMember[]
) {
  return members?.length ? members : fallbackMembers || [];
}

function getInitials(name?: string) {
  return (name || "SAIS")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function LeadershipMemberCard({
  member,
  index,
  delay,
}: {
  member: StudentProgramsLeadershipMember;
  index: number;
  delay: number;
}) {
  return (
    <Reveal
      as="article"
      className="student-programs-leadership-structure__member academics-card-reveal"
      delay={delay}
      threshold={0.08}
    >
      <span className="student-programs-leadership-structure__avatar" aria-hidden={!member.image?.url}>
        {member.image?.url ? (
          <Image
            src={member.image.url}
            alt={member.image.alt || member.name || `Student leader ${index + 1}`}
            fill
            sizes="(max-width: 767px) 72px, 96px"
            className="student-programs-leadership-structure__avatar-image"
          />
        ) : (
          getInitials(member.name)
        )}
      </span>
      {member.name ? <h4 className="student-programs-leadership-structure__member-name">{member.name}</h4> : null}
      {member.role ? <p className="student-programs-leadership-structure__member-role">{member.role}</p> : null}
      {member.description ? (
        <p className="student-programs-leadership-structure__member-description">{member.description}</p>
      ) : null}
    </Reveal>
  );
}

export function StudentProgramsLeadershipStructureSection({
  section,
  fallbackSection,
  titleId = "student-programs-leadership-structure-title",
}: StudentProgramsLeadershipStructureSectionProps) {
  const heading = section?.heading || fallbackSection.heading;
  const executiveHeading = section?.executiveHeading || fallbackSection.executiveHeading;
  const ministerialHeading = section?.ministerialHeading || fallbackSection.ministerialHeading;
  const executiveMembers = resolveMembers(section?.executiveMembers, fallbackSection.executiveMembers);
  const ministerialMembers = resolveMembers(section?.ministerialMembers, fallbackSection.ministerialMembers);

  if (!heading?.title && !executiveMembers.length && !ministerialMembers.length) {
    return null;
  }

  return (
    <section className="student-programs-leadership-structure" aria-labelledby={titleId}>
      <div className="student-programs-leadership-structure__inner">
        {heading?.title ? (
          <Reveal threshold={0.12}>
            <h2 id={titleId} className="student-programs-leadership-structure__title">
              {heading.title}
            </h2>
          </Reveal>
        ) : null}

        {executiveMembers.length ? (
          <div className="student-programs-leadership-structure__group">
            {executiveHeading ? (
              <h3 className="student-programs-leadership-structure__group-title">{executiveHeading}</h3>
            ) : null}
            <div className="student-programs-leadership-structure__grid student-programs-leadership-structure__grid--executive">
              {executiveMembers.map((member, index) => (
                <LeadershipMemberCard
                  member={member}
                  index={index}
                  delay={100 + index * 120}
                  key={member._key || `${member.name}-${index}`}
                />
              ))}
            </div>
          </div>
        ) : null}

        {ministerialMembers.length ? (
          <div className="student-programs-leadership-structure__group">
            {ministerialHeading ? (
              <h3 className="student-programs-leadership-structure__group-title">{ministerialHeading}</h3>
            ) : null}
            <div className="student-programs-leadership-structure__grid student-programs-leadership-structure__grid--ministerial">
              {ministerialMembers.map((member, index) => (
                <LeadershipMemberCard
                  member={member}
                  index={index}
                  delay={120 + index * 90}
                  key={member._key || `${member.role}-${index}`}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
