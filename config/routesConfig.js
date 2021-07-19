module.exports = {
  routeMap: {
    '/': { page: '/' },
    '/login': { page: '/login' },
    '/accounts/:userName': {
      page: '/accounts/[userName]',
    },
  },
  // sidebar nav if any
  accountsSidebar: [
    {
      label: 'All accounts',
      href: '/accounts',
    },
  ],
}
