# Reto Tyerra

**Este proyecto aún está en desarrollo, cualquier cambio aparecerá primero en la rama "dev"**

Este proyecto fue desarrollado como parte del reto propuesto del proyecto Tyerra.

## Tecnologías Usadas

El proyecto será construido usando de las siguientes tecnologías:

1. MongoDB.
2. Express js.
3. React.
4. Node js.


Las dependencia de Node js utilizadas en el proyecto fueron las siguientes:

1. "aws-sdk" - Permite la conexión al S3 para realizar todas las operaciones relacionadas con los archivos.
2. "bcrypt": - Permite la encriptación de la contraseña del usuario.
2. "cors" - Permite el intercambio de información dentro del servidor.
3. "dotenv" - Permite la utilización del archivo ".env" para almacenar las variables de entorno.
4. "express" - Permite manejar operaciones del lado del servidor.
5. "jsonwebtoken" - Permite el manejo del login de usuario usando "Tokens"
6. "mongoose" - Permite la conexión y las peticiones que se realicen para la base de datos en MongoDB. 
7. "multer" - Permite el manejo interno de los archivos del usuario.
8. "nodemon" - Dependencia de desarrollo para facilitar realizar cambios en el codigo sin tener que volver a correr el servidor.

## Como correr el programa.

Una vez se clone el repositorio se deberá instalar los modulos usados para el desarrollo con el siguiente comando: 

```
npm install
```

Despues se deberá crear un archivo con el nombre **".env"** en el cual tendrá que tener las siguientes variables de entorno:

```
MONGODB_CONNECTIONSTRING=
ID_S3=
SECRET_S3=
BUCKET_NOMBRE=
```

En estas se tiene que colocar el string de conexion a la base de datos en MongoDB que se usará para el proyecto, el id del usuario de Amazon S3, el secret igual del usuario de S3 y por último el nombre del bucket que se estará usando.

Una vez realizados todos los pasos anteriores el proyecto se podrá correr utilizando del siguiente comando:

```
npm run dev
```



