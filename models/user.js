const mongodb = require("mongodb");
const getDb = require("../utils/database").getDb;

class User {
  constructor(email, password, name, status, post) {
    this.email = email;
    this.password = password;
    this.nam = name;
    this.status = status ? status : null;
    this.post = [];
  }

  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(id) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(id) })
      .then((user) => {
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static findByEmail(email) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ email: email })
      .then((user) => {
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static addPost(userId, posts, post, postid) {
    const db = getDb();
    const newposts = [...posts, { id: new mongodb.ObjectId(postid) }];
    return db
      .collection("users")
      .updateOne(
        { _id: new mongodb.ObjectId(userId) },
        { $set: { post: newposts } }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deletePost(userId, post, postId) {
    const db = getDb();
    const posts=[...post]
    const newPosts = posts.filter(
      (item) => item.id.toString() !== postId.toString()
    );
    console.log(newPosts)
    return db
      .collection("users")
      .updateOne(
        { _id: new mongodb.ObjectId(userId) },
        { $set: { post: newPosts } }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = User;
