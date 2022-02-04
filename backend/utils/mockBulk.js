const mockBulk = (sequelize) => {
  const { User, Operation, Category } = sequelize.models;
  // module.exports = (sequelize) => {
  User.bulkCreate([
    {
      email: 'veronica@gmail.com',
      name: 'Veronica',
      password: '$2a$10$NWpuVdtS0qlq3iqgWdy/tu9EudtR5lu2OQx9YKiAWTj1QYyHb3rsy',
    },
    {
      email: 'markos@gmail.com',
      name: 'Marcos',
      password: '$2a$10$NWpuVdtS0qlq3iqgWdy/tu9EudtR5lu2OQx9YKiAWTj1QYyHb3rsy',
    },
    {
      email: 'arturito@gmail.com',
      name: 'Arturo',
      password: '$2a$10$NWpuVdtS0qlq3iqgWdy/tu9EudtR5lu2OQx9YKiAWTj1QYyHb3rsy',
    },
  ]).catch((err) => {
    console.log('Error while users creation : ', err);
  });

  Category.bulkCreate([
    {
      name: 'Familiares',
      userId: 1,
    },
    {
      name: 'Familiar',
      userId: 2,
    },
    {
      name: 'Trabajo',
      userId: 2,
    },
    {
      name: 'Amigos',
      userId: 3,
    },
  ]);

  Operation.bulkCreate([
    {
      concept: 'Compra para Bmw',
      amount: '3412.00',
      date: '2022-01-27 01:01:44',
      category: 'salary',
      type: 'egreso',
      userId: 1,
      categoryId: 1,
    },
    {
      concept: 'Gim para la Semana',
      amount: '663.00',
      date: '2022-01-27 01:01:44',
      category: 'salary',
      type: 'egreso',
      userId: 2,
      categoryId: 2,
    },
    {
      concept: 'Todo el queso para las empanadas',
      amount: '453.00',
      date: '2022-01-27 01:01:44',
      category: 'salary',
      type: 'egreso',
      userId: 2,
      categoryId: 3,
    },
    {
      concept: 'Comprar Salsa para Abuela',
      amount: '12341.00',
      date: '2022-01-27 01:01:44',
      category: 'salary',
      type: 'egreso',
      userId: 3,
      categoryId: 4,
    },
  ]).catch((err) => {
    console.log('Error while operations creation : ', err);
  });
};

module.exports = { mockBulk };
