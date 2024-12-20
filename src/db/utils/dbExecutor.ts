import { Database } from 'sqlite3';

export class DbExecutor {
  static async run(db: Database, query: string, params: any[] = []): Promise<void> {
    return new Promise((resolve, reject) => {
      db.run(query, params, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  static async get<T>(db: Database, query: string, params: any[] = []): Promise<T | null> {
    return new Promise((resolve, reject) => {
      db.get(query, params, (err, row) => {
        if (err) reject(err);
        else resolve(row ? row as T : null);
      });
    });
  }

  static async all<T>(db: Database, query: string, params: any[] = []): Promise<T[]> {
    return new Promise((resolve, reject) => {
      db.all(query, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows as T[]);
      });
    });
  }
}