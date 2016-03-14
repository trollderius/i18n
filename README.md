# i18n
Herramienta para edición de archivos de traducción

La aplicación muestra en cada fila el nombre del identificador, y bajo este y por columnas las traducciones por cada idioma.
Por defecto solo se muestran los identificadores que no poseen traducción en todos los idiomas.
En caso necesario aparece un botón que muestra todos los identificadores en caso de querer modificar traducciones existentes.

Los archivos de traducción se encuentran en la carpeta public/json con el nombre 'origin' com el archivo guía en el idioma original de la aplicación y el resto de archivos json de traducción que deben tener el formato de ```"lang_" + ISO + ".json"```.


###Falta:
* hacer un test exahustivo para crear un manejador de errores que funcione correctamente.
