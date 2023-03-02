/*
tailwind.config.js - <short description TODO>
Copyright (C) 2022 Strudel contributors - see <https://github.com/tidalcycles/strudel/blob/main/repl/tailwind.config.js>
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details. You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

module.exports = {
  // TODO: find out if leaving out tutorial path works now
  content: ['./src/**/*.{js,jsx,ts,tsx}', '../../src/**/*.{html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // codemirror-theme settings
        background: 'var(--background)',
        lineBackground: 'var(--lineBackground)',
        foreground: 'var(--foreground)',
        caret: 'var(--caret)',
        selection: 'var(--selection)',
        selectionMatch: 'var(--selectionMatch)',
        gutterBackground: 'var(--gutterBackground)',
        gutterForeground: 'var(--gutterForeground)',
        gutterBorder: 'var(--gutterBorder)',
        lineHighlight: 'var(--lineHighlight)',
      },
    },
  },
  plugins: [],
};
