import type { DocumentRepository } from '../../../domain/repositories/DocumentRepository';

/**
 * Caso de uso para reactivar un documento.
 * @param repo Repositorio de documentos para la persistencia.
 * @returns Función para reactivar un documento.
 */
export const reactivateDocument = (repo: DocumentRepository) => {
  return async (id: string): Promise<void> => {
    const documentToUpdate = await repo.findById(id);
    if (documentToUpdate) {
      documentToUpdate.status = 'active';
      await repo.save(documentToUpdate);
    }
  };
};
