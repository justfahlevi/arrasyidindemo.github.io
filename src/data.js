// Content taken from the Figma file.
export const GUESTS = [
  { slug: 'hazirah', name: 'Hazirah Maulana', role: 'Entrepreneur, Kuala Lumpur', img: 'img/guest-hazirah.jpg',
    story: 'Hazirah built a business, lost it to RM5 million in debt, and rebuilt from there. Her two conversations with Dr Hanzalah are among the most watched on the channel, and one clip from them has passed 7.7 million views on TikTok.' },
  { slug: 'hamed', name: 'Dr Muhammad Hamed Aliwa', role: 'Islamic scholar (Syeikh)', img: 'img/guest-hamed.jpg',
    story: 'His father never told him to study. He showed him, by example' },
  { slug: 'amjad', name: 'Brother Amjad', role: 'Managing Director, Islamic Help Tanzania', img: 'img/guest-amjad.jpg',
    story: 'Survived a bomb blast with 47% burns. Now he builds hospitals in rural Tanzania' },
  { slug: 'razin', name: 'Dr Razin Jaafar', role: 'Doctor, health and nutrition', img: 'img/guest-razin.jpg',
    story: 'Why being ill costs more than staying healthy' },
]

export const HOME_GUEST_ROW = ['hazirah', 'hamed', 'amjad', 'razin', 'razin', 'hamed', 'razin'].map((s) => GUESTS.find((g) => g.slug === s))

export const FEATURED_EPISODES = [
  { guest: 'Hazirah Maulana', ep: 'EP 57', title: 'Rebuilt after RM 5 Million Business Debt.', img: 'img/ep-hazirah.jpg' },
  { guest: 'Das Abdul', ep: 'EP 64', title: 'Behind a 7-star hotel pillow business.', img: 'img/ep-das.jpg' },
]

export const EPISODES = [
  { guest: 'Mdnoor', ep: 'EP 43', title: 'Youngest of 12, out of poverty and now his family’s provider.', img: 'img/ep-mdnoor.jpg' },
  { guest: 'Najib Asaddok', ep: 'EP 28', title: 'From top student in Johor to business trainer, through every fall.', img: 'img/ep-najib.jpg' },
  { guest: 'Hasbullah Awang', ep: 'EP 12', title: 'Nearly RM100 million in baju kurung sales, then RM20 million in debt.', img: 'img/ep-hasbullah.jpg' },
  { guest: 'Hafizul Faiz', ep: 'EP 10', title: 'A rubber tapper’s son who worked as a cleaner overseas.', img: 'img/ep-hafizul.jpg' },
]

export const QUICK_ANSWERS = [
  { topic: 'Money, halal and haram', q: 'What does Islam say about discount cards?', who: 'Ustaz Dr Zaharuddin Abd Rahman', ep: 'EP 52' },
  { topic: 'Money, halal and haram', q: 'How to deal with business debt?', who: 'Hazirah Maulana', ep: 'EP 57' },
  { topic: 'Money, halal and haram', q: 'What’s the benefits working overseas?', who: 'Hafizul Faiz', ep: 'EP 10' },
  { topic: 'Money, halal and haram', q: 'What’s the benefits working overseas?', who: 'Hafizul Faiz', ep: 'EP 10' },
]

export const TESTIMONIALS = [
  { q: 'After this episode, I started restructuring my business debt. I feel hopeful again.', who: 'Aisyah, Selangor', ctx: 'After watching Ep 30 · Hazirah Maulana' },
  { q: 'So much insight on nutrition and fasting. A long podcast, yet I still wanted more.', who: 'Amir, Kuala Lumpur', ctx: 'After watching Ep 53 · Dr Razin Jaafar' },
  { q: 'That story about death made me reflect on my life all week.', who: 'Melor, Selangor', ctx: 'After watching a clip on TikTok' },
]

export const IMPACT = [
  { v: '100M+', label: 'Views', d: 'views across all platforms', medium: true },
  { v: '13M+', label: 'YouTube views', d: '5 million views in the last 28 days' },
  { v: '650K+', label: 'Followers', d: 'TikTok, YouTube, Facebook & Instagram' },
  { v: '15M+', label: 'TikTok likes', d: 'Every like, a lesson that connects' },
  { v: '100+', label: 'Hours of learning', d: '60+ full episodes with expert guests' },
  { v: '18x', label: 'Annual growth', d: 'A community growing every week' },
]

export const PLATFORM_STATS = [
  { v: '100M+', label: 'Views' },
  { v: '15.7M+', label: 'Likes' },
  { v: '650K+', label: 'Followers' },
  { v: '60+', label: 'Full Episodes' },
]

// Co-host pop-up content. Replace each [placeholder] with the real role and write-up.
export const COHOSTS = [
  {
    name: 'Mr Shahril Sarapudin',
    img: 'img/avatar-1.png',
    title: 'Co-host',
    role: '[role]',
    bio: '[A short write-up about Mr Shahril Sarapudin: their background, what they do, and what they bring to the conversations.]',
  },
  {
    name: 'Mr Mu’az Nawawi',
    img: 'img/avatar-2.png',
    title: 'Co-host',
    role: '[role]',
    bio: '[A short write-up about Mr Mu’az Nawawi: their background, what they do, and what they bring to the conversations.]',
  },
  {
    name: 'Mr Fadzil Saleh',
    img: 'img/avatar-3.png',
    title: 'Co-host',
    role: '[role]',
    bio: '[A short write-up about Mr Fadzil Saleh: their background, what they do, and what they bring to the conversations.]',
  },
  {
    name: 'Mr Amir Jaaffar',
    img: 'img/avatar-4.png',
    title: 'Co-host',
    role: '[role]',
    bio: '[A short write-up about Mr Amir Jaaffar: their background, what they do, and what they bring to the conversations.]',
  },
  {
    name: 'Kong Laosher',
    img: 'img/avatar-5.png',
    title: 'Co-host',
    role: '[role]',
    bio: '[A short write-up about Kong Laosher: their background, what they do, and what they bring to the conversations.]',
  },
]
