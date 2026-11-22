# Shristi Sinha · Portfolio

One website, five views: **Generic**, **Software Engineering**, **AI**, **Machine Learning**, **Data Science**.
Visitors switch with the "View as" dropdown or the chips under the hero. You can also send a direct link per field:

- `https://YOURSITE/` → Generic
- `https://YOURSITE/?view=se` → Software Engineering
- `https://YOURSITE/?view=ai` → AI
- `https://YOURSITE/?view=ml` → Machine Learning
- `https://YOURSITE/?view=ds` → Data Science
- `https://YOURSITE/resume.html?view=ml` → printable resume for that view (Save as PDF)

## Folder structure

```
portfolio/
├─ index.html
├─ resume.html
├─ style.css
├─ main.js
├─ content.js          ← edit your text here
├─ README.md
└─ assets/
   ├─ portrait.jpg     ← your photo
   ├─ Shristi_Sinha_Resume_Generic.pdf
   ├─ Shristi_Sinha_Resume_SoftwareEngineering.pdf
   ├─ Shristi_Sinha_Resume_AI.pdf
   ├─ Shristi_Sinha_Resume_DataScience.pdf
   └─ Shristi_Sinha_Resume_ML.pdf
```

## Make it yours

1. Open `content.js`. Everything on the site comes from there.
2. Paste each project's GitHub URL into its `repo: ""` field (until then the button links to your GitHub profile).
3. Your photo is already `assets/portrait.jpg`. To swap it, replace that file (tall photo, face in the upper half).
4. To re-theme, change `--acc` at the top of `style.css`.

## Run locally

```
python3 -m http.server 8000
```

Then open http://localhost:8000 (opening index.html by double-click also works, but a server is closer to the real thing).

## Publish on GitHub Pages (free)

1. Create a public repository, e.g. `Shristi1611.github.io` (then the site is at `https://shristi1611.github.io/`).
2. Upload all files, keeping `assets/` as a folder.
3. Repo **Settings → Pages → Build and deployment → Deploy from a branch → main → / (root) → Save**.
4. Wait a minute, then open the URL.

## Add a custom domain later

1. Buy a domain (Namecheap, Porkbun, Cloudflare, GoDaddy, ...).
2. **Settings → Pages → Custom domain**: enter it and save.
3. At the registrar add `A` records for `@` to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, and a `CNAME` for `www` to `YOUR-USERNAME.github.io`.
4. When DNS has updated, tick **Enforce HTTPS**.
(Check https://docs.github.com/en/pages for current values.)

## Privacy note

No phone number appears anywhere on the site, in `resume.html`, or in the CV PDFs in `assets/` (it was removed from the PDFs). Only email, LinkedIn and GitHub are shown. Anything on a public GitHub Pages site can be read and scraped, so keep it that way.

## Credits

- Fonts: Anton, Inter and Caveat from Google Fonts (SIL Open Font License).
- Layout inspired by a public portfolio idea (pinned hero, spotlight reveal, marquee strip). All code and text here are original.
