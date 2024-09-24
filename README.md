Antes de clonar el repositorio es necesario instalar las siguientes dependencias:

- NodeJS: ir a la página web y descargar instalador, luego ejecutarlo.
- yarn: Una vez instalado node, se nos instala el gestor de paquete "npm", pero ya que
  el proyecto está utilizando "yarn", es necesario instalarlo para no generar conflictos
  en las dependencias. Para instalarlo abrir powershell y ejecutar el comando "npm install -G yarn".

Luego de instalar las dependencias, se debe clonar el repositorio, una vez clonado abrir una terminal o powershell
en la raíz del proyecto y ejecutar el comando "yarn", se nos comenzará a descargar todas las dependencias especificadas
en el archivo package.json.
Ahora está listo para trabajar, para esto se debe utilizar los siguientes comandos:

"yarn dev": (Inicia la aplicación en modo de desarrollo, si se realiza algún cambio en el código no es necesario
volver a iniciar la aplicación, se reinicia automaticamente).

"yarn build": (Compila todo el código de typescript a código javascript para utilizarlo en ambiente de producción,
este código queda almacenado en la carpeta "dist").

"yarn start": (Inicia la aplicación desde el código previamente compilado).
