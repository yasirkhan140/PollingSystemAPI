import { Option } from "../../../models/option.model.js";
import { ApiError } from "../../../utils/ApiError.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";

// delete a option
const deleteOption = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const option = await Option.findById(id);
  //   if option id not found
  if (!option) {
    throw new ApiError(400, "Option are not found");
  }
  //   if vote exits
  if (option.votes > 0) {
    throw new ApiError(400, "voted option cannot delete ");
  }
  const deleteOption = await Option.findByIdAndDelete(id);
  return res
    .status(200)
    .json(new ApiResponse(200, deleteOption, "Option deleted successfully"));
});

// add a vote
const addVote = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const option = await Option.findById(id);
  if (!option) {
    throw new ApiError(400, "Option is not found");
  }

  const updatedOption = await Option.findByIdAndUpdate(id, {
    $set: {
      votes: option.votes + 1,
    },
  });

  if (!updatedOption) {
    throw new ApiError(500, "Internal server error");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedOption, "Voted successfully "));
});
export { deleteOption, addVote };
