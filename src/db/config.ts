import { openDB } from 'idb';

export const dbPromise = openDB('roadmap-db', 1, {
  upgrade(db) {
    // Create field_requirements store
    if (!db.objectStoreNames.contains('field_requirements')) {
      const store = db.createObjectStore('field_requirements', { keyPath: 'id' });
      store.createIndex('fieldName', 'fieldName', { unique: true });

      // Add default field requirements
      const fields = [
        'name', 'majorCategory', 'minorCategory', 'featureName',
        'description', 'developmentStatus', 'isPublic', 'targetIndustry',
        'targetScale', 'customerImpact', 'releaseDate', 'actualReleaseDate',
        'projectManager', 'productMarketing', 'documentationUrl', 'figmaUrl'
      ];

      fields.forEach(field => {
        store.add({
          id: Math.random().toString(36).substr(2, 9),
          fieldName: field,
          isRequired: !['actualReleaseDate', 'documentationUrl', 'figmaUrl'].includes(field),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      });
    }
  }
});