/**
 * -----------------------------------------
 * Normalize Route (/api/normalize)
 * -----------------------------------------
 * This route accepts a raw alumni CSV file and converts it into
 * a normalized, relational-style dataset before returning a ZIP file.
 *
 * The normalization process splits the flat CSV into three related tables:
 *   1. alumni.csv         → Contains unique alumni with IDs, names, and batch years
 *   2. campus.csv         → Contains a deduplicated list of all campuses
 *   3. alumni_campus.csv  → A junction table linking alumni to their campus
 *
 * The output demonstrates proper database normalization (1NF → 3NF),
 * separating entities and eliminating redundancy.
 *
 * Example:
 * Input  (flat):
 *   LastName,FirstName,Campus,Batch
 *   Dela Rosa,Nolan,Main,2020
 *
 * Output (normalized ZIP):
 *   alumni.csv
 *   campus.csv
 *   alumni_campus.csv
 *
 * Request:
 *   POST /api/normalize
 *   Body: form-data { file: <CSV file> }
 *
 * Response:
 *   - 200 OK: ZIP download containing the three CSVs
 *   - 400 Bad Request: No file uploaded
 *   - 500 Internal Server Error: Normalization failed
 *
 * Dependencies:
 *   - express: For routing
 *   - multer: For file uploads (in-memory)
 *   - papaparse: For CSV parsing/unparsing
 *   - archiver: For bundling CSVs into a single ZIP download
 *
 * Author: Nolan Dela Rosa
 * Date: October 4, 2025
 */
import express from "express";
import multer from "multer";
import Papa from "papaparse";
import archiver from "archiver";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("file"), async (req, res) => {
    try {
        if(!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const csvString = req.file.buffer.toString("utf8");
        const parsedData = Papa.parse(csvString, { header: true });
        const data = parsedData.data;

        // prepare arrays for normalized datasets
        const alumni = [];
        const campuses = [];
        const alumniCampus = [];
        const campusSet = new Map();

        data.forEach((row, index) => {
            const alumniId = index + 1;
            const campusName = row.Campus?.trim();

            // add campus to unique set
            if(campusName && !campusSet.has(campusName)) {
                const campusId = campusSet.size + 1;
                campusSet.set(campusName, campusId);
                campuses.push({
                    campus_id: campusId,
                    campus_name: campusName,
                });
            }

            const campusId = campusSet.get(campusName);

            // alumni table
            alumni.push({
                alumni_id: alumniId,
                last_name: row.LastName?.trim(),
                first_name: row.FirstName?.trim(),
                batch_year: row.Batch?.trim(),
            });

            // relationship table
            alumniCampus.push({
                alumni_id: alumniId,
                campus_id: campusId,
            });
        });

        // create ZIP archive
        const archive = archiver("zip");
        res.attachment("normalized_output.zip");
        archive.pipe(res);

        // add each dataset as CSV
        archive.append(Papa.unparse(alumni), { name: "alumni.csv" });
        archive.append(Papa.unparse(campuses), { name: "campus.csv" });
        archive.append(Papa.unparse(alumniCampus), { name: "alumni_campus.csv" });

        await archive.finalize();

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Normalization failed" });
    }
});

export default router;