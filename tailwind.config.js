// tailwind.config.js
import { nextui } from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
export const content = [
  './node_modules/@nextui-org/theme/dist/components/(accordion|slider|divider|popover).js'
]
export const theme = {
  extend: {}
}
export const darkMode = 'class'
export const plugins = [nextui()]
