import bcrypt from 'bcrypt';
export default (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 30],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      defaultValue: "user",
    },
  }, {
    timestamps: true,
    tableName: "Users",
  });

  User.associate = (models) => {
    User.hasMany(models.Tutorial, { foreignKey: "userId", as: "tutorials" });
  };

  // ✅ Automatically hash password before saving or updating
  User.beforeSave(async (user) => {
    if (user.changed("password")) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });

  // ✅ Optional helper method to check password
  User.prototype.checkPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

  return User;
};
