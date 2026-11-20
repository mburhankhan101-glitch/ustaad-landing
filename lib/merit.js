// ─── Merit formulas ─────────────────────────────────────────────────────────
//
// A student decides where to apply on the number this produces. A weight that
// is wrong by five points sends someone to the wrong university, and they
// will not find out for months. So nothing goes in here that has not been
// read off the university's own page, and every entry carries the URL it came
// from and the day it was checked.
//
// That is also why the weights are data rather than arithmetic buried in a
// component: one number, in one place, next to its source.
//
// What is deliberately absent is as important as what is here. NTS NAT has no
// merit formula of its own — each university that accepts a NAT score weights
// it differently — so there is no NAT calculator and there should not be one.

// confidence says where a formula came from, and only ever downgrades the
// presentation, never the arithmetic:
//
//   'official' — read off the institution's own criteria page or prospectus.
//   'standard' — the formula the sector uses, consistent across admitting
//                bodies but not quoted from one page. No warning shown; the
//                source line says what it is.
//   'estimate' — the institution publishes something different, or
//                disclaims this one. Shows a banner and a badge.
//
/** Every applicant route for every university, flattened for lookup. */
export const MERIT = [
  {
    slug: 'nust',
    short: 'NUST',
    name: 'NUST',
    full: 'National University of Sciences & Technology',
    test: 'NET',
    testOutOf: 200,
    logo: '/unis/nust.png',
    color: '#00BCD4',
    blurb:
      'NUST weights the entry test more heavily than any other university ' +
      'here: three quarters of your aggregate is NET alone. Matric and ' +
      'Inter together are the remaining quarter.',

    confidence: 'official',
    source: {
      url: 'https://nust.edu.pk/admissions/undergraduates/merit-criteria-for-admission-on-net-basis/',
      label: 'NUST merit generation criteria',
      checked: '2026-11-20',
    },

    // Quoted from the official page so a future edit can be checked against
    // the wording rather than against memory:
    //
    //   NUST Entry Test                                           75 %
    //   SSC / O Level / equivalent                                10 %
    //   HSSC (Part-1) / HSSC / A level / Equivalent / DAE          15 %
    //
    //   * O/A Level candidates who are in A Level (final year) will be
    //     assigned 25% weightage to their O Level equivalence marks as per
    //     equivalence certificate issued by IBCC, Pakistan.
    routes: [
      {
        id: 'net',
        ask: 'with a completed HSSC or A Level result',
        label: 'I have my HSSC / FSc / A Level result',
        hint: 'The usual route. HSSC Part-1 marks count if the full result is not out yet.',
        parts: [
          { id: 'net', label: 'NET score', weight: 0.75, outOf: 200, kind: 'score' },
          { id: 'ssc', label: 'Matric / SSC / O Level equivalence', weight: 0.1, kind: 'marks' },
          {
            id: 'hssc',
            label: 'Inter / HSSC (or Part-1) / A Level equivalence / DAE',
            weight: 0.15,
            kind: 'marks',
          },
        ],
      },
      {
        id: 'net-alevel-pending',
        ask: 'when an A Level result is still pending',
        label: 'I am in A Level final year, result pending',
        hint:
          'NUST gives your O Level equivalence 25% in place of the usual ' +
          '10 + 15 split, as per the IBCC certificate.',
        parts: [
          { id: 'net', label: 'NET score', weight: 0.75, outOf: 200, kind: 'score' },
          { id: 'ssc', label: 'O Level equivalence (IBCC)', weight: 0.25, kind: 'marks' },
        ],
      },
      {
        id: 'sat-national',
        ask: 'on a SAT or ACT for a national seat',
        label: 'I am applying on ACT / SAT — national seat',
        hint: 'Same split as NET, with the ACT or SAT score in its place.',
        parts: [
          { id: 'test', label: 'ACT / SAT score (as a percentage)', weight: 0.75, kind: 'percent' },
          { id: 'ssc', label: 'Matric / SSC / O Level equivalence', weight: 0.1, kind: 'marks' },
          {
            id: 'hssc',
            label: 'Inter / HSSC (or Part-1) / A Level equivalence / DAE',
            weight: 0.15,
            kind: 'marks',
          },
        ],
      },
      {
        id: 'sat-international',
        ask: 'on a SAT or ACT for an international seat',
        label: 'I am applying on ACT / SAT — international seat',
        hint: 'Nothing but the test counts on an international seat.',
        parts: [
          { id: 'test', label: 'ACT / SAT score (as a percentage)', weight: 1, kind: 'percent' },
        ],
      },
    ],

    faqs: [
      {
        q: 'How much is NET worth in NUST merit?',
        a:
          'Three quarters of it. NET alone is 75% of your aggregate, which ' +
          'is the heaviest any of these universities weights its entry test ' +
          '\u2014 Matric and Inter together are the remaining 25%.',
      },
      {
        q: 'Can I take the NUST NET more than once?',
        a:
          'Yes. NUST states that candidates may appear more than once and ' +
          'the best score is the one considered for admission. Within a ' +
          'single series only one attempt is allowed per discipline, so a ' +
          'second attempt means a later series.',
      },
    ],
    eligibility:
      'NUST requires more than 60% in SSC and in HSSC, or the equivalent ' +
      'qualification. That is the bar to apply, not a merit target.',

    notes: [
      {
        heading: 'Which NET counts',
        body:
          'You may sit NET more than once and NUST takes your best score. ' +
          'Within a single series you get one attempt per discipline, so a ' +
          'second go means a later series.',
      },
      {
        heading: 'Architecture is weighted the same',
        body:
          'B Architecture and B Industrial Design sit NET-Architecture rather ' +
          'than NET-Engineering, but the aggregate is the same 75 / 10 / 15. ' +
          'Only the paper changes: Design Aptitude 50%, Mathematics 30%, ' +
          'English 20%.',
      },
      {
        heading: 'Marks, not grades',
        body:
          'Enter obtained and total marks and the calculator works out the ' +
          'percentage. For O and A Levels use the percentage on your IBCC ' +
          'equivalence certificate, which is the figure NUST uses.',
      },
    ],
  },
  {
    slug: 'fast',
    short: 'FAST',
    name: 'FAST NUCES',
    full: 'National University of Computer & Emerging Sciences',
    test: 'admission test',
    logo: '/unis/fast.png',
    color: '#6C63FF',
    blurb:
      'FAST weights your school results more heavily than the test, and ' +
      'weights them differently again for engineering. It also accepts three ' +
      'different tests, so the figure that goes in is a percentage.',

    confidence: 'official',
    source: {
      url: 'https://www.nu.edu.pk/Admissions/EligibilityCriteria',
      label: 'FAST NUCES eligibility and selection criteria',
      checked: '2026-11-21',
    },

    // Quoted from the official selection criteria tables:
    //
    //   BS (Engineering)            test 33%   HSSC 50%   SSC 17%
    //   BS (Computing)              test 50%   HSSC 40%   SSC 10%
    //   BBA / BS (Business)         test 50%   HSSC 40%   SSC 10%
    //
    // The two eligibility bars differ and the difference is easy to miss:
    // engineering needs 60% in HSSC, computing and business need 50%.
    routes: [
      {
        id: 'computing-business',
        ask: 'for Computing or Business',
        label: 'Computing or Business',
        hint:
          'CS, AI, Cyber Security, Data Science, Software Engineering, BBA, ' +
          'Accounting & Finance, Business Analytics, FinTech. Needs 60% in ' +
          'SSC and 50% in HSSC to apply.',
        parts: [
          { id: 'test', label: 'Admission test (FAST-NUCES, SAT or NTS NAT)', weight: 0.5, kind: 'percent' },
          { id: 'hssc', label: 'HSSC / equivalent', weight: 0.4, kind: 'marks' },
          { id: 'ssc', label: 'SSC / equivalent', weight: 0.1, kind: 'marks' },
        ],
      },
      {
        id: 'engineering',
        ask: 'for Engineering',
        label: 'Engineering',
        hint:
          'Civil, Electrical and Computer Engineering. The test counts for a ' +
          'third here, not a half. Needs 60% in both SSC and HSSC to apply.',
        parts: [
          { id: 'test', label: 'Admission test (FAST-NUCES, SAT or NTS NAT-IE)', weight: 0.33, kind: 'percent' },
          { id: 'hssc', label: 'HSSC / equivalent', weight: 0.5, kind: 'marks' },
          { id: 'ssc', label: 'SSC / equivalent', weight: 0.17, kind: 'marks' },
        ],
      },
    ],

    faqs: [
      {
        q: 'Does FAST accept an NTS NAT score?',
        a:
          'Yes. FAST accepts its own admission test, the SAT, or an NTS NAT, ' +
          'and you choose one. Engineering takes NAT-IE; computing takes ' +
          'NAT-IE or NAT-ICS; business also takes NAT-ICOM and NAT-IGS.',
      },
      {
        q: 'Why is FAST engineering merit different from computing?',
        a:
          'FAST weights the test lower for engineering \u2014 33% instead ' +
          'of 50% \u2014 and your HSSC higher, at 50% instead of 40%. The ' +
          'eligibility bar differs too: engineering needs 60% in HSSC where ' +
          'computing and business need 50%.',
      },
    ],
    eligibility:
      'Every programme needs at least 60% in SSC. HSSC needs 60% for ' +
      'engineering and 50% for computing and business.',

    notes: [
      {
        heading: 'Three tests, one box',
        body:
          'FAST accepts its own admission test, the SAT, or an NTS NAT, and ' +
          'you pick one. Because they are scored on different scales, enter ' +
          'the percentage rather than a raw mark. Engineering takes NAT-IE; ' +
          'computing takes NAT-IE or NAT-ICS; business also takes NAT-ICOM ' +
          'and NAT-IGS.',
      },
      {
        heading: 'Which HSSC marks count',
        body:
          'Part I and Part II together, or Part I alone if Part II is not ' +
          'out yet, or the percentage on your IBCC equivalence certificate ' +
          'for O and A Levels. Whichever applies when the merit list is ' +
          'compiled.',
      },
      {
        heading: 'The cut-off is not published in advance',
        body:
          'FAST states that merit cut-off marks are determined by the ' +
          'university, so an aggregate here is your number, not a place.',
      },
    ],
  },
  {
    slug: 'comsats',
    short: 'COMSATS',
    name: 'COMSATS',
    full: 'COMSATS University Islamabad',
    test: 'NTS NAT',
    // The NTS crest rather than the university's: a student arrives here
    // holding a NAT result, and that is the mark they recognise.
    logo: '/unis/nts.png',
    color: '#12805C',
    confidence: 'official',
    blurb:
      'Where an NTS NAT score usually goes. Half the aggregate is the NAT ' +
      'on a normal degree \u2014 but on Architecture and Design it is worth ' +
      'a tenth, and a drawing test decides most of it.',

    source: {
      url: 'https://ww2.comsats.edu.pk/ro/Prospectus/UG_Prospectus/Admission-Guide-Undergraduate-Programs-2026-27.pdf',
      label: 'COMSATS admission guide for undergraduate programs 2026-27',
      checked: '2026-11-21',
    },

    // Quoted from the guide, section "2) Entrance Test" and the Faculty of
    // Architecture and Design pages:
    //
    //   Non-Engineering and Engineering, bachelor's:
    //     Matriculation 10%   Intermediate 40%   NTS Test 50%
    //     Note: Valid NTS Test Score (minimum 33%) as per PEC policy
    //
    //   B Architecture:
    //     Matric/O Level 5%   Intermediate 10%   NTS 10%
    //     Creative Aptitude Test 40% (Drawing 25 + Critical Thinking 15)
    //     Interview 35%
    //
    //   B Design / B Fine Arts:
    //     Matriculation 3%  Intermediate 12%  NTS 15%
    //     Drawing 25%  Write-up 10%  Interview 30%  Portfolio 5%
    //
    //   B Interior Design:
    //     Matriculation 3%  Intermediate 12%  NTS 15%
    //     Writing 10%  Interview 30%  Drawing/Making 30%
    routes: [
      {
        id: 'general',
        ask: 'for a normal bachelor\u2019s degree',
        label: 'A normal bachelor\u2019s degree',
        hint:
          'Engineering and non-engineering are weighted identically. ' +
          'Engineering additionally needs a valid NTS score of at least 33% ' +
          'under PEC policy.',
        parts: [
          { id: 'test', label: 'NTS Test', weight: 0.5, kind: 'percent' },
          { id: 'hssc', label: 'Intermediate (or equivalent)', weight: 0.4, kind: 'marks' },
          { id: 'ssc', label: 'Matriculation (or equivalent)', weight: 0.1, kind: 'marks' },
        ],
      },
      {
        id: 'barch',
        ask: 'for B Architecture',
        label: 'B Architecture',
        hint:
          'Three quarters of this is decided on the day: the departmental ' +
          'Creative Aptitude Test and the interview together are 75%.',
        parts: [
          { id: 'ssc', label: 'Matric / O Levels', weight: 0.05, kind: 'marks' },
          { id: 'hssc', label: 'Intermediate (Pre-Engineering) / A Levels with Mathematics', weight: 0.1, kind: 'marks' },
          { id: 'test', label: 'NTS', weight: 0.1, kind: 'percent' },
          { id: 'cat', label: 'Creative Aptitude Test (drawing 25 + critical thinking 15)', weight: 0.4, kind: 'percent' },
          { id: 'interview', label: 'Interview', weight: 0.35, kind: 'percent' },
        ],
      },
      {
        id: 'design',
        ask: 'for B Design or B Fine Arts',
        label: 'B Design or B Fine Arts',
        hint:
          'Past academic score and NTS together are 30%. The Creative ' +
          'Aptitude Test is the other 70%.',
        parts: [
          { id: 'ssc', label: 'Matriculation', weight: 0.03, kind: 'marks' },
          { id: 'hssc', label: 'Intermediate', weight: 0.12, kind: 'marks' },
          { id: 'test', label: 'NTS', weight: 0.15, kind: 'percent' },
          { id: 'drawing', label: 'Drawing test', weight: 0.25, kind: 'percent' },
          { id: 'writeup', label: 'Write-up', weight: 0.1, kind: 'percent' },
          { id: 'interview', label: 'Interview', weight: 0.3, kind: 'percent' },
          { id: 'portfolio', label: 'Portfolio', weight: 0.05, kind: 'percent' },
        ],
      },
      {
        id: 'interior',
        ask: 'for B Interior Design',
        label: 'B Interior Design',
        hint:
          'Same 30 / 70 split as Design, but the Creative Aptitude Test is ' +
          'divided differently.',
        parts: [
          { id: 'ssc', label: 'Matriculation', weight: 0.03, kind: 'marks' },
          { id: 'hssc', label: 'Intermediate', weight: 0.12, kind: 'marks' },
          { id: 'test', label: 'NTS', weight: 0.15, kind: 'percent' },
          { id: 'writing', label: 'Creative Aptitude (writing)', weight: 0.1, kind: 'percent' },
          { id: 'drawing', label: 'Creative Aptitude (drawing / making)', weight: 0.3, kind: 'percent' },
          { id: 'interview', label: 'Creative Aptitude (interview)', weight: 0.3, kind: 'percent' },
        ],
      },
    ],

    faqs: [
      {
        q: 'Is an NTS NAT score enough for COMSATS?',
        a:
          'You need a valid relevant NAT-I score when you submit the ' +
          'application, and for engineering it must be at least 33% under ' +
          'PEC policy. On a normal degree the NAT is half your aggregate.',
      },
      {
        q: 'Why is COMSATS Architecture merit so different?',
        a:
          'Because most of it is decided on the day. On B Architecture the ' +
          'NTS is worth 10%, not 50%, and the Creative Aptitude Test plus ' +
          'the interview are 75%. On B Design everything you have already ' +
          'earned is 30% and the aptitude test is 70%.',
      },
    ],
    eligibility:
      'You need a valid relevant NTS score (NAT-I) when you submit the ' +
      'application. Engineering additionally requires at least 33% in the ' +
      'NTS test, as PEC policy. Subject-group requirements are set per ' +
      'programme and campus.',

    notes: [
      {
        heading: 'A NAT score is not a merit number',
        body:
          'NTS sets and marks the paper; every university that accepts it ' +
          'decides what the score is worth. At COMSATS a NAT is half of a ' +
          'normal degree and a tenth of B Architecture \u2014 the same ' +
          'result, valued five times differently inside one university. ' +
          'That is why there is no general NAT calculator anywhere.',
      },
      {
        heading: 'Architecture and Design are decided on the day',
        body:
          'On B Design, everything you have already earned \u2014 Matric, ' +
          'Intermediate and NTS together \u2014 is 30%. The Creative ' +
          'Aptitude Test is 70%. On B Architecture the test and interview ' +
          'are 75%. If you are applying to either, the drawing test is the ' +
          'thing to prepare, not the NAT.',
      },
      {
        heading: 'Getting as far as the interview',
        body:
          'For B Architecture the guide states that the combined score of ' +
          'Matric/O-Levels, Intermediate/A-Levels, NTS and CAT must reach ' +
          '50% before you are called to interview \u2014 which is 35% of ' +
          'the total on its own.',
      },
    ],
  },

  {
    slug: 'mdcat',
    short: 'MDCAT',
    name: 'MDCAT',
    full: 'MBBS and BDS admission, public sector',
    test: 'MDCAT',
    logo: '/unis/pmdc.jpg',
    color: '#C4362F',
    confidence: 'standard',
    blurb:
      'The split every public-sector medical and dental admission uses: ' +
      'half the aggregate is MDCAT, and your Inter is worth four times your ' +
      'Matric.',

    source: {
      url: 'https://www.pmdc.pk/Publication/LawsAndRegulations',
      label: 'PM&DC admissions policy and regulations',
      checked: '2026-11-21',
    },

    // The weights are consistent across the provincial admitting bodies —
    // UHS in Punjab, KMU in KPK, and Sindh — rather than taken from one
    // page. PMDC publishes its regulations as a PDF its own server will not
    // serve over a valid certificate chain, so this is sourced from the
    // sector, and the page says so instead of implying a document nobody
    // can open.
    routes: [
      {
        id: 'mbbs-bds',
        label: 'MBBS or BDS, public sector',
        hint:
          'Enter the MDCAT marks printed on your result. The total is ' +
          'editable because the paper has not always been out of 180.',
        parts: [
          { id: 'test', label: 'MDCAT', weight: 0.5, kind: 'marks', defaultTotal: 180 },
          { id: 'hssc', label: 'HSSC / FSc', weight: 0.4, kind: 'marks' },
          { id: 'ssc', label: 'Matric / SSC', weight: 0.1, kind: 'marks' },
        ],
      },
    ],

    faqs: [
      {
        q: 'Is MDCAT out of 180 or 200?',
        a:
          'It has been both. The current paper is 180, which is why the ' +
          'total is an editable field here rather than a fixed number \u2014 ' +
          'put in whatever your own result sheet says.',
      },
      {
        q: 'How much is Matric worth in MDCAT merit?',
        a:
          'A tenth. Inter is worth four times as much at 40%, and MDCAT is ' +
          'half the aggregate on its own. A strong Matric cannot rescue a ' +
          'weak Inter.',
      },
    ],
    eligibility:
      'Public-sector MBBS and BDS set a minimum MDCAT score as well as a ' +
      'minimum in HSSC, and both move between cycles. Read the admission ' +
      'notice for the province you are applying in.',

    notes: [
      {
        heading: 'Your Inter is worth four Matrics',
        body:
          'Matric is a tenth of this and Inter is four tenths. A strong ' +
          'Matric cannot carry a weak Inter, and the half that is MDCAT ' +
          'outweighs both of them put together.',
      },
      {
        heading: 'Private and federal colleges can differ',
        body:
          'This is the public-sector formula. Some federal and private ' +
          'colleges weight their own entrance differently, and a few drop ' +
          'Matric entirely. If you are applying outside the provincial ' +
          'public lists, check that college’s own notice.',
      },
      {
        heading: 'Why the total is editable',
        body:
          'MDCAT has not always been out of 180. Rather than hard-code a ' +
          'number that changes between cycles, the total is a field — ' +
          'put in whatever your own result sheet says.',
      },
    ],
  },
]

