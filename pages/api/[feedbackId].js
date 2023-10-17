import { getFileData, getFilePath } from "@/helpers/api-util";

export default function handler(req, res) {
  const feedbackId = req.query.feedbackId;
  const fileData = getFileData(getFilePath());
  const selectedFeedback = fileData.find(f => f.id === feedbackId);

  res.status(201).json({ feedback: selectedFeedback });
}