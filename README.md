# Oksana-Backend

## Backend

Este proyecto es un backend que puedes utilizar para manejar diferentes tareas como crear y gestionar usuarios, pasteles y carritos de compra.

### Cómo iniciar el proyecto

Para iniciar el proyecto, necesitas tener instalado Node.js y npm (el gestor de paquetes de Node.js). Una vez instalados, puedes seguir los siguientes pasos:

1. **Iniciar el proyecto normalmente:**

   - Abre una terminal o línea de comandos.
   - Navega hasta la carpeta donde está el proyecto usando el comando `cd ruta/a/tu/proyecto`.
   - Ejecuta `npm start` para iniciar el servidor en modo normal.

2. **Iniciar el proyecto en modo de desarrollo:**
   - Sigue los mismos pasos anteriores, pero en lugar de `npm start`, ejecuta `npm run dev`. Esto iniciará el servidor con configuraciones adecuadas para pruebas y desarrollo.

### Cómo probar los endpoints con Postman

Postman es una herramienta que permite probar APIs de manera fácil. Aquí te explico cómo puedes usar Postman para probar los diferentes endpoints que están configurados en este proyecto:

1. **Descargar e Instalar Postman:**

   - Ve a [Postman](https://www.postman.com/downloads/) y descarga la versión adecuada para tu sistema operativo.
   - Instala Postman siguiendo las instrucciones de instalación.

2. **Importar la colección de endpoints:**

   - Abre Postman.
   - En la esquina superior izquierda, haz clic en `Import`.
   - Puedes arrastrar y soltar el archivo que contiene la colección de endpoints, o utilizar la opción de cargar el archivo manualmente.
   - Asegúrate de que el archivo sea el correcto y contenga los datos de configuración para cada endpoint.

3. **Utilizar los endpoints:**

   - Selecciona el endpoint que deseas probar de la lista que aparece en Postman después de importar la colección.
   - Modifica los parámetros necesarios, como tokens de autenticación o datos en el cuerpo de la solicitud (body), según lo que requiera el endpoint.
   - Haz clic en el botón `Send` para enviar la solicitud al servidor y recibir una respuesta.
   - Observa la respuesta que el servidor envía. Esto puede incluir datos, mensajes de error, o confirmaciones de que la acción fue exitosa.

4. **Pruebas comunes:**
   - **Crear un usuario:** Selecciona el endpoint de crear usuario, completa los datos necesarios en el cuerpo de la solicitud y envía la solicitud.
   - **Iniciar sesión:** Usa el endpoint de login, ingresa las credenciales del usuario y envía la solicitud para obtener un token de autenticación.
   - **Crear un pastel:** Asegúrate de estar autenticado como administrador, llena los detalles del pastel en el cuerpo de la solicitud, y envíalo.

### Consejos útiles

- **Tokens de Autenticación:** Algunos endpoints requieren autenticación. Para esto, necesitas iniciar sesión con un usuario válido y utilizar el token que recibes para hacer solicitudes a endpoints protegidos.
- **Errores Comunes:** Si recibes errores, verifica que los datos enviados sean correctos y completos. Revisa también que estés utilizando el método HTTP correcto (GET, POST, PATCH, DELETE).

Con estas instrucciones, deberías ser capaz de comenzar a probar y utilizar el backend a través de Postman.
