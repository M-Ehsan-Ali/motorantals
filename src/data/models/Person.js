import DataType from "sequelize";
import Model from "../sequelize";

export const Person = Model.define("Person", {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataType.STRING,
    allowNull: false,
    unique: false,
  },
  address: {
    type: DataType.STRING,
    allowNull: false,
    unique: false,
  },
  phone: {
    type: DataType.STRING,
    allowNull: false,
    unique: false,
  },
  email: {
    type: DataType.STRING,
    allowNull: false,
    unique: false,
  },
  // line: {
  //   type: DataType.STRING,
  //   allowNull: true,
  //   unique: false,
  // },
  companyId: {
    type: DataType.INTEGER,
    allowNull: true,
    unique: false,
  },
  userId: {
    type: DataType.STRING,
    allowNull: true,
    unique: false,
  },
  share: {
    type: DataType.INTEGER,
    allowNull: false,
    unique: false,
    default: 0,
  },
});

export default Person;
