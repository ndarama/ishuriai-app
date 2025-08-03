// Central definition of all schools and institutions available for registration
// This includes primary schools, secondary schools, universities, and other educational institutions in Rwanda
// Schools are organized by category and district for easier selection

export const schoolsData = {
  // Universities and Higher Education Institutions
  universities: [
    {
      id: 'ind',
      name: 'Independent Student',
      category: 'Private',
      district: 'Not Specific',
      type: 'Not Specific',
      established: 2000,
      website: 'www.notspecific.rw'
    },
    {
      id: 'ur',
      name: 'University of Rwanda (UR)',
      category: 'Public University',
      district: 'Kigali',
      type: 'university',
      established: 2013,
      website: 'www.ur.ac.rw'
    },
    {
      id: 'auca',
      name: 'Adventist University of Central Africa (AUCA)',
      category: 'Private University',
      district: 'Kigali',
      type: 'university',
      established: 1984,
      website: 'www.auca.ac.rw'
    },
    {
      id: 'uok',
      name: 'University of Kigali (UoK)',
      category: 'Private University',
      district: 'Kigali',
      type: 'university',
      established: 1997,
      website: 'www.uok.ac.rw'
    },
    {
      id: 'ines',
      name: 'Institut d\'Enseignement Supérieur de Ruhengeri (INES)',
      category: 'Private University',
      district: 'Musanze',
      type: 'university',
      established: 2003,
      website: 'www.ines.ac.rw'
    },
    {
      id: 'mount-kenya',
      name: 'Mount Kenya University Rwanda',
      category: 'Private University',
      district: 'Kigali',
      type: 'university',
      established: 2010,
      website: 'www.mku.ac.rw'
    },
    {
      id: 'inyoma',
      name: 'Inyoma University',
      category: 'Private University',
      district: 'Kigali',
      type: 'university',
      established: 2017,
      website: 'www.inyoma.ac.rw'
    },
    {
      id: 'davis-college',
      name: 'Davis College',
      category: 'Private College',
      district: 'Kigali',
      type: 'college',
      established: 2008,
      website: 'www.daviscollege.ac.rw'
    },
    {
      id: 'kepler',
      name: 'Kepler University',
      category: 'Private University',
      district: 'Kigali',
      type: 'university',
      established: 2013,
      website: 'www.kepler.org'
    }
  ],

  // Technical and Vocational Education and Training (TVET) Schools
  tvet: [
    {
      id: 'iprc-kigali',
      name: 'Integrated Polytechnic Regional College Kigali (IPRC-Kigali)',
      category: 'Public TVET',
      district: 'Kigali',
      type: 'tvet',
      established: 2013,
      specializations: ['Engineering', 'ICT', 'Business', 'Agriculture']
    },
    {
      id: 'iprc-musanze',
      name: 'Integrated Polytechnic Regional College Musanze (IPRC-Musanze)',
      category: 'Public TVET',
      district: 'Musanze',
      type: 'tvet',
      established: 2013,
      specializations: ['Engineering', 'Agriculture', 'Tourism']
    },
    {
      id: 'iprc-huye',
      name: 'Integrated Polytechnic Regional College Huye (IPRC-Huye)',
      category: 'Public TVET',
      district: 'Huye',
      type: 'tvet',
      established: 2013,
      specializations: ['Engineering', 'ICT', 'Arts and Design']
    },
    {
      id: 'iprc-kitabi',
      name: 'Integrated Polytechnic Regional College Kitabi (IPRC-Kitabi)',
      category: 'Public TVET',
      district: 'Nyamagabe',
      type: 'tvet',
      established: 2013,
      specializations: ['Engineering', 'Agriculture', 'Environment']
    },
    {
      id: 'iprc-tumba',
      name: 'Integrated Polytechnic Regional College Tumba (IPRC-Tumba)',
      category: 'Public TVET',
      district: 'Rulindo',
      type: 'tvet',
      established: 2013,
      specializations: ['Crafts and Production', 'Services']
    },
    {
      id: 'iprc-gishari',
      name: 'Integrated Polytechnic Regional College Gishari (IPRC-Gishari)',
      category: 'Public TVET',
      district: 'Rwamagana',
      type: 'tvet',
      established: 2013,
      specializations: ['Agriculture', 'Veterinary', 'Animal Husbandry']
    }
  ],

  // Secondary Schools (A sample of well-known secondary schools across Rwanda)
  secondarySchools: [
    // Kigali Province
    {
      id: 'gcu',
      name: 'Green Hills Academy',
      category: 'Private Secondary',
      district: 'Kigali',
      type: 'secondary',
      level: 'O-Level & A-Level',
      curriculum: 'Cambridge International'
    },
    {
      id: 'kigali-parents',
      name: 'Kigali Parents School',
      category: 'Private Secondary',
      district: 'Kigali',
      type: 'secondary',
      level: 'O-Level & A-Level',
      curriculum: 'National & Cambridge'
    },
    {
      id: 'riviera',
      name: 'Riviera High School',
      category: 'Private Secondary',
      district: 'Kigali',
      type: 'secondary',
      level: 'O-Level & A-Level',
      curriculum: 'Cambridge International'
    },
    {
      id: 'lycee-de-kigali',
      name: 'Lycée de Kigali',
      category: 'Public Secondary',
      district: 'Kigali',
      type: 'secondary',
      level: 'O-Level & A-Level',
      curriculum: 'National'
    },
    {
      id: 'apace',
      name: 'APACE School',
      category: 'Private Secondary',
      district: 'Kigali',
      type: 'secondary',
      level: 'O-Level & A-Level',
      curriculum: 'National'
    },
    
    // Eastern Province
    {
      id: 'essa-nyagatare',
      name: 'Ecole Secondaire Saint André (ESSA) Nyagatare',
      category: 'Private Secondary',
      district: 'Nyagatare',
      type: 'secondary',
      level: 'O-Level & A-Level',
      curriculum: 'National'
    },
    {
      id: 'gs-rwamagana',
      name: 'GS Rwamagana',
      category: 'Public Secondary',
      district: 'Rwamagana',
      type: 'secondary',
      level: 'O-Level & A-Level',
      curriculum: 'National'
    },
    
    // Southern Province
    {
      id: 'gs-huye',
      name: 'GS Huye',
      category: 'Public Secondary',
      district: 'Huye',
      type: 'secondary',
      level: 'O-Level & A-Level',
      curriculum: 'National'
    },
    {
      id: 'indangaburezi',
      name: 'Indangaburezi School',
      category: 'Private Secondary',
      district: 'Huye',
      type: 'secondary',
      level: 'O-Level & A-Level',
      curriculum: 'National'
    },
    
    // Western Province
    {
      id: 'gs-muhanga',
      name: 'GS Muhanga',
      category: 'Public Secondary',
      district: 'Muhanga',
      type: 'secondary',
      level: 'O-Level & A-Level',
      curriculum: 'National'
    },
    {
      id: 'csk-kibuye',
      name: 'Collège Saint Kizito Kibuye',
      category: 'Private Secondary',
      district: 'Karongi',
      type: 'secondary',
      level: 'O-Level & A-Level',
      curriculum: 'National'
    },
    
    // Northern Province
    {
      id: 'gs-musanze',
      name: 'GS Musanze',
      category: 'Public Secondary',
      district: 'Musanze',
      type: 'secondary',
      level: 'O-Level & A-Level',
      curriculum: 'National'
    },
    {
      id: 'petit-seminaire-karubanda',
      name: 'Petit Séminaire Karubanda',
      category: 'Private Secondary',
      district: 'Musanze',
      type: 'secondary',
      level: 'O-Level & A-Level',
      curriculum: 'National'
    }
  ],

  // Primary Schools (A sample representing different districts)
  primarySchools: [
    // Kigali
    {
      id: 'ep-kigali-parents',
      name: 'EP Kigali Parents School',
      category: 'Private Primary',
      district: 'Kigali',
      type: 'primary',
      level: 'P1-P6',
      curriculum: 'National'
    },
    {
      id: 'green-hills-primary',
      name: 'Green Hills Academy Primary',
      category: 'Private Primary',
      district: 'Kigali',
      type: 'primary',
      level: 'P1-P6',
      curriculum: 'Cambridge Primary'
    },
    {
      id: 'ep-kimisagara',
      name: 'EP Kimisagara',
      category: 'Public Primary',
      district: 'Kigali',
      type: 'primary',
      level: 'P1-P6',
      curriculum: 'National'
    },
    
    // Sample schools from other provinces
    {
      id: 'ep-musanze',
      name: 'EP Musanze',
      category: 'Public Primary',
      district: 'Musanze',
      type: 'primary',
      level: 'P1-P6',
      curriculum: 'National'
    },
    {
      id: 'ep-huye',
      name: 'EP Huye',
      category: 'Public Primary',
      district: 'Huye',
      type: 'primary',
      level: 'P1-P6',
      curriculum: 'National'
    },
    {
      id: 'ep-rwamagana',
      name: 'EP Rwamagana',
      category: 'Public Primary',
      district: 'Rwamagana',
      type: 'primary',
      level: 'P1-P6',
      curriculum: 'National'
    }
  ],

  // International Schools
  internationalSchools: [
    {
      id: 'kigali-international-school',
      name: 'Kigali International School',
      category: 'International School',
      district: 'Kigali',
      type: 'international',
      level: 'Pre-K to Grade 12',
      curriculum: 'American Curriculum'
    },
    {
      id: 'ecole-francaise',
      name: 'École Française Antoine de Saint-Exupéry',
      category: 'International School',
      district: 'Kigali',
      type: 'international',
      level: 'Maternelle to Terminale',
      curriculum: 'French Curriculum'
    },
    {
      id: 'umubano-primary',
      name: 'Umubano Primary School',
      category: 'International School',
      district: 'Kigali',
      type: 'international',
      level: 'Reception to Year 6',
      curriculum: 'British Curriculum'
    }
  ],

  // Special Education and Other Institutions
  specialInstitutions: [
    {
      id: 'sovu-deaf',
      name: 'Sovu School for the Deaf',
      category: 'Special Education',
      district: 'Huye',
      type: 'special',
      level: 'Primary & Secondary',
      specialization: 'Education for the Deaf'
    },
    {
      id: 'rwandan-traditional-arts',
      name: 'Rwandan Traditional Arts Centre',
      category: 'Arts & Culture',
      district: 'Kigali',
      type: 'specialized',
      level: 'Various Levels',
      specialization: 'Traditional Arts and Culture'
    }
  ]
};

