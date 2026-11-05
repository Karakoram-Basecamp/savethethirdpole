/**
 * Page content.
 * All copy and structured data live here so editors can update text without
 * touching components. Regional figures cite ICIMOD's HI-WISE assessment (2023);
 * everything marked `sample` is illustrative and should be replaced with the
 * association's own records.
 */
import { img } from './site.js';

/* ---------- HOME ---------- */

/** Animated counter section — regional context figures. */
export const REGION_STATS = [
  { value: 54000, suffix: '+', label: 'glaciers across the Hindu Kush–Karakoram–Himalaya' },
  { value: 12, suffix: '', label: 'major river basins fed by Third Pole snow and ice' },
  { value: 2, suffix: ' bn', label: 'people depend on water from these mountains' },
  { value: 65, suffix: '%', label: 'faster glacier loss in 2011–2020 than the decade before' },
];
export const REGION_STATS_SOURCE = 'ICIMOD, Water, Ice, Society and Ecosystems in the Hindu Kush Himalaya (HI-WISE), 2023.';

/** "What we do" pillars on the home page. */
export const PILLARS = [
  {
    icon: 'mountain',
    title: 'Watch the ice',
    text: 'We document glacier change with repeat photography, satellite imagery and field visits, and publish what we find in plain language.',
  },
  {
    icon: 'book',
    title: 'Teach the valleys',
    text: 'Glacier literacy workshops for schools and mountain guides, taught in Urdu, Burushaski, Wakhi and English.',
  },
  {
    icon: 'shield',
    title: 'Prepare for floods',
    text: 'We help villages below glacial lakes map hazards, rehearse evacuation routes and keep early-warning contacts current.',
  },
  {
    icon: 'megaphone',
    title: 'Carry the message',
    text: 'From Gilgit to Brussels, we bring mountain voices into climate policy conversations where they are usually missing.',
  },
];

/** Image carousel — field photography (placeholder images). */
export const GALLERY = [
  {
    src: img(1018),
    title: 'Morning above the Hunza River',
    place: 'Hunza Valley',
    caption: 'Meltwater from Batura and Passu glaciers reaches the river within days. Every orchard downstream depends on it.',
  },
  {
    src: img(1036),
    title: 'Winter survey season',
    place: 'Upper Hunza',
    caption: 'Snow-cover surveys in February tell us how much water the valleys can expect when spring arrives.',
  },
  {
    src: img(1015),
    title: 'Where the ice ends',
    place: 'Shimshal',
    caption: 'Our volunteers photograph the same snouts from fixed points each year, so the change is impossible to argue with.',
  },
  {
    src: img(1016),
    title: 'Canyons cut by meltwater',
    place: 'Gilgit-Baltistan',
    caption: 'Rivers fed by glaciers carry sediment and risk. Knowing the flow means knowing when to move.',
  },
  {
    src: img(29),
    title: 'The high peaks',
    place: 'Karakoram Range',
    caption: 'The Karakoram holds some of the largest glaciers outside the polar regions, and they are changing faster than ever recorded.',
  },
];

/* ---------- VISION ---------- */

export const VISION_GOALS = [
  {
    year: '2027',
    title: 'A baseline for Hunza',
    text: 'Publish an open, annotated map of glacier extents across the Hunza basin, combining historical imagery with this year’s field photography.',
  },
  {
    year: '2028',
    title: 'Fifty schools, one curriculum',
    text: 'Train teachers in fifty mountain schools to run a six-session glacier and water module, with materials in local languages.',
  },
  {
    year: '2029',
    title: 'Every village has a plan',
    text: 'Support each village we work with to keep a written flood-preparedness plan, tested in a drill at least once a year.',
  },
  {
    year: '2030',
    title: 'Mountain voices in policy',
    text: 'Bring community representatives to European and international climate forums each year, with travel and translation paid.',
  },
];

export const VALUES = [
  { title: 'Evidence first', text: 'We say what the data shows, cite where it comes from and correct ourselves in public.' },
  { title: 'Led from the valleys', text: 'Programmes are designed with the communities that live beside the ice, not for them.' },
  { title: 'Open by default', text: 'Our maps, photos and teaching materials are free to reuse under open licences.' },
  { title: 'Accountable funds', text: 'As a registered Austrian Verein we publish annual accounts and an activity report.' },
];

