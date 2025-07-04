import type { DocumentRepository } from '../../../domain/repositories/DocumentRepository';

/**
 * Caso de uso para eliminar un documento (borrado lógico).
 * @param repo Repositorio de documentos para la persistencia.
 * @returns Función para eliminar un documento.
 */
export const deleteDocument = (repo: DocumentRepository) => {
  return async (id: string): Promise<void> => {
    const documentToUpdate = await repo.findById(id);
    if (documentToUpdate) {
      documentToUpdate.status = 'deleted';
      await repo.save(documentToUpdate);
    }
  };
};
