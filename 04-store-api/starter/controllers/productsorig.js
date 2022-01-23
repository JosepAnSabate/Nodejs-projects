const Product = require('../models/product')


const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).sort('name').select('name price')
   
    res.status(200).json({ products,  nbHits:products.length });
  };

  const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields } = req.query;
    const queryObject = {};

    if (featured) {
      queryObject.featured = featured === 'true'? true: false
    }
    if (company) {
      queryObject.company = company 
    }
    if (name) {
      queryObject.name = { $regex: name, $options: 'i' } // regex(search) permet buscar per lletres
    }
    //console.log(queryObject)
    //console.log(req.query)
    let result = await Product.find(queryObject);

    // if (sort) {
    //  // console.log(sort);
    //  const sortList = sort.split(',').join(' ');
    //  result = result.sort(sortList)
    // } else {
    //   result = result.sort('createdAt')
    // }
    
    // if (fields) {
    //   const fieldsList = sort.split(',').join(' ')
    //   result = result.select(fieldsList)
    // }
    // const page = Number(req.query.page) || 1;
    // const limit = Number(req.query.limit) || 10;
    // const skip = (page - 1) * limit;

    // result = result.skip(skip).limit(limit);
    // 23 products
    // 4pag 7prod 7prod 7prod 2prod
    const products = await result;
    res.status(200).json({ products,  nbHits:products.length });
  };

  
  module.exports = {
    getAllProducts,
    getAllProductsStatic,
  };