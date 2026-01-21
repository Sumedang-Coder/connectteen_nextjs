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
      {
        title: "Tables",
        url: "/admin/page/tables",
        icon: Icons.Table,
        items: [
          {
            title: "Tables",
            url: "/admin/page/tables",
          },
        ],
      },
      {
        title: "Pages",
        icon: Icons.Alphabet,
        items: [
          {
            title: "Settings",
            url: "/admin/page/pages/settings",
          },
        ],
      },
    ],
  },
  {
    label: "OTHERS",
    items: [
      {
        title: "Charts",
        icon: Icons.PieChart,
        items: [
          {
            title: "Basic Chart",
            url: "/admin/page/charts/basic-chart",
          },
        ],
      },
      {
        title: "UI Elements",
        icon: Icons.FourCircle,
        items: [
          {
            title: "Alerts",
            url: "/admin/page/ui-elements/alerts",
          },
          {
            title: "Buttons",
            url: "/admin/page/ui-elements/buttons",
          },
        ],
      },
      {
        title: "Authentication",
        icon: Icons.Authentication,
        items: [
          {
            title: "Sign In",
            url: "/admin/page/auth/sign-in",
          },
        ],
      },
    ],
  },
];
