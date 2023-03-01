const mongoose = require("mongoose");

/**
 * Order object.
 * @typedef {Object} OrderProduct
 * @property {string} product - The ID of the product.
 * @property {number} [quantity=1] - The quantity of the product.
 */

/**
 * @typedef {Object} Order
 * @property {string} _id - The ID of the order.
 * @property {string} status - The status of the order.
 * @property {boolean} [isCancelled=false] - Whether the order has been cancelled.
 * @property {number} total - The total cost of the order.
 * @property {string} orderer - The ID of the user who placed the order.
 * @property {OrderProduct[]} products - The products that were ordered.
 */

const order = {
  _id: mongoose.Schema.Types.ObjectId,
  status: {
    type: String,
    enum: ["Delivered", "Delivering", "Ready To Be Picked", "Return"],
  },
  isCancelled: { type: Boolean, default: false },
  total: { type: Number },
  orderer: { ref: "User", type: mongoose.Schema.Types.ObjectId },
  products: [
    {
      product: { ref: "Product", type: mongoose.Schema.Types.ObjectId },
      quantity: { type: Number, default: 1 },
    },
  ],
};

const orderSchema = mongoose.Schema(order);

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order, order };
