import React, { useState } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDocumentTypes } from '../hooks/useDocumentTypes';
import type { DocumentType } from '../../../domain/models/DocumentType';

/**
 * Página para la administración de tipos de documento.
 */
export function DocumentTypeManagementPage() {
  const { documentTypes, addDocumentType, updateDocumentType, deleteDocumentType } = useDocumentTypes();
  const [newTypeName, setNewTypeName] = useState('');
  const [editingType, setEditingType] = useState<DocumentType | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleAddType = async () => {
    if (newTypeName.trim()) {
      await addDocumentType(newTypeName.trim());
      setNewTypeName('');
    }
  };

  const handleEditClick = (type: DocumentType) => {
    setEditingType(type);
    setNewTypeName(type.name);
    setOpenDialog(true);
  };

  const handleUpdateType = async () => {
    if (editingType && newTypeName.trim()) {
      await updateDocumentType(editingType.id, newTypeName.trim());
      setOpenDialog(false);
      setEditingType(null);
      setNewTypeName('');
    }
  };

  const handleDeleteType = async (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este tipo de documento?')) {
      await deleteDocumentType(id);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingType(null);
    setNewTypeName('');
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Administrar Tipos de Documento</Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField
          label="Nuevo Nombre de Tipo de Documento"
          value={newTypeName}
          onChange={(e) => setNewTypeName(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleAddType}>Agregar Tipo</Button>
      </Box>

      <Typography variant="h6">Tipos de Documento Existentes</Typography>
      <List>
        {documentTypes.map((type) => (
          <ListItem
            key={type.id}
            secondaryAction={
              <>
                <IconButton edge="end" aria-label="editar" onClick={() => handleEditClick(type)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="eliminar" onClick={() => handleDeleteType(type.id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText primary={type.name} />
          </ListItem>
        ))}
      </List>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editingType ? 'Editar Tipo de Documento' : 'Agregar Tipo de Documento'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre del Tipo de Documento"
            type="text"
            fullWidth
            value={newTypeName}
            onChange={(e) => setNewTypeName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleUpdateType}>{editingType ? 'Actualizar' : 'Agregar'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
