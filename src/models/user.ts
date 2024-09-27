import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from '../config/database';

interface UserAttributes {
  id?: number;
  username: string;
  password: string;
  is2FAEnabled?: boolean;
  secret2FA?: string;
}

class User extends Model<UserAttributes> {
  public id!: number;
  public username!: string;
  public password!: string;
  public is2FAEnabled!: boolean;
  public secret2FA!: string;
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is2FAEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    secret2FA: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'user',
  }
);

export default User;