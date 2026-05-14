export const theme = {
  colors: {
    sky: '#8ed8ff',
    cloud: '#f6fbff',
    navy: '#123057',
    ink: '#1c2740',
    mint: '#63d69f',
    coral: '#ff8f7a',
    sunshine: '#ffd85a',
    lavender: '#9f95ff',
    berry: '#ff5f8f',
    panel: '#fff9ef',
    line: '#295780',
    text: '#16324f',
    muted: '#56718d',
  },
};

export const scoreCards = [
  { key: 'trust', label: 'Neighbor Cheers', shortLabel: 'Cheers', color: '#ff8f7a' },
  { key: 'budget', label: 'Coin Jar', shortLabel: 'Coins', color: '#ffd85a' },
  { key: 'ethics', label: 'Fair Play', shortLabel: 'Fair', color: '#63d69f' },
  { key: 'impact', label: 'City Bloom', shortLabel: 'Bloom', color: '#9f95ff' },
  { key: 'support', label: 'Team Spirit', shortLabel: 'Spirit', color: '#ff5f8f' },
  { key: 'reputation', label: 'Star Power', shortLabel: 'Stars', color: '#5bbcff' },
] as const;

export const avatarOptions = {
  male: {
    label: 'Sky Captain',
    emoji: '🛹',
  },
  female: {
    label: 'Spark Mayor',
    emoji: '🌟',
  },
} as const;
