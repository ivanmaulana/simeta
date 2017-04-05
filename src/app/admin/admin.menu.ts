export const ADMIN_SIDEBAR_MENU = [
  {
    path: 'admin',
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
            title: 'Pengajuan TA',
            icon: 'ion-edit',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'ta',
        data: {
          menu: {
            title: 'Penentuan TA',
            icon: 'ion-android-home',
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
            icon: 'ion-document-text',
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
            icon: 'ion-code-working',
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
            icon: 'ion-person-stalker',
            selected: false,
            expanded: false,
            order: 200,
          }
        },
        children: [
          {
            path: 'ringkasan',
            data: {
              menu: {
                title: 'Ringkasan Seminar',
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
          }
        ]
      },
      {
        path: 'sidang',
        data: {
          menu: {
            title: 'Sidang',
            icon: 'ion-ribbon-b',
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
            icon: 'ion-university',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'staff',
        data: {
          menu: {
            title: 'Staff',
            icon: 'ion-person-add',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
    ]
  }
];
