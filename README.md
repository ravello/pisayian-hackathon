# Pisayian Data Cleaner & Normalizer
A web-based tool built to clean, validate, and normalize alumni `.csv` data into standardized Pisay Network formats.

# Overview
This project was built for Kapwa Codefest 2025 to address inconsistencies in alumni data formatting. It allows users to:
1. **Clean** raw SPECTRA or alumni `.csv` files with automatic removal of incomplete or invalid data.
2. **Normalize** cleaned data by splitting it into structured, relational tables (alumni, campus, alumni-campus).
   
Built with a focus on data accuracy, modular backend architecture, and simplicity of use.

# Features
-**Data Cleaning**: Removes invalid or incomplete entries from uploaded `.csv`s.

-**Normalization**: Exports a .`zip` file containing relational tables (`alumni.csv`, `campus.csv`, `alumni_csv`).

-**File Upload System**: Drag-and-drop `.csv` upload interface with instant file download.

-**User-Friendly Frontend**: Modern UI using `Next.js`, `Tailwind.css`, and Lucide icons.

-**Modular Backend**: `Node.js` + `Express` routes (`/api/transform`, `/api/normalize`) for clear separation of concerns.

# Tech Stack
-**Frontend**: `Next.js` (`React`), `TailwindCSS`, Lucide Icons

-**Backend**: `Node.js`, `Express.js`, `Multer`, `PapaParse`, `Archiver`

-**File Handling**: `.csv` Parsing, File Upload, `.zip` Generation

# How It Works
1. Upload your raw `.csv` file.
2. Click **Clean Data** -> downloads a cleaned `.csv` (invalid rows removed).
   
   (**NOTE: use this downloaded file for normalization!**)
3. (Optional) Click **Normalize Data** -> downloads a `.zip` containing 3 normalized `.csv` files.

Each button corresponds to a backend route:
-`/api/transform` -> data cleaning
-`api/normalize` -> data normalization

# Running Locally
```
# Clone repo
git clone https://github.com/yourusername/pisaiyan-hackathon.git
cd pisaiyan-hackathon

# Run backend
cd backend
npm install
npm start

# Run frontend (in new terminal)
cd ../frontend
npm install
npm run dev
```
Frontend runs at: `http://localhost:3000`.

Backend runs at: `http://localhost:5001`.

# CSV Input Format #
Expected columns for uploaded alumni data:
```
LastName,FirstName,Campus,Batch
DelaRosa,Nolan,Main,2020
Santos,Ana,Central Visayas,2019
Cruz,Juan,Western Visayas,2018
```

# CSV Output (After Cleaning)
A standardized Pisay-ready `.csv`:
```
last_name,first_name,campus,batch_year
DelaRosa,Nolan,Main,2020
Santos,Ana,Central Visayas,2019
Cruz,Juan,Western Visayas,2018
```

# Output (After Normalization)
The downloaded `.zip` includes:
-`alumni.csv` -> alumni information

-`campus.csv` -> unique campus list

-`alumni_campus.csv` -> relationship mapping

# A Special Thanks To
-**Craig Ondevilla**: Outstanding frontend design and visuals

-**Julian Laxamana**: Support with project documentation

-**Ravel Valdez**: Project organization and housekeeping

-**Nolan Dela Rosa**: System architect and backend developer.

Couldn't have asked for a better development team 💙





