const { description } = require("../../package");

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: "NotWuphf documentation",
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: "",
    editLinks: false,
    docsDir: "",
    editLinkText: "",
    lastUpdated: false,
    nav: [
      {
        text: "Main",
        link: "/main/",
      },
      {
        text: "Backend",
        link: "/backend/",
      },
      {
        text: "Frontend",
        link: "/frontend/",
      },
    ],
    sidebar: {
      "/backend/": [
        {
          title: "NotWuphf API",
          collapsable: false,
          children: ["", "auth", "groups", "posts", "comments"],
        },
      ],
      "/frontend/": [
        {
          title: "NotWuphf frontend",
          collapsable: false,
          children: [
            "",
            "main",
            "login",
            "register",
            "groups",
            "group",
            "post",
          ],
        },
      ],
      "/main/": [
        {
          title: "NotWuphf",
          collapsable: false,
          children: ["", "func-requirements", "architecture"],
        },
      ],
    },
  },

  base: "/NotWuphf/",

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: ["@vuepress/plugin-back-to-top", "@vuepress/plugin-medium-zoom"],
};
