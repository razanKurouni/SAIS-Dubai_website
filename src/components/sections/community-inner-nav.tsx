import { InnerPageNav } from "@/components/sections/inner-page-nav";

const communityNavItems = [
  { label: "Our Community", href: "/our-community" },
  { label: "Our Campus", href: "/our-campus" },
  { label: "Student & Staff Wellbeing", href: "/student-staff-wellbeing" },
  { label: "Student Inclusion", href: "/student-inclusion" },
  { label: "Parent Involvement", href: "/parent-involvement" },
  { label: "School Calendar", href: "/school-calendar" },
  { label: "School Policies", href: "/school-policies" },
  { label: "Health & Safety", href: "/health-safety" },
  { label: "Food Services & Nutrition", href: "/food-services-nutrition" },
  { label: "Medical Services", href: "/medical-services" },
  { label: "School Supplies & Uniform", href: "/school-supplies-uniform" },
  { label: "Transportation Safety Guidelines", href: "/transportation-safety-guidelines" },
];

export function CommunityInnerNav({ activeHref }: { activeHref: string }) {
  return (
    <InnerPageNav
      className="community-inner-nav"
      items={communityNavItems}
      activeHref={activeHref}
      activeColor="#00A5B2"
      inactiveColor="#216B97"
      textColor="#ffffff"
      dividerColor="#ffffff"
      topLineColor="#ffffff"
      ariaLabel="Our Community navigation"
    />
  );
}
