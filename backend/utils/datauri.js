import DataUriParser from "datauri/parser.js";
import path from "path";

// Create a parser instance


// Function to convert file buffer to Data URI with correct mimetype
const getDataUri = (file) => {
    const parser = new DataUriParser();
    const extName = path.extname(file.originalname).toString(); // e.g., .pdf, .jpg
    return parser.format(extName, file.buffer);
};

export default getDataUri;