/**
 * A route's formula as a sentence, generated from its weights.
 *
 * Used in the FAQ and in the structured data, so the answer a search engine
 * shows is the same arithmetic the calculator runs. Written by hand it would
 * drift the first time a weight changed, and the drifted copy is the one
 * Google would be caching.
 */
export function formulaSentence(route) {
  return route.parts
    .map((p) => `${Math.round(p.weight * 100)}% ${p.label}`)
    .join(' + ')
}

/**
 * The questions students actually type, answered from the verified data.
 *
 * Marked up as FAQPage on each calculator page. Everything factual here is
 * either generated from the weights or copied from the same source the
 * weights came from — nothing is written to fill the section out.
 */
export function faqsFor(uni) {
  const out = []

  // One question per applicant route. Cramming four formulas into a single
  // answer buried the one a given student needed, and "How is FAST merit
  // calculated for Engineering" is a question people actually type, where
  // the combined version is a question nobody does.
  for (const r of uni.routes) {
    out.push({
      q:
        uni.routes.length === 1
          ? `How is ${uni.name} merit calculated?`
          : `How is ${uni.name} merit calculated ${r.ask}?`,
      a: `${formulaSentence(r)}.${r.hint ? ' ' + r.hint : ''}`,
    })
  }

  out.push({
    q: `What do I need to be eligible for ${uni.name}?`,
    a: uni.eligibility,
  })

  for (const extra of uni.faqs ?? []) out.push(extra)

  out.push({
    q: `What aggregate do I need to get into ${uni.name}?`,
    a:
      'There is no fixed number. A closing aggregate depends on how many ' +
      'people applied that year and to which programme, so it moves every ' +
      'intake. This calculator gives you your aggregate; the cut-off is ' +
      'only known once the merit list is published.',
  })

  return out
}

