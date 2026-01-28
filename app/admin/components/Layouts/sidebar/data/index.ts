import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        icon: Icons.HomeIcon,
        items: [
          {
            title: "eCommerce",
            url: "/",
          },
        ],
      },
      {
        title: "Admin",
        url: "/admin/page/admin",
        icon: Icons.Admin,
        items: [],
      },
      {
        title: "Profile",
        url: "/admin/page/profile",
        icon: Icons.User,
        items: [],
      },
      {
        title: "Table Article",
        url: "/admin/components/Tables/articles-table",
        icon: Icons.Table,
        items: [],
      },
      {
        title: "Table Events",
        url: "/admin/components/Tables/events-table",
        icon: Icons.Table,
        items: [],
      },
      {
        title: "Forms",
        icon: Icons.Alphabet,
        items: [
          {
            title: "Send Article",
            url: "/admin/page/forms/sending-article",
          },
          {
            title: "Form Layout",
            url: "/admin/page/forms/form-layout",
          },
          {
            title: "Send Event",
            url: "/admin/page/forms/sending-event",
          },
        ],
      },
    ],
  },
];
