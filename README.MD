# Pruebas E2E Team-Web

Este repositorio contiene un conjunto de pruebas end-to-end (E2E) diseñadas para validar la funcionalidad de la aplicación web Team-Web.

## Estructura de las pruebas

Las pruebas E2E se organizan en distintas categorías, cada una centrada en una funcionalidad específica de la aplicación. A continuación se presenta un resumen general de las categorías y los tipos de pruebas incluidas:

1. Pruebas de Login

    Login Correcto: Verifica que los usuarios con credenciales válidas puedan acceder correctamente.
    Login Incorrecto: Asegura que se muestre un mensaje de error cuando se introduzcan credenciales inválidas.

2. Pruebas en la Página de Inicio

    Acceso a Home sin Estar Logueado: Prueba la redirección al login cuando se intenta acceder sin autenticación.
    Acceso a Home con Autenticación: Verifica que los usuarios autenticados sean recibidos correctamente.
    Listado de Clubes: Comprueba que los usuarios puedan ver un listado de clubes.
    Agregar Club: Evalúa la capacidad de añadir un nuevo club y su correcta visualización en el listado.
    Fallo al Agregar Club por Falta de Nombre: Asegura que el sistema maneje adecuadamente la falta de información esencial al crear un club.

3. Pruebas en la Gestión de Club

    Detalles del Club: Verifica la visualización correcta de los detalles del club.
    Acceso a Club sin Token: Prueba la redirección al login cuando se intenta acceder a detalles del club sin autenticación.
    Agregar Miembro al Club: Evalúa la adición de miembros al club y la actualización correcta de la lista.
    Fallo al Agregar Miembro por Falta de Email: Asegura la gestión adecuada de errores cuando falta información crítica al añadir un miembro.
    Pruebas de Eliminación de Miembro: Verifica la funcionalidad de eliminación de miembros y la respuesta adecuada del sistema.

## Configuración y Ejecución

1. Clonar repositorio

``` 
git clone https://github.com/nrivas03/Prueba3-PruebasDeSoftware
```

2. Instalar dependencias

```
npm i
```

3. Comenzar pruebas

```
npm run e2e
```

4. (Opcional) Abrir navegador Cypress

```
npm run open
```

## Integrantes

* Nicolás Rivas
* Nicolás Sanhueza