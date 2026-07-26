export type PortableTextSpan = {
  _key?: string;
  _type?: "span";
  text?: string;
  marks?: string[];
};

export type PortableTextBlock = {
  _key?: string;
  _type?: "block";
  children?: PortableTextSpan[];
  listItem?: "bullet" | "number";
  level?: number;
};

export type SanityImage = {
  alt?: string;
  caption?: string;
  url?: string;
};

export type LinkField = {
  label: string;
  href: string;
  openInNewTab?: boolean;
};

export type Cta = LinkField & {
  variant?: "primary" | "secondary" | "ghost";
};

export type SectionHeading = {
  eyebrow?: string;
  title: string;
  accentTitle?: string;
  subtitle?: string;
  description?: PortableTextBlock[];
};

export type Seo = {
  title?: string;
  description?: string;
  image?: SanityImage;
};

export type MetricItem = {
  value: string;
  label: string;
};

export type FeatureCard = {
  title: string;
  description?: string;
  image?: SanityImage;
  cta?: Cta;
  theme?: "blue" | "teal" | "orange" | "gray";
};

export type ImageTextSection = {
  _key?: string;
  heading: SectionHeading;
  image?: SanityImage;
  ctas?: Cta[];
  imagePosition?: "left" | "right";
  theme?: "blue" | "teal" | "light";
  backgroundColor?: string;
  titleColor?: string;
  textColor?: string;
};

export type BoardGovernorMember = {
  _key?: string;
  name?: string;
  role?: string;
  image?: SanityImage;
  cardColor?: string;
  imageBackgroundColor?: string;
};

export type BoardGovernorsSection = {
  heading?: SectionHeading;
  members?: BoardGovernorMember[];
  backgroundColor?: string;
};

export type StatementCard = {
  _key?: string;
  title?: string;
  description?: string;
  image?: SanityImage;
  cardColor?: string;
  imagePosition?: string;
};

export type StatementSection = {
  heading?: SectionHeading;
  cards?: StatementCard[];
  backgroundColor?: string;
};

export type PageHeroContent = {
  heading?: SectionHeading;
  image?: SanityImage;
  topLineColor?: string;
  panelColor?: string;
  waveColor?: string;
  textColor?: string;
  imagePosition?: string;
  imageWidth?: string;
};

export type InnerNavigationItem = {
  _key?: string;
  label?: string;
  href?: string;
  openInNewTab?: boolean;
};

export type InnerNavigation = {
  items?: InnerNavigationItem[];
  activeHref?: string;
  activeColor?: string;
  inactiveColor?: string;
  textColor?: string;
  dividerColor?: string;
  topLineColor?: string;
  ariaLabel?: string;
};

export type AboutIntroSection = {
  heading?: SectionHeading;
  image?: SanityImage;
  body?: PortableTextBlock[];
  imagePosition?: string;
};

export type AboutPageData = {
  seo?: Seo;
  hero?: PageHeroContent;
  intro?: AboutIntroSection;
  principalMessage?: ImageTextSection;
  boardGovernors?: BoardGovernorsSection;
  statement?: StatementSection;
  governance?: ImageTextSection;
  inspection?: ImageTextSection;
};

export type CalendarDownloadSection = {
  text?: string;
  buttonLabel?: string;
  fileUrl?: string | null;
};

export type AcademicsPageData = {
  seo?: Seo;
  hero?: PageHeroContent;
  curriculumSection?: ContactInfoSection;
  skillsSection?: AcademicsSkillsSection;
  curriculumOverviewSection?: AcademicsCurriculumOverviewSection;
  teachingCommitmentsSection?: AcademicsTeachingCommitmentsSection;
  learningSliderSection?: AcademicsLearningSliderSection;
  calendarDownload?: CalendarDownloadSection;
};

export type AcademicsKindergartenIntroSection = {
  heading?: SectionHeading;
  titleColor?: string;
  textColor?: string;
  backgroundColor?: string;
};

export type AcademicsKindergartenFeatureSection = {
  heading?: SectionHeading;
  image?: SanityImage;
  imageSide?: "left" | "right";
  imagePosition?: string;
  backgroundColor?: string;
  panelColor?: string;
  waveColor?: string;
  titleColor?: string;
  textColor?: string;
};

export type AcademicsKindergartenAssessmentCard = {
  _key?: string;
  title?: string;
  description?: string;
  icon?: SanityImage;
};