/** Team — founders plus the roles we are recruiting for. */
export const TEAM = [
  {
    name: 'M. Ajmal K. Masood',
    role: 'Co-founder',
    bio: 'Climate politics researcher at the University of Salzburg and founder of KarakoramBaseCamp. Grew up in Hunza beneath the glaciers this work is about.',
    initials: 'AM',
  },
  {
    name: 'Muneer Ahmed',
    role: 'Co-founder',
    bio: 'Co-founded the association to connect field knowledge from Gilgit-Baltistan with partners and supporters in Europe.',
    initials: 'MA',
  },
  {
    name: 'Field Coordinator',
    role: 'Open role · Hunza',
    bio: 'Organise repeat photography routes, coordinate local volunteers and keep village contacts up to date.',
    open: true,
  },
  {
    name: 'GIS & Data Volunteer',
    role: 'Open role · Remote',
    bio: 'Help digitise glacier outlines from satellite imagery and maintain our open dataset.',
    open: true,
  },
  {
    name: 'Education Lead',
    role: 'Open role · Gilgit-Baltistan',
    bio: 'Adapt the school module, train teachers and gather feedback from classrooms.',
    open: true,
  },
  {
    name: 'Partnerships Volunteer',
    role: 'Open role · Salzburg',
    bio: 'Build relationships with universities, alpine clubs and foundations across Austria and the EU.',
    open: true,
  },
];

/* ---------- DASHBOARD (sample data) ---------- */

export const DASHBOARD_KPIS = [
  { label: 'Glaciers on our watch list', value: 8, delta: '+3 this year', trend: 'up' },
  { label: 'Photo points re-surveyed', value: 46, delta: '+18 vs 2025', trend: 'up' },
  { label: 'Students reached', value: 1240, delta: '+410 vs 2025', trend: 'up' },
  { label: 'Active volunteers', value: 37, delta: '+9 since spring', trend: 'up' },
];

/** Monthly community reach (workshop participants), 2026 — sample. */
export const MONTHLY_REACH = [
  { month: 'Jan', value: 40 },
  { month: 'Feb', value: 65 },
  { month: 'Mar', value: 90 },
  { month: 'Apr', value: 120 },
  { month: 'May', value: 155 },
  { month: 'Jun', value: 110 },
  { month: 'Jul', value: 95 },
  { month: 'Aug', value: 130 },
  { month: 'Sep', value: 175 },
  { month: 'Oct', value: 160 },
];

/** How each euro was allocated — sample. */
export const FUND_ALLOCATION = [
  { label: 'Field monitoring', value: 38 },
  { label: 'Education', value: 27 },
  { label: 'Flood preparedness', value: 20 },
  { label: 'Advocacy', value: 10 },
  { label: 'Administration', value: 5 },
];

/** Glacier watch list — status values are sample entries. */
export const GLACIER_WATCH = [
  { name: 'Batura', valley: 'Upper Hunza', lastVisit: 'Sep 2026', status: 'Retreating' },
  { name: 'Passu', valley: 'Gojal', lastVisit: 'Sep 2026', status: 'Retreating' },
  { name: 'Shishper', valley: 'Hassanabad', lastVisit: 'Aug 2026', status: 'Surge watch' },
  { name: 'Ghulkin', valley: 'Gojal', lastVisit: 'Aug 2026', status: 'Stable' },
  { name: 'Hopar (Bualtar)', valley: 'Nagar', lastVisit: 'Jul 2026', status: 'Retreating' },
  { name: 'Hispar', valley: 'Nagar', lastVisit: 'Jun 2026', status: 'Stable' },
];

/* ---------- BLOG ---------- */

export const BLOG_CATEGORIES = ['All', 'Field notes', 'Science', 'Community', 'Policy'];

