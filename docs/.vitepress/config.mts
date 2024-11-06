import { defineConfig } from 'vitepress'
import AutoSidebar from 'vite-plugin-vitepress-auto-sidebar';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "note",
  description: "note",
  themeConfig: {
	outline:"deep",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },      
    ],

    sidebar: [
      {
        
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  vite: {
	plugins: [
		// add plugin
		AutoSidebar({
		// You can also set options to adjust sidebar data
		// see option document below
		ignoreIndexItem:true,
		collapsed:true,
		})
	]
	},

})
