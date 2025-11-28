# ANOTACIONES SOBRE EXPERIENCIAS EN CODIGO
1) Para comenzar, quiero escribir algo que no quiero olvidarme jamás, y quiero poder dejarlo constatado en algún lado que sea oportuno:
> Las funciones asíncronas deben siempre llevar un await (async => await)
2) En las variables de entorno, cuando trabaje con mongoDB, debo de colocar el URI del mismo entre comillas 
simples o dobles ('',"") de la siguiente forma:
``` javascript
MONGODB_URI='mongodb://127.0.0.1:27017/trabajo_practico_2'
```
3) Al probar mis endpoints en postman, o en cualquier otra aplicación, debo colocar los nombres de los campos como están definidos en mis esquemas o modelos, según si esté trabajando con ORMs o ODMs, como muestro a continuación:

``` javascript
//En postman o cualquier aplicacion para probar endpoints
{
    "username":"Matias",
    "email":"matiasaguero@gmail.com",
    "password":"matias123",
}
```
y en el esquema:

``` javascript
const UserSchema = new Schema({
    "username":{...},
    "email":{...},
    "password":{...}
})
const UserModel = model('User', UserSchema)
export default UserModel;
```
4) Cuando realizo un login, utilizo mi funcion global "comparePasword" a la que le paso dos parametros: la contraseña ingresada y la contraseña guardada mediante user.password, de la siguiente forma:

``` javascript
const validatePassword = await comparePassword(originPassword, user.password)
```
---

Los setters y getters en Mongoose (y en JavaScript en general) sirven para definir cómo se obtiene (getter) o se establece (setter) el valor de una propiedad en un esquema o clase.

Getter: Permite personalizar el valor que se devuelve cuando accedes a la propiedad. Por ejemplo, puedes formatear datos antes de devolverlos.
Setter: Permite modificar o validar el valor antes de guardarlo en la base de datos.

5) Instanciar es crear un objeto a partir de una clase o constructor.
Definir una variable es asignarle un valor determinado.
6) Serializar es el proceso por el cual se convierte un documento en un objeto o un json con informacion mas utilizable. Esto sirve para poder enviarlo por las cookies, almacenarlo o mostrarlo al usuario.
7) La referencia this es un modo de dirgirse a una funcion, modelo, esquema o contexto dentro del cual se esté ejecutando.