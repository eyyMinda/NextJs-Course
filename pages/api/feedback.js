import fs from 'fs';
import path from 'path';

const getFilePath = fileName => path.join(process.cwd(), 'data', fileName);
const getFileData = filePath => JSON.parse(fs.readFileSync(filePath));

export default function handle(req, res) {
  // ========================= POST =================================
  if (req.method === 'POST') {
    const { email, text } = req.body;
    const newFeedback = { id: new Date().toISOString(), email, text };

    // store in db
    const filePath = getFilePath('feedback.json');
    const data = [...getFileData(filePath), newFeedback];
    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({ message: 'Thank you for you feedback!' });
    // ========================= GET =================================
  } else if (req.method === 'GET') {
    const filePath = getFilePath('feedback.json');
    const data = getFileData(filePath);
    res.status(201).json({ feedbacks: data });

    // ======================= DEFAULT ================================
  } else {
    res.status(200).json({ message: "Feedbacks API is working!" });
  }

}