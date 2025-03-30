module.exports = {
  ifvalue: function (conditional, options) {
    if (options === conditional || conditional === options.data.root.username) {
      return options.fn(this); // Render the block if condition is true
    } else {
      return options.inverse(this); // Render the else block if condition is false
    }
  },

  getDate: function (date) {
    return `${new Date(date).getMonth()}/${new Date(date).getDate()}/${new Date(
      date
    ).getFullYear()}`;
  },
};
