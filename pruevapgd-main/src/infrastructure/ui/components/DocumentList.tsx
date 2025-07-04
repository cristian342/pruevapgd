import React from 'react';
import { useState } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TextField, Button, MenuItem, Select, InputLabel, FormControl, IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import type { Document } from '../../../domain/models/Document';
import type { DocumentType } from '../../../domain/models/DocumentType';

interface DocumentListProps {
  documents: Document[];
  documentTypes: DocumentType[];
  onEdit: (document: Document) => void;
  onView: (document: Document) => void;
  onDelete: (id: string) => void;
  onDownload: (document: Document) => void;
  onReactivate: (id: string) => void;
}

/**
 * Componente que muestra una lista de documentos con opciones de filtrado y acciones.
 */
export function DocumentList({ documents, documentTypes, onEdit, onView, onDelete, onDownload, onReactivate }: DocumentListProps) {
  const [filterName, setFilterName] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');

  const filteredDocuments = documents.filter((doc) => {
    const matchesName = doc.name.toLowerCase().includes(filterName.toLowerCase());
    const matchesType = filterType === '' || doc.documentTypeId === filterType;
    const docDate = new Date(doc.creationDate);
    const startDate = filterStartDate ? new Date(filterStartDate) : null;
    const endDate = filterEndDate ? new Date(filterEndDate) : null;

    const matchesStartDate = !startDate || docDate >= startDate;
    const matchesEndDate = !endDate || docDate <= endDate;

    return matchesName && matchesType && matchesStartDate && matchesEndDate;
  });

  const getDocumentTypeName = (documentTypeId: string) => {
    const type = documentTypes.find(dt => dt.id === documentTypeId);
    return type ? type.name : 'Tipo Desconocido';
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>Lista de Documentos</Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField
          label="Filtrar por Nombre"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          sx={{ minWidth: 200 }}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="filter-type-label">Filtrar por Tipo</InputLabel>
          <Select
            labelId="filter-type-label"
            value={filterType}
            label="Filtrar por Tipo"
            onChange={(e) => setFilterType(e.target.value as string)}
          >
            <MenuItem value=""><em>Todos los Tipos</em></MenuItem>
            {documentTypes.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Fecha de Inicio"
          type="date"
          value={filterStartDate}
          onChange={(e) => setFilterStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ minWidth: 180 }}
        />
        <TextField
          label="Fecha de Fin"
          type="date"
          value={filterEndDate}
          onChange={(e) => setFilterEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ minWidth: 180 }}
        />
        <Button
          variant="contained"
          startIcon={<RestartAltIcon />}
          onClick={() => {
            setFilterName('');
            setFilterType('');
            setFilterStartDate('');
            setFilterEndDate('');
          }}
          sx={{ alignSelf: 'center' }}
        >
          Limpiar Filtros
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="document table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Fecha de Creación</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDocuments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">No se encontraron documentos.</TableCell>
              </TableRow>
            ) : (
              filteredDocuments.map((doc) => (
                <TableRow
                  key={doc.id}
                  sx={{
                    ...(doc.status === 'deleted' && {
                      backgroundColor: '#f0f0f0',
                      textDecoration: 'line-through',
                    }),
                  }}
                >
                  <TableCell component="th" scope="row">
                    {doc.name}
                  </TableCell>
                  <TableCell>{getDocumentTypeName(doc.documentTypeId)}</TableCell>
                  <TableCell>{new Date(doc.creationDate).toLocaleDateString()}</TableCell>
                  <TableCell>{doc.status}</TableCell>
                  <TableCell align="right">
                    <IconButton aria-label="ver" onClick={() => onView(doc)}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton aria-label="editar" onClick={() => onEdit(doc)} disabled={doc.status === 'deleted'}>
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="eliminar" onClick={() => onDelete(doc.id)} disabled={doc.status === 'deleted'}>
                      <DeleteIcon />
                    </IconButton>
                    {doc.status === 'deleted' && (
                      <IconButton aria-label="reactivar" onClick={() => onReactivate(doc.id)}>
                        <RestoreFromTrashIcon />
                      </IconButton>
                    )}
                    <IconButton aria-label="descargar" onClick={() => onDownload(doc)}>
                      <DownloadIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
