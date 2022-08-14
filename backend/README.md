# App para Control personal (ingresos y gastos)

La aplicación contiene:

-   Formulario de registro de operación:

-   1. Concepto STRING
-   2. Monto DECIMAL/FLOAT
-   3. Fecha DATETIME
-   4. Tipo (ingreso o gasto) (ENUM)

-   Listado de operaciones registradas según su tipo (ingreso o gasto).
-   Desde el listado, se puede modificar o eliminar una operación registrada previamente.
-   No es posible modificar el tipo de operación (ingreso o gasto) una vez creada.
-   Los datos mostrados son persistidos en una base de datos relacional MySql.

El esquema de datos esta armado de la siguiente manera:

-> imagen esquema sql

La API expone los siguientes endPoints:

-> List EndPoints

El cliente esta desarrollado con React.js.

## Pasos Backend

-   1- ✅ Configurar Servidor con Express
-   2- ✅ Configurar Rutas Api
-   3- ✅ Configurar Base de Datos Mysql y Sequelize
-   4- ✅ Crear Modelos de Sequelize
-   5- ✅ Crear Controladores
-   6- ✅ Testear Api
