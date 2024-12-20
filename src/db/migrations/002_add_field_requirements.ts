import { Database } from 'sqlite3';

export async function up(db: Database): Promise<void> {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Create field_requirements table
      db.run(`
        CREATE TABLE IF NOT EXISTS field_requirements (
          id TEXT PRIMARY KEY,
          field_name TEXT NOT NULL,
          is_required INTEGER NOT NULL DEFAULT 1,
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL
        )
      `, (err) => {
        if (err) reject(err);
        else {
          // Insert default field requirements
          const fields = [
            'name', 'majorCategory', 'minorCategory', 'featureName',
            'description', 'developmentStatus', 'isPublic', 'targetIndustry',
            'targetScale', 'customerImpact', 'releaseDate', 'actualReleaseDate',
            'projectManager', 'productMarketing', 'documentationUrl', 'figmaUrl'
          ];
          
          const now = new Date().toISOString();
          const stmt = db.prepare(`
            INSERT INTO field_requirements (id, field_name, is_required, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?)
          `);

          fields.forEach(field => {
            const id = Math.random().toString(36).substr(2, 9);
            // Set all fields as required by default except for actualReleaseDate, documentationUrl, and figmaUrl
            const isRequired = !['actualReleaseDate', 'documentationUrl', 'figmaUrl'].includes(field);
            stmt.run(id, field, isRequired ? 1 : 0, now, now);
          });

          stmt.finalize((err) => {
            if (err) reject(err);
            else resolve();
          });
        }
      });
    });
  });
}

export async function down(db: Database): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run('DROP TABLE IF EXISTS field_requirements', (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}