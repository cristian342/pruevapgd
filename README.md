# Aplicación de Gestión de Documentos

Este proyecto es una Aplicación de Página Única (SPA) para la gestión de documentos, construida con React, Vite, TypeScript y Material-UI. Sigue una arquitectura hexagonal para lograr un diseño modular, desacoplado y fácil de mantener. Toda la información se persiste en el `localStorage` del navegador.

## Funcionalidades

### Gestión de Documentos
- **Crear Documentos:** Permite a los usuarios crear nuevos documentos proporcionando la información necesaria a través de un formulario.
- **Visualizar Documentos:** Muestra una lista de todos los documentos existentes.
- **Actualizar Documentos:** Permite editar la información de un documento existente.
- **Eliminar Documentos:** Permite eliminar documentos (borrado lógico).
- **Reactivar Documentos:** Permite reactivar documentos que han sido eliminados lógicamente.

### Gestión de Tipos de Documento
- **Administrar Tipos de Documento:** Permite a los usuarios gestionar las categorías o tipos de documentos disponibles en la aplicación.

## Cómo Ejecutar la Aplicación

Para ejecutar esta aplicación, asegúrate de tener Node.js y npm (o yarn) instalados.

**1. Clonar el Repositorio (si aplica):**
```bash
git clone https://github.com/cristian342/pruevapgd.git
cd pruevapgd/prueva
```

**2. Instalar Dependencias:**
Abre una terminal en el directorio `prueva` y ejecuta:
```bash
npm install
```

**3. Ejecutar la Aplicación en Modo Desarrollo:**
Desde la misma terminal, ejecuta:
```bash
npm run dev
```
La aplicación se iniciará y estará disponible en `http://localhost:5173` (o el puerto que se muestre en la consola).

**4. Acceder a la Interfaz Web:**
Abre tu navegador web y navega a la URL proporcionada.

## Buenas Prácticas de Documentación del Código

El código fuente de este proyecto sigue buenas prácticas de documentación, incluyendo:

- **Comentarios JSDoc:** Los componentes, hooks, y funciones importantes están documentados usando comentarios JSDoc, lo que facilita la comprensión del propósito y uso de cada parte del código.
- **Nombres Claros y Descriptivos:** Las variables, funciones, componentes y archivos tienen nombres que reflejan su propósito y funcionalidad, siguiendo las convenciones de React y TypeScript.
- **Estructura de Carpetas Intuitiva:** El proyecto está organizado siguiendo los principios de la arquitectura hexagonal, separando el dominio, la aplicación y la infraestructura para una mejor navegación y mantenibilidad.

Para una comprensión más profunda del código, se recomienda revisar los archivos en las siguientes carpetas:
- `src/domain`: Contiene los modelos y repositorios del núcleo del negocio.
- `src/application`: Contiene los casos de uso que orquestan la lógica de negocio.
- `src/infrastructure`: Contiene las implementaciones de los repositorios y los componentes de la interfaz de usuario.
