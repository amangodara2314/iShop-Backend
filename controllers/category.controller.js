const Category = require("../models/category.model");
const fs = require("fs");

class CategoryController {
  create(data, image) {
    return new Promise((resolve, reject) => {
      try {
        if (image == null) {
          const mydata = new Category({
            name: data.name,
            slug: data.slug,
          });
          mydata
            .save()
            .then((success) => {
              resolve({
                msg: "Category Added Successfully",
                status: 1,
              });
            })
            .catch((err) => {
              reject({
                msg: "Unable To Add Category",
                status: 0,
              });
            });
        } else {
          const ImageName =
            new Date().getTime() +
            Math.floor(Math.random() * 2799) +
            image.name;
          const destination = "./public/images/category/" + ImageName;
          image.mv(destination, (err) => {
            if (err) {
              reject({
                msg: "Unable To Upload Image",
                status: 0,
              });
            } else {
              const mydata = new Category({
                name: data.name,
                slug: data.slug,
                image: ImageName,
              });
              mydata
                .save()
                .then((success) => {
                  resolve({
                    msg: "Category Added Successfully",
                    status: 1,
                  });
                })
                .catch((err) => {
                  reject({
                    msg: "Unable To Add Category",
                    status: 0,
                  });
                });
            }
          });
        }
      } catch (error) {
        reject({
          msg: "Internal Server Error",
          status: 0,
        });
      }
    });
  }
  read(id) {
    return new Promise(async (res, rej) => {
      try {
        let data;
        if (id) {
          data = await Category.findbyId(id);
        } else {
          data = await Category.find();
        }
        res({
          msg: "Data Found",
          data,
          status: 1,
          imageBaseUrl: "images/category/",
        });
      } catch (error) {
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
        Category.deleteOne({ _id: id })
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
        if (img == null) {
          Category.updateOne({ _id: id }, { name: data.name, slug: data.slug })
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
          const destination = "./public/images/category/" + ImageName;
          img.mv(destination, (err) => {
            if (err) {
              rej({
                msg: "Unable To Upload Image",
                status: 0,
              });
            } else {
              console.log(data.oldName);
              if (data.oldName != undefined) {
                fs.unlinkSync("./public/images/category/" + data.oldName);
              }
              Category.updateOne(
                { _id: id },
                { name: data.name, slug: data.slug, image: ImageName }
              )
                .then((success) => {
                  res({
                    msg: "Category Updated Successfully",
                    status: 1,
                  });
                })
                .catch((err) => {
                  rej({
                    msg: "Unable To Update Category",
                    status: 0,
                  });
                });
            }
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
  changeStatus(id, status) {
    return new Promise((res, rej) => {
      try {
        Category.updateOne({ _id: id }, { status: status })
          .then((success) => {
            res({
              msg: "Status Changed Successfully",
              status: 1,
            });
          })
          .catch((err) => {
            rej({
              msg: "Unable To Update Status",
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
}

module.exports = CategoryController;
