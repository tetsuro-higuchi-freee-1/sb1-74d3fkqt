import { db } from '../config';
import type { Product } from '../../types/roadmap';

export class ProductModel {
  static async create(product: Omit<Product, 'id'>): Promise<Product> {
    return new Promise((resolve, reject) => {
      const id = Math.random().toString(36).substr(2, 9);
      const now = new Date().toISOString();

      db.run(`
        INSERT INTO products (
          id, name, major_category, minor_category, feature_name,
          description, development_status, is_public, target_industry,
          target_scale, customer_impact, release_date, actual_release_date,
          project_manager, product_marketing, documentation_url, figma_url,
          created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        id, product.name, product.majorCategory, product.minorCategory,
        product.featureName, product.description, product.developmentStatus,
        product.isPublic, product.targetIndustry, product.targetScale,
        product.customerImpact, product.releaseDate, product.actualReleaseDate,
        product.projectManager, product.productMarketing,
        product.documentationUrl, product.figmaUrl, now, now
      ], (err) => {
        if (err) reject(err);
        else resolve({ ...product, id });
      });
    });
  }

  static async findAll(): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM products ORDER BY created_at DESC', (err, rows) => {
        if (err) reject(err);
        else resolve(rows.map(this.mapRowToProduct));
      });
    });
  }

  static async findById(id: string): Promise<Product | null> {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        else resolve(row ? this.mapRowToProduct(row) : null);
      });
    });
  }

  static async update(id: string, product: Partial<Product>): Promise<void> {
    const updates = Object.entries(product)
      .map(([key, _]) => `${this.toSnakeCase(key)} = ?`)
      .join(', ');

    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE products SET ${updates}, updated_at = ? WHERE id = ?`,
        [...Object.values(product), new Date().toISOString(), id],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  }

  static async delete(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM products WHERE id = ?', [id], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  private static mapRowToProduct(row: any): Product {
    return {
      id: row.id,
      name: row.name,
      majorCategory: row.major_category,
      minorCategory: row.minor_category,
      featureName: row.feature_name,
      description: row.description,
      developmentStatus: row.development_status,
      isPublic: row.is_public,
      targetIndustry: row.target_industry,
      targetScale: row.target_scale,
      customerImpact: row.customer_impact,
      releaseDate: row.release_date,
      actualReleaseDate: row.actual_release_date,
      projectManager: row.project_manager,
      productMarketing: row.product_marketing,
      documentationUrl: row.documentation_url,
      figmaUrl: row.figma_url
    };
  }

  private static toSnakeCase(str: string): string {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  }
}