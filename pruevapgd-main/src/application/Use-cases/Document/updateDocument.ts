import type { Document } from '../../../domain/models/Document';
import type { DocumentRepository } from '../../../domain/repositories/DocumentRepository';

/**
 * Caso de uso para actualizar un documento.
 * @param repo Repositorio de documentos para la persistencia.
 * @returns Función para actualizar un documento.
 */
export const updateDocument = (repo: DocumentRepository) => {
  return async (document: Document) => {
    await repo.save(document);
  };
};
