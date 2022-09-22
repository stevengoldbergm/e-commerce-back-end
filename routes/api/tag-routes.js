const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Find all items in tag. Join associated Product data
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{
        model: Product,
        through: ProductTag,
        as: 'tag_products',
      }]
    });
    res.status(200).json(tagData);
    console.log('\nTag Data Pulled\n');
  } catch (err) {
    res.status(500).json(err);
    console.log(("err: ", err));
  }

});

// Find a single tag using an ID parameter. Include associated Product data.
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{
        model: Product,
        through: ProductTag,
        as: 'tag_products',
      }]
    });
    res.status(200).json(tagData);
    console.log('\nTag Data Pulled\n');
  } catch (err) {
    res.status(500).json(err);
    console.log(("err: ", err));
  }
});

// Create a new tag
router.post('/', async (req, res) => {
  /* req.body should look like this...
    {
      tag_name: "Classical Music"
    }
  */
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
    console.log('\nNew Tag Added\n');
  } catch(err) {
    res.status(500).json(err);
    console.log(("err: ", err));
  }
});

// Update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  /* req.body should look like this...
    {
      tag_name: "Classical Music"
    }
  */
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(tagData);
    console.log('\nTag Updated\n');
  } catch(err) {
    res.status(500).json(err);
    console.log(("err: ", err));
  }
});

// Delete a tag with specific `id` value
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(tagData);
    console.log('\nTag Deleted\n');
  } catch(err) {
    res.status(500).json(err);
    console.log(("err: ", err));
  }
});


module.exports = router;
