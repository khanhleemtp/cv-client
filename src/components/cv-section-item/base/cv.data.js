export const CV_SECTION_ITEM_DATA = {
  EducationSection: {
    degree: '',
    institution: '',
    location: '',
    gpa: '',
    gpaText: '',
    maxGpa: null,
    dateRange: {
      from: null,
      to: null,
      isOngoing: false,
    },
    showGpa: true,
    showLocation: true,
    showDateRange: true,
    showBullets: true,
    bullets: [
      {
        text: '',
      },
    ],
  },
  LanguageSection: {
    level: 0,
    name: '',
  },
  SummarySection: {
    text: '',
  },
  TechnologySection: {
    tags: [{ text: '' }],
    title: '',
    showTitle: true,
  },
  ExperienceSection: {
    position: '',
    workplace: '',
    location: '',
    description: '',

    dateRange: {
      from: null,
      to: null,
      isOngoing: false,
    },
    showLocation: true,
    showDateRange: true,
    showBullets: true,
    showDescription: true,
    showPosition: true,
    showTitle: true,
    bullets: [
      {
        text: '',
      },
    ],
  },
};
