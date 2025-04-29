const products = require('../models/productModel');


exports.addProductController = async (req, res) => {
    console.log("Inside add project controller");
    const username = req.username
    console.log(username);

    const { productName, rate, quantity } = req.body
    console.log(req.body);

    try {
        const existingProject = await products.findOne({ productName })
        if (existingProject) {
            res.status(406).json(`product already exists!!`)
        } else {
            const newProduct = new products({
                productName, rate, quantity, username
            })
            await newProduct.save()
            res.status(200).json(newProduct)
        }

    } catch (error) {
        res.status(406).json(error)
    }
}

exports.getAllProductController = async (req, res) => {
    console.log(`inside getAll product controller`);

    try {
        const allProducts = await products.find()
        res.status(200).json(allProducts)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.editProductController = async (req, res) => {
    console.log('inside edit product controller');
    const { id } = req.params

    const { productName, rate, quantity } = req.body
    // const username = req.username
    console.log(productName, rate, quantity);
    try {
        const updateProduct = await products.findByIdAndUpdate({ _id:id }, { productName, rate, quantity }, { new: true })
        await updateProduct.save()
        res.status(200).json(updateProduct)
    }
    catch (err) {
        res.status(401).json(err)
    }

}

exports.removeProductController = async (req, res) => {
    console.log(`inside remove product controller`);
    const {id} = req.params

    try {
        const removeProducts = await products.findByIdAndDelete({_id:id})
        res.status(200).json(removeProducts)
    } catch (error) {
        res.status(401).json(error)
    }
}


exports.submitSale = async (req, res) => {
    try {
      const { items } = req.body;
  
      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: "No sale items provided" });
      }
  
      for (const item of items) {
        const product = await products.findById(item.productId);
        if (!product) {
          return res.status(404).json({ message: `Product with ID ${item.productId} not found` });
        }
  
        if (product.quantity < item.quantity) {
          return res.status(400).json({ message: `Insufficient stock for ${product.productName}` });
        }
  
        product.quantity -= item.quantity;
        await product.save();
      }
  
      // Optionally record the sale
      // await Sale.create({ items, staff: req.username }); // make sure jwtMiddleware sets `req.username`
  
      res.status(200).json({ message: "Sale submitted successfully!" });
    } catch (error) {
      console.error("Sale submission error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  exports.getOutOfStockProducts = async (req, res) => {
    try {
      const outOfStock = await products.find({ quantity: 0 });
      res.status(200).json(outOfStock);
    } catch (err) {
      console.error("Error fetching out-of-stock products:", err);
      res.status(500).json({ message: "Server error fetching out-of-stock products" });
    }
  };

  exports.getTotalProducts = async (req, res) => {
    try {
      const count = await products.countDocuments();
      res.status(200).json({ totalProducts: count });
    } catch (error) {
      res.status(500).json({ message: "Error fetching total products", error });
    }
  };