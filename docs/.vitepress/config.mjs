import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'IS218 Game AI Lab',
  description: 'Experiments in AI-assisted game development',
  base: '/is218-game-ai-lab/',
  themeConfig: {
    nav: [{ text: 'Experiments', link: '/experiments' }, { text: 'Field notes', link: '/field-notes' }],
    socialLinks: [{ icon: 'github', link: 'https://github.com/ms543-create/is218-game-ai-lab' }]
  }
})
