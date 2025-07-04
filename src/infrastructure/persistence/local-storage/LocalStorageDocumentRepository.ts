import type { Document } from '../../../domain/models/Document.ts';
import type { DocumentRepository } from '../../../domain/repositories/DocumentRepository.ts';

const STORAGE_KEY = 'documents';

/**
 * Implementación del DocumentRepository que usa localStorage.
 */
export class LocalStorageDocumentRepository implements DocumentRepository {
  private async getRawAll(): Promise<Document[]> {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch (error) {
      console.error('Error parsing documents from localStorage:', error);
      return [];
    }
  }

  async save(document: Document): Promise<void> {
    const docs = await this.getRawAll();
    const index = docs.findIndex(d => d.id === document.id);
    if (index !== -1) {
      docs[index] = document;
    } else {
      docs.push(document);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));
  }

  async getAll(): Promise<Document[]> {
    const docs = await this.getRawAll();
    return docs; // Return all documents, regardless of status
  }

  async findById(id: string): Promise<Document | null> {
    const docs = await this.getRawAll();
    return docs.find(doc => doc.id === id) || null;
  }

  // The delete method now does nothing, as soft delete is handled by the use case
  async delete(id: string): Promise<void> {
    // No operation needed here, as the use case handles the status change
  }
}
