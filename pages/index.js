// Client Side
import Link from 'next/link';
import { useRef, useState } from 'react';

export default function HomePage(props) {
  const { products } = props;
  const [submitText, setSubmitText] = useState();
  const [feedbacks, setFeedbacks] = useState();
  const [emailInputRef, feedbackInputRef] = [useRef(), useRef()];

  const handleForm = e => {
    e.preventDefault();
    const [email, text] = [emailInputRef.current.value, feedbackInputRef.current.value];
    const body = JSON.stringify({ email, text });
    const options = { method: "POST", body, headers: { 'Content-Type': "application/json" } };

    fetch('/api/feedback', options).then(res => res.json()).then(data => setSubmitText(data.message));
  }

  const handleGetFeedback = () => {
    fetch('/api/feedback').then(res => res.json()).then(data => setFeedbacks(data.feedbacks));
  }

  return (
    <div>
      <h1>Home Page</h1>

      <ul>
        {products.map(product => <li key={product.id}>
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </li>)}
      </ul>

      <hr />

      <form onSubmit={handleForm}>
        <div>
          <label htmlFor="email">Email:</label><br />
          <input name='email' id='email' ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Feedback:</label><br />
          <textarea id='feedback' rows='5' cols='40' ref={feedbackInputRef}></textarea>
        </div>
        <button type='submit'>Send Feedback</button>
      </form>

      {submitText && <h2>{submitText}</h2>}

      <hr />

      <button type='button' onClick={handleGetFeedback}>Load Feedbacks</button>

      {feedbacks && <table>
        <thead><tr>
          <th>Name</th>
          <th>Feedback</th>
        </tr></thead>
        <tbody>
          {feedbacks?.map(feedback => (
            <tr key={feedback.id}>
              <td>{feedback.email.split('@')[0]}</td>
              <td>{feedback.text}</td>
            </tr>
          ))}
        </tbody>
      </table>}
    </div>
  )
}

// Server Side
import fs from 'fs/promises';
import path from 'path';

export async function getStaticProps(context) {
  console.log('(Re-)Generating...');
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return { redirect: { destination: '/clients' } }
  }
  if (data.products.length === 0) {
    return { notFound: true }
  }

  return {
    props: {
      products: data.products
    },
    revalidate: 10
  };
}