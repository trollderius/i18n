# i18n
Herramienta para edición de archivos de traducción en .json de multiples formatos.

La **herramienta** permite manejar varios **archivos de traducción**, uno por idioma, y permite **añadir** las traducciones que faltan o  **modificar** existentes.

Los archivos de traducción se encuentran en la carpeta **public/json**.

El archivo guía en el idioma original de la aplicación debe llamarse ```"origin.json"``` y el resto de archivos json de traducción deben tener el formato de ```"lang_" + ISO + ".json"```.
=======

La aplicación muestra por cada fila el nombre del **identificador**, y bajo este y por columnas las **traducciones** por cada idioma.
Por defecto solo se muestran los identificadores **sin traducción** en todos los idiomas.
En caso necesario aparece un botón que **muestra todos** los identificadores en caso de querer modificar traducciones **existentes**.

Es posible guardar todas las modificaciones en diferentes archivos simultáneamente y una ver completado se muestra el tiempo ocupado y un resumen de los archivos modificados.

El resumen de archivos modificados se van añadiendo desde el localStorage a una barra lateral para rectificar posibles errores.

Tambien es posible resetear por completo un archivo .json de traducción y en ese caso un pop-up pedirá confirmación.


###Falta:
* hacer un test exahustivo para crear un manejador de errores que funcione correctamente.