export const POSTS = [
  {
    id: 'repeat-photography',
    title: 'Same rock, same angle, ten years apart',
    category: 'Field notes',
    date: '2026-10-18',
    readTime: '6 min',
    image: img(1043, 1200, 800),
    excerpt: 'Why repeat photography is still one of the most persuasive tools in glacier science, and how our volunteers fix their camera positions.',
    body: [
      'A satellite image can tell a scientist how far a glacier has retreated. A photograph taken from the same rock, at the same angle, ten years apart, can tell a grandmother.',
      'Our volunteers mark each photo point with GPS coordinates, a compass bearing and a reference photo of the foreground. When they return the following year, they match the frame before they press the shutter.',
      'This season we re-surveyed 46 points across Gojal and Nagar. The pairs will be published under an open licence so teachers, journalists and researchers can use them freely.',
    ],
  },
  {
    id: 'glof-drills',
    title: 'What a flood drill looks like in a mountain village',
    category: 'Community',
    date: '2026-09-27',
    readTime: '5 min',
    image: img(1044, 1200, 800),
    excerpt: 'Glacial lake outburst floods give little warning. Rehearsing the first fifteen minutes is what keeps people safe.',
    body: [
      'Glacial lake outburst floods can reach a village within minutes. The difference between a close call and a tragedy is often whether everyone knows where to go.',
      'With village committees we walk evacuation routes, note who needs help moving, and agree on a single signal everyone recognises. Then we run the drill, time it, and talk about what slowed us down.',
      'Plans are written down, kept at the mosque and the school, and reviewed every spring before the melt season begins.',
    ],
  },
  {
    id: 'karakoram-anomaly',
    title: 'Is the Karakoram anomaly ending?',
    category: 'Science',
    date: '2026-09-02',
    readTime: '8 min',
    image: img(1036, 1200, 800),
    excerpt: 'For years, some Karakoram glaciers held steady while others across the Himalaya shrank. Newer studies suggest that pause is fading.',
    body: [
      'The “Karakoram anomaly” describes the observation that many glaciers in the central Karakoram were stable or even gained mass in the early 2000s, while glaciers elsewhere in High Mountain Asia retreated.',
      'Researchers have linked the anomaly to winter westerly precipitation, cooler summers and heavy debris cover. More recent assessments suggest the balance is shifting as warming continues.',
      'For valley communities the question is practical: how long can they plan around today’s water supply? We summarise the latest research each year in plain language.',
    ],
  },
  {
    id: 'classroom',
    title: 'Teaching glaciers in Burushaski',
    category: 'Community',
    date: '2026-08-14',
    readTime: '4 min',
    image: img(1015, 1200, 800),
    excerpt: 'Students learn faster when the lesson uses the words their grandparents use for ice, snow and seasons.',
    body: [
      'Many mountain languages have rich vocabularies for snow, ice and the seasons of melt. Our school module starts from those words before introducing scientific terms.',
      'Teachers report that students bring the lessons home, and that parents and grandparents add stories about where the ice used to reach.',
    ],
  },
  {
    id: 'eu-policy',
    title: 'Why mountain glaciers belong in EU climate diplomacy',
    category: 'Policy',
    date: '2026-07-21',
    readTime: '7 min',
    image: img(1016, 1200, 800),
    excerpt: 'Europe’s Alpine experience with glacier loss gives it a reason, and the expertise, to support the Third Pole.',
    body: [
      'Austria knows what it means to watch glaciers retreat. Alpine monitoring networks, hazard mapping and mountain tourism policy offer lessons that travel well.',
      'We argue for partnerships that pair Alpine research institutions with universities and communities in the Hindu Kush–Karakoram–Himalaya, funded through existing EU climate finance channels.',
    ],
  },
  {
    id: 'water-towers',
    title: 'The water towers of Asia, explained in five numbers',
    category: 'Science',
    date: '2026-06-30',
    readTime: '3 min',
    image: img(1039, 1200, 800),
    excerpt: 'Twelve river basins. Nearly two billion people. A short guide to why the Third Pole matters far beyond the mountains.',
    body: [
      'The Hindu Kush–Karakoram–Himalaya stores more ice than anywhere outside the Arctic and Antarctic, which is why it is called the Third Pole.',
      'Its snow and ice feed twelve major river basins, including the Indus, Ganges, Brahmaputra, Yangtze and Mekong. ICIMOD estimates that nearly two billion people rely on that water.',
    ],
  },
];

/* ---------- CONTACT ---------- */

export const FAQS = [
  {
    q: 'Is Save The Third Pole a registered charity?',
    a: 'Yes. We are a non-profit association (Verein) registered in Austria under the name “SAVE THE THIRD POLE – Verein zum Schutz des Dritten Pols”. Our statutes and annual report are available on request.',
  },
  {
    q: 'Where does my donation go?',
    a: 'Donations fund field monitoring, school workshops and flood-preparedness work in Gilgit-Baltistan. Our dashboard shows how funds are allocated, and we publish full accounts every year.',
  },
  {
    q: 'Can I volunteer from Europe?',
    a: 'Yes. We need help with GIS and satellite imagery, translation, design, fundraising and partnerships. Most of this work can be done remotely; tell us your skills through the contact form.',
  },
  {
    q: 'Can I join a field visit?',
    a: 'Field visits are run with local partners and are limited to volunteers with a defined role, to keep the impact on communities low. Experienced trekkers and researchers can write to us about upcoming seasons.',
  },
  {
    q: 'Do you share your data?',
    a: 'Yes. Glacier outlines, photo pairs and teaching materials are published under open licences. Researchers can contact us for raw field data and metadata.',
  },
];

export const CONTACT_SUBJECTS = ['General enquiry', 'Volunteering', 'Partnership', 'Press & media', 'Donations'];
