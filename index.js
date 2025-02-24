import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import notesRoutes from './routes/notes-routes.js'
import uploadRoutes from './routes/upload-routes.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use('/images', express.static('public/images'));

app.use("/notes", notesRoutes);
app.use("/upload", uploadRoutes);

app.listen(PORT, () => {
    console.log(`running at http://localhost:${PORT}`);
});