export function meritBySlug(slug) {
  return MERIT.find((m) => m.slug === slug) ?? null
}

/**
 * One part of an aggregate, as a percentage of itself.
 *
 * `marks` is obtained out of total. `score` is a raw test mark out of a known
 * maximum. `percent` is already a percentage. Returns null when the input is
 * incomplete or impossible, so the caller can refuse to show a number rather
 * than show a wrong one.
 */
export function partPercent(part, value) {
  if (part.kind === 'percent') {
    const p = Number(value?.percent)
    if (!Number.isFinite(p) || p < 0 || p > 100) return null
    return p
  }

  if (part.kind === 'score') {
    const got = Number(value?.obtained)
    if (!Number.isFinite(got) || got < 0 || got > part.outOf) return null
    return (got / part.outOf) * 100
  }

  const got = Number(value?.obtained)
  const total = Number(value?.total)
  if (!Number.isFinite(got) || !Number.isFinite(total)) return null
  // A total of zero is a typo, not a division — say nothing rather than NaN.
  if (total <= 0 || got < 0 || got > total) return null
  return (got / total) * 100
}

/**
 * The aggregate for one route, or null if anything is missing.
 *
 * All or nothing on purpose. A half-filled form that quietly treats the empty
 * fields as zero shows an aggregate far below the real one, and a student who
 * believes it may not apply at all.
 */
export function aggregate(route, values) {
  let total = 0
  const breakdown = []

  for (const part of route.parts) {
    const pct = partPercent(part, values?.[part.id])
    if (pct == null) return null
    const contribution = pct * part.weight
    total += contribution
    breakdown.push({ ...part, percent: pct, contribution })
  }

  // The weights are read off an official page, so they should sum to 1. If an
  // edit ever breaks that, fail loudly here rather than quietly returning an
  // aggregate out of 97.
  const weightSum = route.parts.reduce((s, p) => s + p.weight, 0)
  if (Math.abs(weightSum - 1) > 0.0001) {
    throw new Error(
      `Route "${route.id}" weights sum to ${weightSum}, not 1. ` +
        'Check it against the official criteria before shipping.',
    )
  }

  return { total, breakdown }
}

export const round2 = (n) => Math.round(n * 100) / 100
