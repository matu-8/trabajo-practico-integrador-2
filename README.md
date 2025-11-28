### TRABAJO PRACTICO INTEGRADOR 2 CON MONGO

## Configuracion basica e instalación

1. Cree una nueva carpeta y clone el repositorio.
2. Abralo con el editor de código o IDE de preferencia y configure las variables de entorno como se muestran en el archivo _.env.example_.
3. Abra la terminal y ejecute el siguiente comando:
```bash
npm run dev
```
## Documentos Embebidos y Referenciados: Justificación
Para el modelo de _User_, se optó por el enfoque de embeber un documento, en este caso, el de perfil, ya que es información estática que puede ser consultada junto con el usuario, y no escala en volumen.
Distinto es en cuanto a los demas modelos, ya que se optó por tomar un enfoque referenciado al tener que manejar documentos lo cuales van a ser editados constantemente, por ejemplo, los articulos que recibirán comentarios, y se asignarán etiquetas a los mismos.
**Ventajas y Desventajas**
La ventaja de aplicar el enfoque embebido en el modelo de Usuario, es la mejora en la consulta de información relacionada, en este caso, ya que permite obtener de una sola vez información valiosa para el cliente.La desventaja que implica adoptar este método, es que hay que realizar mas trabajo lógico para ingresar en el documento dentro del documento padre, y puede dificultarse a la hora de realizar ediciones o manipular información.
En el caso del enfoque refereciado, la ventaja radica en que permite a los documentos tenerlos de forma independiente, permitiendo relacionarlos sin embeber grandes documentos. La desventaja que implica esto 

