import { db } from '../config.js';
import { up as initialSchemaUp } from './001_initial_schema.js';
import { up as addFieldRequirementsUp } from './002_add_field_requirements.js';

async function runMigrations(): Promise<void> {
  try {
    console.log('Running migrations...');
    await initialSchemaUp(db);
    await addFieldRequirementsUp(db);
    console.log('Migrations completed successfully');
  } catch (error) {
    console.error('Error running migrations:', error);
    process.exit(1);
  } finally {
    db.close();
  }
}

runMigrations();