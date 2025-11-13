import Comment from "../models/Comment";
export const addComment = async (req, res) => {
  const { caseId, body } = req.body;
  const doc = await Comment.create({ caseId, body, authorId: req.user!.sub });
  res.status(201).json(doc);
};
export const listComments = async (req, res) => {
  const { caseId } = req.params;
  const data = await Comment.find({ caseId }).populate("authorId","fullName");
  res.json(data);
};
