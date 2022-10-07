const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      inclide: [Product]
    });

    // return error if there is no category data
    if(!categoryData) {
      res.status(400).json({ message: 'No categories found'})
      return;
      }
    res.status(200).json(categoryData);
    } catch(err) {
      res.status(500).json(err);
    }
  });
  

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      // find it with a parameter of id
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
    .then(categoryData => {
      // give an error if the id is incorrect
      if (!categoryData) {
        res.status(404).json({message: "No category is found given the current ID"});
        return;
      }
    })
    // log an error
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    categoryName: req.body.categoryName
  })
    .then(categoryData => res.json(categoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(categoryData => {
      // if there is no category data, log an error
      if(!categoryData[0]) {
        res.status(404).json({ message: "No category is found given the current ID"});
        return;
      }
      res.json(categoryData);
    })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      // id require parameter of id
      id: req.params.id
    }
  })
    .then(categoryData => {
      if(!categoryData) {
        res.status(404).json({ message: "No category is found given the current ID"});
        return;
      }
      res.json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
