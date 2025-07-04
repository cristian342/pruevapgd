import { useEffect, useState } from 'react';
import type { Document } from '../../../domain/models/Document.ts';
import { LocalStorageDocumentRepository } from '../../persistence/local-storage/LocalStorageDocumentRepository';
import { createDocument } from '../../../application/Use-cases/Document/createDocument';
import { updateDocument as updateDocUseCase } from '../../../application/Use-cases/Document/updateDocument';
import { deleteDocument as deleteDocUseCase } from '../../../application/Use-cases/Document/deleteDocument';
import { reactivateDocument as reactivateDocUseCase } from '../../../application/Use-cases/Document/reactivateDocument';

const repo = new LocalStorageDocumentRepository();
const create = createDocument(repo);
const update = updateDocUseCase(repo);
const remove = deleteDocUseCase(repo);
const reactivate = reactivateDocUseCase(repo);

/**
 * Hook para la gestión de documentos.
 */
export const useDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([]);

  const loadDocuments = async () => {
    const updated = await repo.getAll();
    setDocuments(updated);
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const addDocument = async (doc: Omit<Document, 'id' | 'status'>) => {
    await create(doc);
    await loadDocuments();
  };

  const updateDocument = async (doc: Document) => {
    await update(doc);
    await loadDocuments();
  };

  const deleteDocument = async (id: string) => {
    await remove(id);
    await loadDocuments();
  };

  const reactivateDocument = async (id: string) => {
    await reactivate(id);
    await loadDocuments();
  };

  return {
    documents,
    addDocument,
    updateDocument,
    deleteDocument,
    reactivateDocument,
    loadDocuments,
  };
};
