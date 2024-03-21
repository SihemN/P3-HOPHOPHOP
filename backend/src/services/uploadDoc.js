const multer = require("multer");
// const path = require("path");

// l'emplacement de fichier
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/documents");
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});
// choisir l'extention de fichier

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("jpeg") ||
    file.mimetype.includes("png") ||
    file.mimetype.includes("jpg") ||
    file.mimetype.includes("pdf") ||
    file.mimetype.includes("doc") ||
    file.mimetype.includes("docx") ||
    file.mimetype.includes("pps") ||
    file.mimetype.includes("ppt") ||
    file.mimetype.includes("xls") ||
    file.mimetype.includes("xlsx") ||
    file.mimetype.includes("xlm") ||
    file.mimetype.includes("odp") ||
    file.mimetype.includes("odt") ||
    file.mimetype.includes("ods") ||
    file.mimetype.includes("odg") ||
    file.mimetype.includes("txt") ||
    file.mimetype.includes("avi") ||
    file.mimetype.includes("mp3") ||
    file.mimetype.includes("mp4") ||
    file.mimetype.includes("mkv")
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
// choisir la taille maximal de fichier
const maxSize = 1073741824;

const upload = multer({
  storage,
  fileFilter,
  maxSize,
});

module.exports = upload.single("document");
