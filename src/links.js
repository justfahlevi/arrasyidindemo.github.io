// External links. Replace every TODO with the real address.
export const LINKS = {
  youtube: 'https://www.youtube.com/@arrasyidinacademy',
  instagram: '#TODO-instagram',
  facebook: '#TODO-facebook',
  x: '#TODO-x',
  tiktok: '#TODO-tiktok',
  linkedin: '#TODO-linkedin',
  whatsapp: '#TODO-whatsapp-channel',
  orius: '#TODO-oriusdigital',
  terms: '#TODO-terms',
  privacy: '#TODO-privacy',
  cookies: '#TODO-cookies',
  // Guest / full-episode YouTube links (fallback: channel)
  episode: (slug) => `https://www.youtube.com/@arrasyidinacademy#${slug}`,
}

export const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Episodes', to: '/episodes' },
  { label: 'Guests', to: '/guests' },
  { label: 'Collaboration', to: '/collaboration' },
  { label: 'Contact', to: '/contact' },
]
