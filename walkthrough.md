# Portfolio Makeover & Rollback Setup Walkthrough

We have successfully completed a premium, modern design makeover of your personal website while retaining the original design for easy rollback.

## Changes Made

### 1. Created Classic Backup Folder (`/v1`)
We backed up your original layout files to a standalone subfolder so you can access or restore them at any time:
- [v1/index.html](file:///c:/Users/samga/Downloads/Quick%20Share/Projects(2025-26)/personal_website/v1/index.html)
- [v1/style.css](file:///c:/Users/samga/Downloads/Quick%20Share/Projects(2025-26)/personal_website/v1/style.css)
- [v1/script.js](file:///c:/Users/samga/Downloads/Quick%20Share/Projects(2025-26)/personal_website/v1/script.js)
- [v1/timeline.css](file:///c:/Users/samga/Downloads/Quick%20Share/Projects(2025-26)/personal_website/v1/timeline.css)
- [v1/README.md](file:///c:/Users/samga/Downloads/Quick%20Share/Projects(2025-26)/personal_website/v1/README.md) *(Contains clear rollback instructions)*

In this backup, paths to images and assets have been updated to point to `../Assests` to ensure it continues to render correctly inside the subdirectory.

### 2. Implemented Modern Premium Makeover
The root files have been rewritten using modern web design principles:
- **Clean Structure**: Modernized the HTML5 semantic structure in [index.html](file:///c:/Users/samga/Downloads/Quick%20Share/Projects(2025-26)/personal_website/index.html).
- **Typography & Icons**: Switched the typography to a combination of **Plus Jakarta Sans** (headings) and **Inter** (body text), and integrated FontAwesome/Boxicons.
- **Vibrant Dark-Mode & Glows**: Overhauled [style.css](file:///c:/Users/samga/Downloads/Quick%20Share/Projects(2025-26)/personal_website/style.css) with glassmorphism, glowing accents, background blur blobs, and card hover animations.
- **Scroll Transitions & Typing Simulation**: Integrated a scroll-reveal animation observer and an animated subtitle typing loop in [script.js](file:///c:/Users/samga/Downloads/Quick%20Share/Projects(2025-26)/personal_website/script.js).
- **Project Filtering**: Added category tabs so visitors can dynamically filter your projects (AI & Agents, Computer Vision, Data & Trading).
- **Contact Form Improvements**: Converted input boxes to floating label fields with loading indicators.

## Verification & Testing

- **Rollback Functionality**: Verified that [v1/index.html](file:///c:/Users/samga/Downloads/Quick%20Share/Projects(2025-26)/personal_website/v1/index.html) loads the original design, and added a **Classic View ↺** navigation button in the navbar to let visitors toggle styles.
- **Form Submission**: Verified that the Formspree endpoint (`https://formspree.io/f/mzzkqrqv`) is still linked, and styled the success/error message feedback in the form area.
