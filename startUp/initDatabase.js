const categoriesMock = require("../mock/categories.json");
const Category = require("../models/Category");

const createInitialEntity = async (Model, data) => {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (error) {
        return error;
      }
    })
  );
};

module.exports = async () => {
  const categories = await Category.find();
  if (categories.length !== categoriesMock.length) {
    await createInitialEntity(Category, categoriesMock);
  }
};
