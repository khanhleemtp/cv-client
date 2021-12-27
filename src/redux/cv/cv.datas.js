export const CV_DATAS = {
  title: '',
  header: {
    name: '',
    title: '',
    email: '',
    address: '',
    phone: '',
    link: '',
    showTitle: true,
    showPhone: true,
    showLink: true,
    showEmail: true,
    showAddress: true,
    showPhoto: true,
    photoStyle: 'rounded',
    photo: null,
  },
  sections: [
    {
      record: 'TechnologySection',
      enabled: true,
      name: 'Kỹ năng chính',
      surroundingBorder: false,
      items: [
        {
          tags: [
            {
              text: '',
            },
          ],
          title: '',
          showTitle: true,
        },
      ],
    },
    {
      record: 'EducationSection',
      enabled: true,
      name: 'Học Vấn',
      items: [
        {
          degree: '',
          institution: '',
          location: '',
          gpa: '',
          gpaText: '',
          maxGpa: '',
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
      ],
    },
    {
      record: 'ExperienceSection',
      enabled: true,
      name: 'Kinh nghiệm',
      items: [
        {
          position: '',
          workplace: '',
          description: '',
          location: '',
          dateRange: {
            from: null,
            to: null,
            isOngoing: false,
          },
          link: '',
          showTitle: true,
          showCompany: true,
          showDescription: true,
          showBullets: true,
          showLocation: true,
          showDateRange: true,
          showLink: true,
          bullets: [
            {
              text: '',
            },
          ],
        },
      ],
    },
    {
      record: 'SummarySection',
      enabled: true,
      name: 'Thông tin thêm',
      items: [
        {
          text: '',
        },
      ],
    },
    {
      showSlider: true,
      record: 'LanguageSection',
      enabled: true,
      name: 'Kỹ năng khác',
      indicatorType: 'lolly',
      items: [
        {
          level: 0,
          name: '',
        },
      ],
    },
  ],
};
