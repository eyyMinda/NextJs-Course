import fs from 'fs';
import { getFileData, getFilePath } from '@/helpers/api-util';


export default function handle(req, res) {
  const filePath = getFilePath();
  const data = getFileData(filePath);

  // ========================= POST =================================
  if (req.method === 'POST') {
    const { email, text } = req.body;
    const newFeedback = { id: new Date().toISOString(), email, text };

    // store in db
    const newData = [...data, newFeedback];
    fs.writeFileSync(filePath, JSON.stringify(newData));

    res.status(201).json({ message: 'Thank you for you feedback!' });
    // ========================= GET =================================
  } else if (req.method === 'GET') {

    res.status(201).json({ feedbacks: data });
    // ======================= DEFAULT ================================
  } else {
    res.status(200).json({ message: "Feedbacks API is working!" });
  }
}