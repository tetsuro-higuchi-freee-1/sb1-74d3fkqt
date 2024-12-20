type QueryParams = (string | number | boolean | null)[];

export class QueryBuilder {
  static buildInsertQuery(table: string, fields: string[]): string {
    const placeholders = fields.map(() => '?').join(', ');
    return `INSERT INTO ${table} (${fields.join(', ')}) VALUES (${placeholders})`;
  }

  static buildUpdateQuery(table: string, fields: string[], whereClause: string): string {
    const setClause = fields.map(field => `${field} = ?`).join(', ');
    return `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`;
  }

  static buildSelectQuery(
    table: string,
    fields: string[] = ['*'],
    whereClause?: string,
    orderBy?: string,
    joins?: string[]
  ): string {
    let query = `SELECT ${fields.join(', ')} FROM ${table}`;
    
    if (joins?.length) {
      query += ' ' + joins.join(' ');
    }
    
    if (whereClause) {
      query += ` WHERE ${whereClause}`;
    }
    
    if (orderBy) {
      query += ` ORDER BY ${orderBy}`;
    }
    
    return query;
  }

  static toSnakeCase(str: string): string {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  }

  static toCamelCase(str: string): string {
    return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
  }
}