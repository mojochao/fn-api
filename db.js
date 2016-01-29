import _ from 'lodash';
import Faker from 'faker';
import Sequelize from 'sequelize';


// Create database connection object.

const Conn = new Sequelize(
  'fn-db',
  'postgres',
  'postgres',
  {
    dialect: 'postgres',
    host: 'localhost'
  }
);


// Define database model entities.

/**
 * User model.
 *
 * This model captures all data about users.
 *
 * @type {Model}
 */
const User = Conn.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

/**
 * Post model.
 *
 * This model captures all data about posts made by users.
 *
 * @type {Model}
 */
const Post = Conn.define('post', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false
  }
});


// Define database model entity relationships.

User.hasMany(Post);
Post.belongsTo(User);


// Add development data to the database.

Conn.sync({force: true}).then(()=>{
  _.times(10, ()=> {
    return User.create({
      firstName: Faker.name.firstName(),
      lastName: Faker.name.lastName(),
      email: Faker.internet.email()
    }).then((user)=> {
      return user.createPost({
        title: `Sample title by ${user.firstName}`,
        content: `This is a sample post by ${user.firstName}.`
      });
    });
  });
});


// Export database connection object.

export default Conn;
