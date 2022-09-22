const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET all Categories, Join associated Products
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{
        model: Product,
      }],
    });
    res.status(200).json(categoryData);
    console.log('\nCategory Data Pulled\n');
  } catch (err) {
    res.status(500).json(err);
    console.log(("err: ", err));
  }
});

// GET one Category, Join associated Products
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{
        model: Product,
      }],
    });
    res.status(200).json(categoryData);
    console.log('\nCategory Data Pulled\n');
  } catch (err) {
    res.status(500).json(err);
    console.log(("err: ", err));
  }
});

// Create new Category
router.post('/', async (req, res) => {
  /* req.body should look like this...
    {
      category_name: "Sports"
    }
  */
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
    console.log('\nNew Category Added\n');
  } catch(err) {
    res.status(500).json(err);
    console.log(("err: ", err));
  }
});

// Update existing Category
router.put('/:id', async (req, res) => {
  /* req.body should look like this...
    {
      category_name: "Balls"
    }
  */
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(categoryData);
    console.log('\nCategory Updated\n');
  } catch(err) {
    res.status(500).json(err);
    console.log(("err: ", err));
  }
});

// Delete existing Category
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(categoryData);
    console.log('\nCategory Deleted\n');
  } catch(err) {
    res.status(500).json(err);
    console.log(("err: ", err));
  }
});

module.exports = router;
