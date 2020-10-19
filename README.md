# \<app-web\>

## Es necesario tener las siguientes aplicaciones:

# 1.Instalar NPM

https://nodejs.org/es/download/

# 2.Instalar Polymer-CLI

```
npm install -g polymer-cli
```


## Iniciar la aplicacion (dentro del carpeta del proyecto)

Ejecutar los siguientes comandos por consola: 
```
$ npm install
$ polymer serve -o
```
Esto te generará un servidor local para poder visualizar la aplicación.

# Mock para las pruebas

```
[{
    "id": 1,
    "email": "1@1.es",
    "password": "1"
},
{
    "id": 2,
    "email": "pepe@gmail.com",
    "password": "1234"
},
{
    "id": 3,
    "email": "arturo@gmail.com",
    "password": "0000"
},
{
    "id": 4,
    "email": "victor@gmail.com",
    "password": "78945"
},
{
    "id": 5,
    "email": "ruben@gmail.com",
    "password": "95687"
},
{
    "id": 6,
    "email": "javi@gmail.com",
    "password": "7548"
}]
```


## Construcción de la aplicación

Ejecutar el siguiente comando por consola: `$ polymer build`

Esto creará compilaciones de su aplicación en el directorio `build /`, optimizado para ser servido en producción. A continuación, puede servir las versiones construidas dando a `polymer serve` una carpeta para servir desde: 

```
$ polymer serve build/default
```
