export default function FeedbackPage(props) {
  const [feedbackData, setFeedbackData] = useState([]);

  if (!props.feedbacks) return <h1>No feedbacks</h1>
  function handleGoToFeedback(id) {
    fetch(`/api/${id}`).then(res => res.json()).then(data => setFeedbackData(d => [...d, data.feedback]));
  }


  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Feedback</th>
          <th>{feedbackData.length > 0 && 'Email'}</th>
        </tr>
      </thead>
      <tbody>
        {props.feedbacks?.map(item => (
          <tr key={item.id}>
            <td>{item.email.split('@')[0]}</td>
            <td>{item.text}</td>
            {feedbackData.length > 0 && feedbackData.some(f => f.id === item.id) ?
              <td>{feedbackData.find(f => f.id === item.id).email}</td> :
              <td><button onClick={handleGoToFeedback.bind(null, item.id)}>Show Details</button></td>}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

import { getFileData, getFilePath } from "@/helpers/api-util";
import { useState } from "react";
export async function getStaticProps() {
  const feedbacks = getFileData(getFilePath());

  return { props: { feedbacks } };
}
