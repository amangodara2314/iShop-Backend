const Product = require("../models/product.model");
const fs = require("fs");
const Category = require("../models/category.model");

class ProductController {
  create(data, image) {
    return new Promise((res, rej) => {
      try {
        const colors = JSON.parse(data.colors);
        if (image) {
          const ImageName =
            new Date().getTime() +
            Math.floor(Math.random() * 2799) +
            image.name;
          const destination = "./public/images/product/" + ImageName;
          image.mv(destination, (err) => {
            if (err) {
              rej({
                msg: "Unable To Upload Image",
                status: 0,
              });
            } else {
              const prod = new Product({
                name: data.name,
                slug: data.slug,
                price: data.price,
                discount: data.discountPercentage,
                finalPrice: data.discount,
                category_id: data.category,
                colors: colors,
                image: ImageName,
              });
              prod
                .save()
                .then((success) => {
                  res({
                    msg: "Data Uploaded Successfully",
                    status: 1,
                  });
                })
                .catch((err) => {
                  rej({
                    msg: "Unable To Upload Data",
                    status: 0,
                  });
                });
            }
          });
        } else {
          const prod = new Product({
            name: data.name,
            slug: data.slug,
            price: data.price,
            discount: data.discountPercentage,
            finalPrice: data.discount,
            category_id: data.category,
            colors: colors,
          });
          prod
            .save()
            .then((success) => {
              res({
                msg: "Data Uploaded Successfully",
                status: 1,
                imageBaseUrl: "/images/product/",
              });
            })
            .catch((err) => {
              rej({
                msg: "Unable To Upload Data",
                status: 0,
              });
            });
        }
      } catch (error) {
        rej({
          msg: "Internal Server Error",
          status: 0,
        });
      }
    });
  }
  read(id, query) {
    return new Promise(async (res, rej) => {
      try {
        let dbQuery = {};
        let products;
        const category = await Category.findOne({
          slug: query.category_slug,
        });
        if (category) {
          dbQuery.category_id = category._id;
        }
        if (query.color != "null") {
          dbQuery.colors = query.color;
        }
        if (id) {
          products = await Product.findbyId(id).populate([
            "category_id",
            "color",
          ]);
        } else {
          if (query.limit != 0) {
            products = await Product.find(dbQuery)
              .limit(query.limit)
              .populate(["category_id", "colors"]);
          } else {
            products = await Product.find(dbQuery).populate([
              "category_id",
              "colors",
            ]);
          }
        }
        res({
          products,
          msg: "data found",
          status: 1,
          imageBaseUrl: "/images/product/",
        });
      } catch (error) {
        console.log(error);
        rej({
          msg: "Internal Server Error",
          status: 0,
        });
      }
    });
  }
  delete(id) {
    return new Promise((res, rej) => {
      try {
        Product.deleteOne({ _id: id })
          .then((success) => {
            res({
              msg: "Data Deleted Successfully",
              status: 1,
            });
          })
          .catch((err) => {
            rej({
              msg: "Unable To Delete Data",
              status: 0,
            });
          });
      } catch (error) {
        rej({
          msg: "Internal Server Error",
          status: 0,
        });
      }
    });
  }
  update(id, data, img) {
    return new Promise((res, rej) => {
      try {
        const colors = JSON.parse(data.colors);
        if (img == null) {
          Product.updateOne(
            { _id: id },
            {
              name: data?.name,
              slug: data?.slug,
              price: data?.price,
              discount: data?.discountPercentage,
              finalPrice: data?.discount,
              category_id: data?.category,
              colors: colors,
            }
          )
            .then((success) => {
              res({
                msg: "Updated Successfully",
                status: 1,
              });
            })
            .catch((err) => {
              rej({
                msg: "Unable To Update",
                status: 0,
              });
            });
        } else {
          const ImageName =
            new Date().getTime() + Math.floor(Math.random() * 2799) + img.name;
          const destination = "./public/images/product/" + ImageName;
          img.mv(destination, (err) => {
            if (err) {
              rej({
                msg: "Unable To Upload Image",
                status: 0,
              });
            } else {
              // if (data.oldName != undefined) {
              //   fs.unlinkSync("./public/images/product/" + data.oldName);
              // }
              Product.updateOne(
                { _id: id },
                {
                  name: data.name,
                  slug: data.slug,
                  price: data.price,
                  discount: data.discountPercentage,
                  finalPrice: data.discount,
                  category_id: data.category,
                  colors: colors,
                  image: ImageName,
                }
              )
                .then((success) => {
                  res({
                    msg: "Product Updated Successfully",
                    status: 1,
                  });
                })
                .catch((err) => {
                  rej({
                    msg: "Unable To Update Product",
                    status: 0,
                  });
                });
            }
          });
        }
      } catch (error) {
        console.log(error);
        rej({
          msg: "Internal Server Error",
          status: 0,
        });
      }
    });
  }
  changeStatus(id, stat) {
    return new Promise((res, rej) => {
      try {
        if (id) {
          Product.updateOne({ _id: id }, { status: stat })
            .then(() => {
              res({
                msg: "Status Updated Successfully",
                status: 1,
              });
            })
            .catch(() => {
              rej({
                msg: "Unable To Update Status",
                status: 0,
              });
            });
        }
      } catch (error) {
        rej({
          msg: "Internal Server Error",
          status: 0,
        });
      }
    });
  }
}

module.exports = ProductController;