// Helper functions for easy data retrieval
export const getAllSchools = () => {
  return [
    ...schoolsData.universities,
    ...schoolsData.tvet,
    ...schoolsData.secondarySchools,
    ...schoolsData.primarySchools,
    ...schoolsData.internationalSchools,
    ...schoolsData.specialInstitutions
  ];
};

export const getSchoolsByType = (type) => {
  switch (type) {
    case 'university':
      return schoolsData.universities;
    case 'tvet':
      return schoolsData.tvet;
    case 'secondary':
      return schoolsData.secondarySchools;
    case 'primary':
      return schoolsData.primarySchools;
    case 'international':
      return schoolsData.internationalSchools;
    case 'special':
      return schoolsData.specialInstitutions;
    default:
      return getAllSchools();
  }
};

export const getSchoolsByDistrict = (district) => {
  return getAllSchools().filter(school => school.district === district);
};

export const getSchoolsByCategory = (category) => {
  return getAllSchools().filter(school => school.category === category);
};

// Rwanda Districts for reference
export const rwandaDistricts = [
  // Kigali Province
  'Gasabo', 'Kicukiro', 'Nyarugenge',
  
  // Eastern Province
  'Bugesera', 'Gatsibo', 'Kayonza', 'Kirehe', 'Ngoma', 'Nyagatare', 'Rwamagana',
  
  // Northern Province
  'Burera', 'Gakenke', 'Gicumbi', 'Musanze', 'Rulindo',
  
  // Southern Province
  'Gisagara', 'Huye', 'Kamonyi', 'Muhanga', 'Nyamagabe', 'Nyanza', 'Nyaruguru', 'Ruhango',
  
  // Western Province
  'Karongi', 'Ngororero', 'Nyabihu', 'Nyamasheke', 'Rubavu', 'Rusizi', 'Rutsiro'
];

// School categories for filtering
export const schoolCategories = [
  'Public University',
  'Private University',
  'Public TVET',
  'Private TVET',
  'Public Secondary',
  'Private Secondary',
  'Public Primary',
  'Private Primary',
  'International School',
  'Special Education',
  'Arts & Culture'
];
