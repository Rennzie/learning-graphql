export const Query = {
  Category: async (_, { _id }, context) => {
    return await context.Category.findById(_id);
  },
  Categories: async (_, __, context) => {
    return await context.Category.find();
  }
};

export const Category = {
  Farmer: async (category, __, context) => await context.User.findById(category.farmer_id)
};

export const Mutation = {
  createCategory: async (_, body, context) => {
    console.log('======> fired createCategory');
    // const newCategory = new context.Category;
    return await context.Category.create(body);
  },

  createNewChange: async (_, { id, createdAt, reasonForChange, animalsMoved }, context) =>
    await context.Category.findById(id).then(category =>
      category.newChange({ createdAt, reasonForChange, animalsMoved })
    )
};
