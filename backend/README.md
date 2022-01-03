# ABM de operaciones (ingresos y egresos)

La aplicación deberá contener:

- Formulario de registro de operación. El mismo deberá contener:

- 1. Concepto STRING
- 2. Monto DECIMAL/FLOAT
- 3. Fecha DATETIME
- 4. Tipo (ingreso o egreso) (ENUM)

- Listado de operaciones registradas según su tipo (ingreso o egreso).
- Desde el listado, se debe poder modificar o eliminar una operación registrada
  previamente. No debe ser posible modificar el tipo de operación (ingreso o
  egreso) una vez creada.

Los datos mostrados deben ser persistidos en una base de datos relacional.
El esquema de datos puede armarse según se considere apropiado en base a los requerimientos del negocio.
La API deberá exponer URLS que devuelvan datos en JSON.

Estos datos en JSON deberán ser consumidos por un cliente, a través de peticiones AJAX.
El cliente puede ser armado con React.js.
El trabajo realizado se subirá a un repositorio.

## Pasos

- 1- ✅ Configurar Servidor con Express
- 2- ✅ Configurar Rutas Api
- 3- 🔄 Configurar Base de Datos Mysql y Sequelize
- 4- 🔄 Crear Modelos de Sequelize
- 5- 🔄 Crear Controladores
- 6- 🔄 Testear
