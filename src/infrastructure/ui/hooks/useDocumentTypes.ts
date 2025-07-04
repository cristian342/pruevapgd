import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { DocumentType } from '../../../domain/models/DocumentType';
import { LocalStorageDocumentTypeRepository } from '../../persistence/local-storage/LocalStorageDocumentTypeRepository';

const documentTypeRepository = new LocalStorageDocumentTypeRepository();

/**
 * Hook para la gestión de tipos de documento.
 */
export function useDocumentTypes() {
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);

  useEffect(() => {
    loadDocumentTypes();
  }, []);

  const loadDocumentTypes = async () => {
    const types = await documentTypeRepository.getAll();
    setDocumentTypes(types);
  };

  const addDocumentType = async (name: string) => {
    const newType: DocumentType = {
      id: uuidv4(),
      name,
    };
    await documentTypeRepository.save(newType);
    await loadDocumentTypes();
  };

  const updateDocumentType = async (id: string, name: string) => {
    const existingType = await documentTypeRepository.getById(id);
    if (existingType) {
      const updatedType = { ...existingType, name };
      await documentTypeRepository.save(updatedType);
      await loadDocumentTypes();
    }
  };

  const deleteDocumentType = async (id: string) => {
    await documentTypeRepository.delete(id);
    await loadDocumentTypes();
  };

  return {
    documentTypes,
    addDocumentType,
    updateDocumentType,
    deleteDocumentType,
    loadDocumentTypes,
  };
}
