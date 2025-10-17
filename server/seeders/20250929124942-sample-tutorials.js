'use strict';

export async function up(queryInterface, Sequelize) {
  // Replace this userId with the admin's UUID after inserting admin
  const [admin] = await queryInterface.sequelize.query(
    `SELECT id from "Users" WHERE email='admin@example.com';`
  );
  const adminId = admin[0].id;

  await queryInterface.bulkInsert('Tutorials', [
    {
      id: Sequelize.literal('gen_random_uuid()'),
      title: 'Introduction to Node.js',
      description: 'Learn the basics of Node.js, Express, and backend development.',
      published: true,
      userId: adminId,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: Sequelize.literal('gen_random_uuid()'),
      title: 'React Basics',
      description: 'Understand React components, state, and hooks.',
      published: true,
      userId: adminId,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Tutorials', null, {});
}
