import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import notesRoutes from './routes/notes-routes'

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use("/notes", notesRoutes);

app.listen(PORT, () => {
    console.log(`running at http://localhost:${PORT}`);
});