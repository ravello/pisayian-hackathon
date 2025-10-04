/**
 * -----------------------------------------
 * Transform Route (/api/transform)
 * -----------------------------------------
 * This route handles:
 *  - Accepting a single CSV file upload via Multer
 *  - Parsing the CSV contents into JSON rows using PapaParse
 *  - Applying simple transformation logic:
 *      → Rename columns (LastName → last_name, etc.)
 *      → Trim whitespace from values
 *  - Converting the transformed data back into a CSV string
 *  - Returning the cleaned CSV as a downloadable file
 *
 * Request:
 *  POST /api/transform
 *  Body: form-data { file: <CSV file> }
 *
 * Response:
 *  - 200 OK: Pisay-ready CSV file (pisay_transformed.csv)
 *  - 400 Bad Request: No file uploaded
 *  - 500 Internal Server Error: Transformation failed
 *
 * Dependencies:
 *  - express: Routing
 *  - multer: File upload handling (in memory)
 *  - papaparse: CSV parsing/unparsing
 *
 * Author: Nolan Dela Rosa
 * Date: October 3, 2025
 */
import express from "express";
import multer from "multer";
import Papa from "papaparse";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage()});

router.post("/", upload.single("file"), (req, res) => {
    try {
        if(!req.file) return res.status(400).json({ error: "No file uploaded"});

        const csvString = req.file.buffer.toString("utf8");
        const parsedData = Papa.parse(csvString, { header: true });

        // sample transformation logic
        const transformedData = parsedData.data.map(row => ({
            last_name: row.LastName?.trim(),
            first_name: row.FirstName?.trim(),
            campus: row.Campus?.trim(),
            batch_year: row.Batch?.trim(),
        }));

        // convert back to CSV
        const outputCsv = Papa.unparse(transformedData);
        res.header("Content-Type", "text/csv");
        res.attachment("pisay_transformed.csv");
        res.send(outputCsv);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Transformation failed" });
    }
});

export default router;