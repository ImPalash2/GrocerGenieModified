import Cart from "../models/Cart.js";

export const create = async (req, res) => {
  try {
    const created = await new Cart(req.body).populate({
      path: "product",
      populate: { path: "brand" },
    });
    await created.save();
    res.status(201).json(created);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error adding product to cart, please trying again later",
    });
  }
};

export const getByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Cart.find({ user: id }).populate({
      path: "product",
      populate: { path: "brand" },
    });

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error fetching cart items, please trying again later",
    });
  }
};

export const updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Cart.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate({ path: "product", populate: { path: "brand" } });
    res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error updating cart items, please trying again later",
    });
  }
};

export const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Cart.findByIdAndDelete(id);
    res.status(200).json(deleted);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error deleting cart item, please trying again later" });
  }
};

export const deleteByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    await Cart.deleteMany({ user: id });
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Some Error occured while resetting your cart" });
  }
};
