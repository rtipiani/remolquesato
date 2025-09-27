/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,ts}'],
	theme: {
		extend: {
			colors: {
				primary: '#15803d',
				secondary: '#70d959'
			}
		},
	},
	plugins: [],
	mode: 'jit',
}