export type AcademicsKindergartenAssessmentSection = {
  heading?: SectionHeading;
  cards?: AcademicsKindergartenAssessmentCard[];
  backgroundColor?: string;
  titleColor?: string;
  textColor?: string;
  cardTextColor?: string;
  cardBorderColor?: string;
  cardHoverBorderColor?: string;
};

export type AcademicsKindergartenPageData = {
  seo?: Seo;
  hero?: PageHeroContent;
  innerNavigation?: InnerNavigation;
  intro?: AcademicsKindergartenIntroSection;
  excellenceSection?: AcademicsKindergartenFeatureSection;
  curriculumSection?: ImageTextSection;
  assessmentSection?: AcademicsKindergartenAssessmentSection;
};

export type AcademicsElementaryIntroSection = {
  heading?: SectionHeading;
  titleColor?: string;
  textColor?: string;
  backgroundColor?: string;
};

export type AcademicsElementaryPageData = {
  seo?: Seo;
  hero?: PageHeroContent;
  innerNavigation?: InnerNavigation;
  intro?: AcademicsElementaryIntroSection;
  curriculumSection?: AcademicsKindergartenFeatureSection;
  assessmentSection?: AcademicsKindergartenFeatureSection;
};

export type AcademicsMiddleSchoolPageData = {
  seo?: Seo;
  hero?: PageHeroContent;
  innerNavigation?: InnerNavigation;
  overviewSection?: ImageTextSection;
  tailoredInstructionSection?: AcademicsKindergartenFeatureSection;
  curriculumOverviewSection?: AcademicsCurriculumOverviewSection;
  assessmentSection?: ContactInfoSection;
  supportProgramsSection?: AcademicsSupportProgramsSection;
};

export type AcademicsApBenefitCard = {
  _key?: string;
  title?: string;
  description?: string;
  icon?: SanityImage;
};

export type AcademicsApBenefitsSection = {
  heading?: SectionHeading;
  cards?: AcademicsApBenefitCard[];
  backgroundColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  cardIconColor?: string;
  cardTitleColor?: string;
  cardTextColor?: string;
};

export type AcademicsHighSchoolPageData = {
  seo?: Seo;
  hero?: PageHeroContent;
  innerNavigation?: InnerNavigation;
  overviewSection?: ImageTextSection;
  excellenceSection?: AcademicsKindergartenFeatureSection;
  curriculumSection?: ImageTextSection;
  careerGuidanceSection?: AcademicsKindergartenFeatureSection;
  pathwaysSection?: ImageTextSection;
  pathwaysSliderSection?: AcademicsLearningSliderSection;
  apDiplomaSection?: ImageTextSection;
  apCoursesSection?: AcademicsSupportProgramsSection;
  apBenefitsSection?: AcademicsApBenefitsSection;
};

export type AcademicsSkillItem = {
  _key?: string;
  title?: string;
  icon?: SanityImage;
  iconType?: "critical" | "communication" | "organization" | "research" | "resilience" | "empathy" | "curiosity" | "growth";
  theme?: "teal" | "orange";
};

export type AcademicsSkillGroup = {
  _key?: string;
  title?: string;
  items?: AcademicsSkillItem[];
};

export type AcademicsSkillsSection = {
  heading?: SectionHeading;
  groups?: AcademicsSkillGroup[];
};

export type AcademicsCurriculumOverviewSection = {
  heading?: SectionHeading;
  backgroundColor?: string;
  titleColor?: string;
  textColor?: string;
  firstBlock?: ImageTextSection;
  secondBlock?: ImageTextSection;
};

export type AcademicsSupportProgramCard = {
  _key?: string;
  title?: string;
  description?: string;
  icon?: SanityImage;
  iconType?: "determination" | "gifted" | "eal" | "counseling" | "differentiation";
};

export type AcademicsSupportProgramsSection = {
  heading?: SectionHeading;
  cards?: AcademicsSupportProgramCard[];
  backgroundColor?: string;
  titleColor?: string;
  cardBorderColor?: string;
  cardHoverBorderColor?: string;
  cardTextColor?: string;
};

export type AcademicsTeachingCommitmentCard = {
  _key?: string;
  title?: string;
  description?: string;
  icon?: SanityImage;
  iconType?: "expectations" | "engagement" | "achievement";
};

export type AcademicsTeachingCommitmentsSection = {
  heading?: SectionHeading;
  cards?: AcademicsTeachingCommitmentCard[];
};

