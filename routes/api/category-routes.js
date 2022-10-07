const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [Product]
    });

    // return error if there is no category data
    if (!categoryData) {
      res.status(400).json({ message: 'No categories found' })
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findOne({
      where: {
        id: req.params.id
      },
      include: [Product]
    });

    // return error if there is no category data
    if (!categoryData) {
      res.status(400).json({ message: 'No categories found given the id' })
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const createCategoryData = await Category.create(req.body);
    res.status(200).json(createCategoryData)
  } catch (err) {
    res.status(500).json(err);
  }
 
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  // use destroy
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      }
    });
    res.status(200).json( {categoryData, status: 'Deleted Category'} )
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
