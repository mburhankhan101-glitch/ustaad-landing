// ─── The tests, and who sits them ────────────────────────────────────────────
//
// One source for the landing section and for each university's own page, so
// the card and the page it opens can never disagree about a paper's pattern.
//
// A test is not a paper. FAST sets one paper for CS and another for Business;
// NUST sets four. Listing a single "FAST pattern" was wrong for half the
// students reading it, which is why `programs` exists.
//
// Crests are trademarks. They are used nominatively — to say which test we
// cover — and any university that asks is dropped.

export const UNIVERSITIES = [
  {
    slug: 'fast',
    short: 'FAST',
    name: 'FAST NUCES',
    full: 'National University of Computer & Emerging Sciences',
    test: 'FAST NU Entry Test',
    logo: '/unis/fast.png',
    color: '#6C63FF',
    campuses: ['Lahore', 'Karachi', 'Islamabad', 'Peshawar', 'Faisalabad', 'Chiniot'],
    intro:
      'FAST sets its own entry test rather than taking NTS or any national ' +
      'paper, and runs it separately for computing and for business. The ' +
      'computing paper leans hard on Advanced Mathematics; the business one ' +
      'drops it entirely.',
    negative: 'Yes — a wrong answer costs you.',
    programs: [
      {
        name: 'CS · SE · Data Science · AI',
        totalMcqs: 120,
        minutes: 120,
        sections: [
          { label: 'Advanced Mathematics', count: 50, weight: '50%' },
          { label: 'Basic Mathematics', count: 20, weight: '20%' },
          { label: 'Analytical & IQ', count: 20, weight: '20%' },
          { label: 'English', count: 30, weight: '10%' },
        ],
      },
      {
        name: 'Business · FinTech',
        totalMcqs: 120,
        minutes: 120,
        sections: [
          { label: 'Basic Mathematics', count: 60, weight: '50%' },
          { label: 'Analytical Reasoning', count: 30, weight: '25%' },
          { label: 'English', count: 30, weight: '10%' },
        ],
        note:
          'Essay Writing carries another 15% of the marks. It is written, not ' +
          'answered, so it is not part of the MCQ practice in the app.',
      },
    ],
  },
  {
    slug: 'nust',
    short: 'NUST',
    name: 'NUST',
    full: 'National University of Sciences & Technology',
    test: 'NUST Entry Test (NET)',
    logo: '/unis/nust.png',
    color: '#1C5B9E',
    campuses: ['Islamabad', 'Rawalpindi', 'Risalpur', 'Karachi', 'Quetta'],
    intro:
      'NET is four different papers sharing one name. Which one you sit ' +
      'depends on the school you are applying to, and they share almost no ' +
      'subjects — an Applied Sciences candidate sits Biology and Chemistry ' +
      'where an engineering candidate sits Physics and Mathematics.',
    negative: 'No — nothing is deducted for a wrong answer.',
    programs: [
      {
        name: 'Engineering · Computer Science',
        totalMcqs: 200,
        minutes: 180,
        sections: [
          { label: 'Mathematics', count: 100, weight: '50%' },
          { label: 'Physics', count: 60, weight: '30%' },
          { label: 'English', count: 40, weight: '20%' },
        ],
      },
      {
        name: 'Applied Sciences',
        totalMcqs: 200,
        minutes: 180,
        sections: [
          { label: 'Biology', count: 100, weight: '50%' },
          { label: 'Chemistry', count: 60, weight: '30%' },
          { label: 'English', count: 40, weight: '20%' },
        ],
      },
      {
        name: 'Business Studies',
        totalMcqs: 200,
        minutes: 180,
        sections: [
          { label: 'Quantitative Mathematics', count: 100, weight: '50%' },
          { label: 'English', count: 100, weight: '50%' },
        ],
      },
      {
        name: 'Architecture · Industrial Design',
        totalMcqs: 100,
        minutes: 90,
        sections: [
          { label: 'Design Aptitude', weight: '50%' },
          { label: 'Mathematics', count: 60, weight: '30%' },
          { label: 'English', count: 40, weight: '20%' },
        ],
        note:
          'Design Aptitude is drawn by hand — line control, perspective, ' +
          'object drawing, 2D to 3D. It cannot be practised as multiple ' +
          'choice, so the app covers the Mathematics and English half only.',
      },
    ],
  },
  {
    slug: 'nts',
    short: 'NTS',
    name: 'NTS NAT',
    full: 'National Testing Service — National Aptitude Test',
    test: 'NAT (ICS / CS)',
    logo: '/unis/nts.png',
    color: '#E8862A',
    campuses: ['COMSATS', 'Air University', 'Bahauddin Zakariya', 'and other NAT universities'],
    intro:
      'The NAT is accepted by a long list of universities rather than set by ' +
      'one, which makes a single score useful in several applications. It ' +
      'comes in several versions; the one covered here is NAT-ICS/CS.',
    negative: 'No — nothing is deducted for a wrong answer.',
    programs: [
      {
        name: 'NAT-ICS / CS',
        totalMcqs: 90,
        minutes: 100,
        sections: [
          { label: 'English', count: 20 },
          { label: 'Analytical Reasoning', count: 20 },
          { label: 'Quantitative', count: 20 },
          { label: 'Computer Science', count: 30 },
        ],
      },
    ],
  },
  {
    slug: 'mdcat',
    short: 'MDCAT',
    name: 'MDCAT',
    full: 'Medical & Dental College Admission Test',
    test: 'MDCAT',
    logo: '/unis/pmdc.jpg',
    color: '#3E8E7E',
    campuses: ['Every PMDC-recognised medical and dental college'],
    intro:
      'MDCAT is the single national gate to MBBS and BDS, held once a year ' +
      'and regulated by the PM&DC. One sitting decides the year.',
    negative: 'No — nothing is deducted for a wrong answer.',
    programs: [
      {
        name: 'MBBS · BDS',
        sections: [
          { label: 'Biology' },
          { label: 'Chemistry' },
          { label: 'Physics' },
          { label: 'English' },
          { label: 'Logical Reasoning' },
        ],
      },
    ],
  },
  {
    slug: 'nums',
    short: 'NUMS',
    name: 'NUMS',
    full: 'National University of Medical Sciences',
    test: 'NUMS Entry Test',
    logo: '/unis/nums.jpg',
    color: '#2F6B4F',
    campuses: ['Army Medical College', 'and NUMS-affiliated medical colleges'],
    intro:
      'NUMS runs its own entry test rather than admitting on MDCAT alone, ' +
      'with its own weighting. A student applying to both prepares for two ' +
      'papers, not one.',
    negative: 'No — nothing is deducted for a wrong answer.',
    programs: [
      {
        name: 'MBBS · BDS',
        sections: [
          { label: 'Biology', weight: '37%' },
          { label: 'Chemistry', weight: '26.5%' },
          { label: 'Physics', weight: '26.5%' },
          { label: 'English', weight: '10%' },
        ],
      },
    ],
  },
]

export function universityBySlug(slug) {
  return UNIVERSITIES.find((u) => u.slug === slug)
}

/**
 * 2027 test dates, by slug.
 *
 * Deliberately empty. Every university announces its own schedule and none
 * of them has published 2027 yet; a date invented here is a date a student
 * plans a year around and then misses. The page shows nothing at all until
 * a real one is added, which is the only safe default for this particular
 * piece of information.
 *
 * Shape when filled:
 *   fast: [{ label: 'Session 1', window: '15–22 June 2027' }]
 */
export const TEST_DATES_2027 = {}