export type AcademicsLearningSlide = {
  _key?: string;
  title?: string;
  body?: string;
  image?: SanityImage;
  backgroundColor?: string;
  sideColor?: string;
  ringColor?: string;
  titleColor?: string;
  textColor?: string;
  imagePosition?: string;
};

export type AcademicsLearningSliderSection = {
  heading?: SectionHeading;
  slides?: AcademicsLearningSlide[];
};

export type ContactInfoItem = {
  _key?: string;
  icon?: "location" | "phone" | "email";
  label?: string;
  text?: string;
  href?: string;
};

export type ContactInfoSection = {
  heading?: SectionHeading;
  image?: SanityImage;
  imagePosition?: string;
  panelColor?: string;
  waveColor?: string;
  titleColor?: string;
  textColor?: string;
  items?: ContactInfoItem[];
};

export type ContactPageData = {
  seo?: Seo;
  hero?: PageHeroContent;
  contactInfo?: ContactInfoSection;
};

export type CareersIntroSection = {
  heading?: SectionHeading;
  image?: SanityImage;
  ctas?: Cta[];
};

export type CareersRequirementColumn = {
  _key?: string;
  title?: string;
  intro?: string;
  items?: string[];
};

export type CareersRequirementsSection = {
  columns?: CareersRequirementColumn[];
};

export type CareersJoinTeamCard = {
  _key?: string;
  icon?: SanityImage;
  label?: string;
  text?: string;
  href?: string;
};

export type CareersJoinTeamSection = {
  heading?: SectionHeading;
  cards?: CareersJoinTeamCard[];
};

export type CareersPageData = {
  seo?: Seo;
  hero?: PageHeroContent;
  intro?: CareersIntroSection;
  editorialSection?: ImageTextSection;
  careSection?: ContactInfoSection;
  requirementsSection?: CareersRequirementsSection;
  joinTeamSection?: CareersJoinTeamSection;
};

export type LogoItem = {
  name: string;
  image?: SanityImage;
};

export type WhyDubaiItem = {
  title?: string;
  description: string;
  iconType?: "student" | "globe" | "learning" | "family";
  icon?: SanityImage;
};

export type FooterColumn = {
  title?: string;
  links?: LinkField[];
};

export type SiteFooter = {
  logoText?: string;
  contactText?: PortableTextBlock[];
  columns?: FooterColumn[];
  socialLinks?: LinkField[];
  legalLinks?: LinkField[];
};

export type HeaderSettings = {
  logo?: SanityImage;
  scrolledLogo?: SanityImage;
  menuIcon?: SanityImage;
  bookTourButton?: Cta;
  applyNowButton?: Cta;
};

export type SiteHeader = HeaderSettings & {
  navigation?: LinkField[];
};

export type HomepageData = {
  seo?: Seo;
  header?: HeaderSettings;
  navigation?: LinkField[];
  hero?: {
    heading: string;
    subtitle?: string;
    description?: PortableTextBlock[];
    image?: SanityImage;
    ctas?: Cta[];
    valueBar?: string[];
  };
  heroContactBand?: {
    text?: string;
    ctas?: Cta[];
  };
  intro?: ImageTextSection;
  whyDubai?: {
    heading: SectionHeading;
    image?: SanityImage;
    items?: WhyDubaiItem[];
  };
  ctaBand?: {
    text: string;
    ctas?: Cta[];
  };
  accreditations?: {
    heading: SectionHeading;
    logos?: LogoItem[];
  };
  whySection?: ImageTextSection;
  facts?: {
    heading: SectionHeading;
    items?: MetricItem[];
  };
  quickLinks?: {
    heading: SectionHeading;
    cards?: FeatureCard[];
  };
  learningPhases?: {
    heading: SectionHeading;
    cta?: Cta;
    cards?: FeatureCard[];
  };
  tour?: {
    heading: SectionHeading;
    cards?: FeatureCard[];
  };
  news?: {
    heading: SectionHeading;
    cta?: Cta;
    posts?: FeatureCard[];
  };
  instagram?: {
    heading: SectionHeading;
    images?: SanityImage[];
    socialLinks?: LinkField[];
  };
  footer?: SiteFooter;
};

export type LegacyHomeSection = {
  _id: string;
  order: number;
  title: string;
  subtitle?: string;
  body?: PortableTextBlock[];
  items?: string[];
  ctas?: string[];
  imagePlaceholders?: Array<{
    _key?: string;
    label?: string;
    fileName?: string;
    note?: string;
  }>;
  images?: Array<SanityImage & { label?: string }>;
};
