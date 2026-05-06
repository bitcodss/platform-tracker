import express from 'express';
import cors from 'cors';
import { execFile } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, unlinkSync } from 'fs';
import { tmpdir } from 'os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(cors());

app.get('/api/export/spss', (req, res) => {
  const outPath = join(tmpdir(), `platform_tracker_${Date.now()}.sav`);
  const script = join(__dirname, 'export_spss.py');

  execFile('python3', [script, outPath], { timeout: 15000 }, (err) => {
    if (err) {
      console.error('SPSS export error:', err.message);
      return res.status(500).json({ error: 'SPSS generation failed', detail: err.message });
    }
    res.download(outPath, 'platform_tracker_data.sav', () => {
      if (existsSync(outPath)) unlinkSync(outPath);
    });
  });
});

app.listen(3001, () => console.log('Export API running on http://localhost:3001'));
