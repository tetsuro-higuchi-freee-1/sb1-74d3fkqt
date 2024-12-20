import { db } from '../config';
import type { Comment, CommentFormData } from '../../types/comment';

export class CommentModel {
  static async create(featureId: string, userId: string, data: CommentFormData): Promise<Comment> {
    return new Promise((resolve, reject) => {
      const id = Math.random().toString(36).substr(2, 9);
      const now = new Date().toISOString();

      db.run(`
        INSERT INTO comments (id, feature_id, user_id, content, created_at)
        VALUES (?, ?, ?, ?, ?)
      `, [id, featureId, userId, data.content, now],
      (err) => {
        if (err) reject(err);
        else {
          // Get user information for the created comment
          db.get(
            'SELECT name, role FROM users WHERE id = ?',
            [userId],
            (err, user) => {
              if (err) reject(err);
              else resolve({
                id,
                featureId,
                userId,
                user: {
                  name: user.name,
                  role: user.role
                },
                content: data.content,
                createdAt: now
              });
            }
          );
        }
      });
    });
  }

  static async findByFeatureId(featureId: string): Promise<Comment[]> {
    return new Promise((resolve, reject) => {
      db.all(`
        SELECT c.*, u.name as user_name, u.role as user_role
        FROM comments c
        JOIN users u ON c.user_id = u.id
        WHERE c.feature_id = ?
        ORDER BY c.created_at DESC
      `, [featureId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows.map(this.mapRowToComment));
      });
    });
  }

  private static mapRowToComment(row: any): Comment {
    return {
      id: row.id,
      featureId: row.feature_id,
      userId: row.user_id,
      user: {
        name: row.user_name,
        role: row.user_role
      },
      content: row.content,
      createdAt: row.created_at
    };
  }
}