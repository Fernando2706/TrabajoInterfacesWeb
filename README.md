# TrabajoInterfacesWeb
In a far far away galaxy


# Pasos para poder ejecutar el trabajo:
## 1ª Ejecutar el script (script/DDBB.ts) para cargar los datos en la base de datos:
  - Para ello se debe crear un archivo .env que tenga los siguientes campos:
    - DB_URL: dirreccion a la base de datos en mongo
    - DB_NAME: nombre de la base de datos
   
   Una vez ejecutado debera tener los datos que se usan en su base de datos (El script se ejecuta mediante deno ```deno run --unstable --allow-all DDBB.ts```)

## 2º Lanzar el back-end usando deno ```deno run --unstable --allow-all server.ts```.
  - Para ello se debe crear un archivo .env que tenga los siguientes campos:
    - DB_URL: dirreccion a la base de datos en mongo
    - DB_NAME: nombre de la base de datos
    - PORT: numero del puerto (usar el 8000)

## 3º Lanzar el front-end usando nodejs:
  - Para ello primero se tiene que instalar las dependencias del proyecto mediante el comando npm install -s
  - Una vez instalado se debera lanzar el servidor del front-end mediante el comando npm start

## 4º Disfrutar de una experiencia unica en el universo de Star Wars "¡Qué la fuerza te acompañe!"



## ¿Qué hace el trabajo?

Este proyecto te permite navegar por el universo de star wars y poder comprender mejor que sucede en esta galaxia tan loca. Puedes buscar a que planeta quieres ir, y se enseñara la informacion del planeta y los habitantes que viven en el
