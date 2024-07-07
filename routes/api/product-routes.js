const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async(req, res) => {
  // find all products
  try{
    //include its associated Category and Tag data
    const products = await Product.findAll({
      include: [Category,Tag],
    });

    // Logs the retrieved products for verification
    console.log('Products retrieved:', products);

    res.json(products);
  } catch (err) {
    // handle error
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async(req, res) => {
  // find a single product by its `id`
  try {
    // include its associated Category and Tag data
    const product = await Product.findByPk(req.params.id, {
      include: [Category, Tag],
    });
    if (!product) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    // Logs the retrieved product for verification
    console.log(`Product retrieved with id ${req.params.id}:`, product);

    res.json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
router.post('/', (req, res) => {
  // Log the incoming request data for verification
  console.log('Request body:', req.body);

  Product.create(req.body)
    .then((product) => {
      // Log the created product details
      console.log('Created product:', product);

      // if there's product tags, create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, respond with the created product
      res.status(200).json(product);
    })
    .then((productTagIds) => {

      // Logs the created product tags
      console.log('Created product tags:', productTagIds);

      res.status(200).json(productTagIds);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // Log the incoming request data for verification
  console.log('Request body:', req.body);

  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // Log the updated product details
      console.log('Updated product:', product);

      // Check if there are tagIds in the request body
      if (req.body.tagIds && req.body.tagIds.length) {
        // Find all existing ProductTags for the product
        ProductTag.findAll({
          where: { product_id: req.params.id },
        }).then((productTags) => {
          // Log the existing product tags for verification
          console.log('Existing product tags:', productTags);

          // Create a list of current tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);

          // Filter new tag_ids to create new ProductTags
          const newProductTags = req.body.tagIds
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                product_id: req.params.id,
                tag_id,
              };
            });

          // Filter existing ProductTags to remove those not in req.body.tagIds
          const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);

          // Logs the new product tags to be created
          console.log('New product tags to create:', newProductTags);

          // Logs the product tags to be removed
          console.log('Product tags to remove:', productTagsToRemove);

          // Run both actions: remove old tags, create new tags
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      // respond with the updated product
      return res.json(product);
    })
    .catch((err) => {
      // handle error
      console.error('Error updating product:', err);
      res.status(400).json(err);
    });
});


router.delete('/:id', async (req, res) => {
  try {
    // attempt to delete the product with the specified id from the database
    const deleted = await Product.destroy({
      where: { id: req.params.id },
    });

    // Logs the deletion status for verification
    if (deleted) {
      console.log(`Product with id ${req.params.id} has been deleted.`);
    } else {
      console.log(`No product found with id ${req.params.id}.`);
    }

    // if no product was deleted, respond with status code message
    if (!deleted) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    // responds with status code for successful deletion with no content
    res.status(204).end();
  } catch (err) {
    // handle error
    console.error('Error deleting product:', err);
    res.status(500).json(err);
  }
});

module.exports = router;
