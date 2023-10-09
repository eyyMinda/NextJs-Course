export default function UserProfilePage(props) {
  return <h1>{props.username}</h1>;
}

// Render server side props on build
export async function getServerSideProps(context) {
  const { params, req, res } = context;

  return {
    props: {
      username: "Max",
    },
  };
}
