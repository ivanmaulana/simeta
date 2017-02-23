export const MAHASISWA_MENU = [
  {
    path: 'mahasiswa',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'Dashboard',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'pengajuan',
        data: {
          menu: {
            title: 'Pengajuan',
            icon: 'ion-stats-bars',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'log',
        data: {
          menu: {
            title: 'Log Bimbingan',
            icon: 'ion-stats-bars',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'kolokium',
        data: {
          menu: {
            title: 'Kolokium',
            icon: 'ion-stats-bars',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'praseminar',
        data: {
          menu: {
            title: 'Praseminar',
            icon: 'ion-stats-bars',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'seminar',
        data: {
          menu: {
            title: 'Seminar',
            icon: 'ion-stats-bars',
            selected: false,
            expanded: false,
            order: 200,
          }
        },
        children: [
          {
            path: 'nasional',
            data: {
              menu: {
                title: 'Seminar Nasional',
              }
            }
          },
          {
            path: 'micon',
            data: {
              menu: {
                title: 'Mini Conferece',
              }
            }
          },
          {
            path: 'mandiri',
            data: {
              menu: {
                title: 'Seminar Mandiri',
              }
            }
          }
        ]
      },
      {
        path: 'sidang',
        data: {
          menu: {
            title: 'Sidang',
            icon: 'ion-stats-bars',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'skl',
        data: {
          menu: {
            title: 'SKL',
            icon: 'ion-stats-bars',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'profile',
        data: {
          menu: {
            title: 'Profile',
            icon: 'ion-stats-bars',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
    ]
  }
];
