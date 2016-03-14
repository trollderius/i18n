# i18n
**Herramienta para edición de archivos de traducción en .json de multiples formatos.**

###Entorno
Aplicación web escrita en **node.js** con **express**, template **jade**, procesador de css **LESS** y usa las librerías **bootstrap** y **ReactJS**.

No incluye jQuery.

###Archivos de traducción
La herramienta permite manejar varios **archivos de traducción**, uno por idioma, y permite **añadir** las traducciones que faltan o  **modificar** existentes.

Los archivos de traducción se encuentran en la carpeta **public/json**.

El archivo guía en el idioma original de la aplicación se debe adjuntar primero y se podrá descargar con el nombre de ```~origin.json```.

###Interfaz usuario
La aplicación muestra por cada fila el nombre del **identificador**, y bajo este y por columnas las traducciones por cada idioma.
Por defecto solo se muestran los identificadores **sin traducción** en todos los idiomas.

Es posible dar preferencia a un lenguaje haciendo click sobre el ISO del head de la tabla, de manera que la columna se expande para **traducir textos largos** más cómodamente.
En caso necesario aparece un botón que muestra todos los identificadores en caso de querer **modificar traducciones** existentes.

Es posible **guardar** todas las modificaciones en diferentes archivos **simultáneamente** y una vez completado se muestra un resumen de los archivos modificados.

El **resumen** de archivos modificados se van añadiendo desde el localStorage a una barra lateral para rectificar posibles errores.

Tambien es posible **resetear** por completo un archivo .json de traducción y en ese caso un pop-up pedirá confirmación _(excepto "orign.json")_.

En caso de que no hayan traducciones pendientes se muestran todos los identificadores.

###Consideraciones de traducción:
* Esta aplicación está pensada en que si no existe una traduccion en un idioma se mostrará la traducción del archivo origin.json.
* Un valor puede ser un campo vacío.

###Por desarrollar:
* Hacer un test exahustivo para crear un manejador de errores que corrija archivos dañados.
