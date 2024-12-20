import { dbPromise } from '../config';
import type { FieldRequirement } from '../../types/fieldRequirement';

export class FieldRequirementModel {
  static async findAll(): Promise<FieldRequirement[]> {
    const db = await dbPromise;
    return db.getAll('field_requirements');
  }

  static async update(id: string, isRequired: boolean): Promise<void> {
    const db = await dbPromise;
    const tx = db.transaction('field_requirements', 'readwrite');
    const store = tx.objectStore('field_requirements');
    
    const requirement = await store.get(id);
    if (requirement) {
      requirement.isRequired = isRequired;
      requirement.updatedAt = new Date().toISOString();
      await store.put(requirement);
    }
  }
}