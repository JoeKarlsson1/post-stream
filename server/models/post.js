'use strict';

module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    body: {
      type : DataTypes.STRING,
      allowNull : false,
      notEmpty: true,
      required : true
    },
    commentCount: {
      type : DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    }
  }, {
    classMethods: {
      associate : function(models) {
        Post.belongsTo(models.User);
        Post.hasMany(models.Comment, {
          onDelete : 'cascade'
        })
      }
    }
  });

  return Post;
};