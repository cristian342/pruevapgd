/**
 * Interfaz que define la estructura de un Documento.
 */
export interface Document {
  id: string;
  name: string;
  documentTypeId: string;
  creationDate: string;
  fileContent: string;
  fileName: string;
  fileType: string;
  description: string;
  status: 'active' | 'deleted';
}
