import { Database } from 'sqlite3';

export async function up(db: Database): Promise<void> {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Create products table
      db.run(`
        CREATE TABLE IF NOT EXISTS products (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          major_category TEXT NOT NULL,
          minor_category TEXT NOT NULL,
          feature_name TEXT NOT NULL,
          description TEXT NOT NULL,
          development_status TEXT NOT NULL,
          is_public TEXT NOT NULL,
          target_industry TEXT NOT NULL,
          target_scale TEXT NOT NULL,
          customer_impact TEXT NOT NULL,
          release_date TEXT NOT NULL,
          actual_release_date TEXT,
          project_manager TEXT NOT NULL,
          product_marketing TEXT NOT NULL,
          documentation_url TEXT,
          figma_url TEXT,
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL
        )
      `, (err) => {
        if (err) reject(err);
      });

      // Create users table
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          email TEXT UNIQUE NOT NULL,
          name TEXT NOT NULL,
          role TEXT NOT NULL,
          is_admin INTEGER NOT NULL DEFAULT 0,
          created_at TEXT NOT NULL
        )
      `, (err) => {
        if (err) reject(err);
      });

      // Create comments table
      db.run(`
        CREATE TABLE IF NOT EXISTS comments (
          id TEXT PRIMARY KEY,
          feature_id TEXT NOT NULL,
          user_id TEXT NOT NULL,
          content TEXT NOT NULL,
          created_at TEXT NOT NULL,
          FOREIGN KEY (feature_id) REFERENCES products (id) ON DELETE CASCADE,
          FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
        )
      `, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  });
}

export async function down(db: Database): Promise<void> {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run('DROP TABLE IF EXISTS comments', (err) => {
        if (err) reject(err);
      });
      db.run('DROP TABLE IF EXISTS users', (err) => {
        if (err) reject(err);
      });
      db.run('DROP TABLE IF EXISTS products', (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  });
}