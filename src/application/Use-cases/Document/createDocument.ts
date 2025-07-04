import type { Document } from '../../../domain/models/Document';
import type { DocumentRepository } from '../../../domain/repositories/DocumentRepository';

/**
 * Caso de uso para crear un nuevo documento.
 * @param repo Repositorio de documentos para la persistencia.
 * @returns Función para crear y guardar un documento.
 */
export const createDocument = (repo: DocumentRepository) => {
  return async (data: Omit<Document, 'id' | 'status'>) => {
    const newDoc: Document = {
      ...data,
      id: crypto.randomUUID(),
      status: 'active'
    };
    await repo.save(newDoc);
  };
};
