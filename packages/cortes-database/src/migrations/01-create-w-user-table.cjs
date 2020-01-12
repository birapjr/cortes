const migration = {
  async up(queryInterface, db) {
    await db.sequelize.transaction(async transaction => {
      await queryInterface.createTable(
        'w_user',
        {
          id: {
            type: db.Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
          },
          username: {
            type: db.Sequelize.STRING,
            allowNull: false,
            unique: true
          },
          data: {
            type: db.Sequelize.TEXT,
            allowNull: false
          },
          created_at: {
            type: db.Sequelize.DATE,
            allowNull: false
          },
          updated_at: {
            type: db.Sequelize.DATE,
            allowNull: false
          }
        },
        { transaction }
      );
    });
  },
  async down(queryInterface, db) {
    await db.sequelize.transaction(async transaction => {
      await queryInterface.dropTable('w_user', { transaction });
    });
  }
};

module.exports = migration;
