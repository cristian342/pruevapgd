import type { Document } from '../models/Document';

/**
 * Interfaz que define las operaciones de persistencia para Documentos.
 */
export interface DocumentRepository {
  save(document: Document): Promise<void>;
  getAll(): Promise<Document[]>;
  findById(id: string): Promise<Document | null>;
  delete(id: string): Promise<void>;
}
