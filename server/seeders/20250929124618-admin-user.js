'use strict';
import { hash } from 'bcrypt';

export async function up(queryInterface, Sequelize) {
  const hashedPassword = await hash('Admin123!', 10);
  await queryInterface.bulkInsert('Users', [
    {
      id: Sequelize.literal('gen_random_uuid()'),
      username: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Users', { email: 'admin@example.com' }, {});
}
