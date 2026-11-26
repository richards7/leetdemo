# RovianX Solutions Web Application

## How to Set Your Custom Logo Image

You can easily use your exact original logo image in 2 simple steps:

1. **Place your logo file in the `public/` directory**:
   - Copy your logo image file (e.g. `logo.png`, `ovian.png`, or `logo.svg`) into the `public/` folder:
     ```
     public/
       logo.png   <-- Place your logo image here
       logo.svg
     ```

2. **Update the path in `src/brandConfig.ts`**:
   - Open `src/brandConfig.ts` and set `imageSrc`:
     ```ts
     export const BRAND_LOGO_CONFIG = {
       imageSrc: '/logo.png', // <-- Enter your file name here
       altText: 'RovianX Solutions',
     };
     ```
   - Alternatively, you can edit `LOCAL_IMAGE_PATH` directly in `src/components/Logo.tsx`.

*Note: If no custom image is found or if the path is left empty, the site automatically falls back to the built-in precision vector SVG logo without any layout shift.*
Note: If no custom image is found or if the path is left empty, the site automatically falls back to the built-in precision vector SVG logo without any layout shift.

## Blog CMS setup

The Blog CMS uses PostgreSQL and is separate from the existing Google Sheets contact workflow.

1. Create a PostgreSQL database and set `DATABASE_URL` in local `.env` and Render.
2. Set `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` for featured image uploads.
3. Run the schema and seed the initial categories/author:

```powershell
npm run blog:migrate
```

4. Create the first admin account. Use a password of at least 12 characters:

```powershell
npm run blog:admin -- admin@rovianx.in "replace-with-a-long-password"
```

5. Run the application with `npm run dev`, open `/admin/blog/`, and sign in. Public posts appear at `/blog/`.

Production Render commands remain `npm run build` and `npm start`. Configure the same environment variables in Render; do not commit `.env` or database credentials.

Blog API routes are under `/api/blog`, including public posts/categories, admin authentication and CRUD, media upload, `/api/blog/sitemap.xml`, and `/api/blog/feed.xml`. Existing `/api/leads`, Google Sheets, and email routes are unchanged.

## Student Project Submission Hub

The Student Hub landing page is available at `/student-hub/`. Its “Submit Your Project Idea” buttons open the dedicated form at `/student-hub/submit/`. Theme descriptions and beneficiary information are maintained in `src/data/studentProjectThemes.ts`.

The 36-hour hackathon submission period is currently closed. The form displays a closure notice, and the website API, local server endpoint, and Apps Script reject new submissions. To reopen submissions, remove the closure guards from those endpoints and restore the form UI in `StudentProjectSubmissionPage.tsx`, then redeploy the website and Apps Script.

### Deploy the Google Apps Script

1. Open Google Sheets and create or open the spreadsheet named `Student_Project_Proposals`.
2. Open **Extensions > Apps Script**.
3. Remove the sample code and paste the complete contents of `scripts/student-project-apps-script.gs`.
4. Confirm `SHEET_NAME` is `Submissions` (or change it to the exact tab name you use).
5. In Apps Script, click **Save** and then **Deploy > New deployment**.
6. Select **Web app**.
7. Set **Execute as** to **Me** and **Who has access** to **Anyone**.
8. Click **Deploy**, authorize the script, and copy the Web app URL ending in `/exec`.
9. Set this environment variable on the website host:

```text
STUDENT_PROJECT_APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycbwqueXSHPz7zT0ovphTJoyShKLTUnEBjbII2s_fmMFuappfogakX1oDza7T9U3MyZcx/exec
```

On Google Sheets, the script appends the original fields to columns A–F: Team Name, Team Lead, Team members, Theme, Project Title, and Project Description. It stores the five proposal details in H–L: Project Overview, Objectives, Technology Stack, Uniqueness & Innovation, and Target Users & Impact. Team Strength and Why Should We Select Your Team? are required and are stored after those details; the optional Project GitHub Repository URL is stored alongside them. Column G is left blank for new rows and all existing column G values (including old focus-area entries) remain untouched. After changing the Apps Script, deploy a new version for the updated validation and sheet mapping to take effect.

Optional direct-service-account fallback variables are:

```text
STUDENT_PROJECT_SHEET_ID=<spreadsheet ID>
STUDENT_PROJECT_SHEET_TAB_NAME=Submissions
```

These also require `GOOGLE_SERVICE_ACCOUNT_JSON` and an Editor share for the service account. Apps Script deployment is the recommended integration.
