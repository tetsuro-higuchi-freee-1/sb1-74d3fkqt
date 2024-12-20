import { db } from '../config';
import type { User, UserFormData } from '../../types/user';

export class UserModel {
  static async create(userData: UserFormData & { isAdmin: boolean }): Promise<User> {
    return new Promise((resolve, reject) => {
      const id = Math.random().toString(36).substr(2, 9);
      const now = new Date().toISOString();

      db.run(`
        INSERT INTO users (id, email, name, role, is_admin, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [id, userData.email, userData.name, userData.role, userData.isAdmin ? 1 : 0, now],
      (err) => {
        if (err) reject(err);
        else resolve({
          id,
          email: userData.email,
          name: userData.name,
          role: userData.role,
          isAdmin: userData.isAdmin,
          createdAt: now
        });
      });
    });
  }

  static async findAll(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM users ORDER BY created_at DESC', (err, rows) => {
        if (err) reject(err);
        else resolve(rows.map(this.mapRowToUser));
      });
    });
  }

  static async findById(id: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        else resolve(row ? this.mapRowToUser(row) : null);
      });
    });
  }

  static async update(id: string, userData: Partial<UserFormData & { isAdmin: boolean }>): Promise<void> {
    const updates = Object.entries(userData)
      .map(([key, _]) => `${this.toSnakeCase(key)} = ?`)
      .join(', ');

    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE users SET ${updates} WHERE id = ?`,
        [...Object.values(userData), id],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  }

  static async delete(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM users WHERE id = ?', [id], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  private static mapRowToUser(row: any): User {
    return {
      id: row.id,
      email: row.email,
      name: row.name,
      role: row.role,
      isAdmin: Boolean(row.is_admin),
      createdAt: row.created_at
    };
  }

  private static toSnakeCase(str: string): string {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  }
}