export default (sequelize, DataTypes) => {
  const Tutorial = sequelize.define("Tutorial", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    published: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    timestamps: true,
    tableName: "Tutorials",
  });

  Tutorial.associate = (models) => {
    Tutorial.belongsTo(models.User, { foreignKey: "userId", as: "user" });
  };

  return Tutorial;
};
