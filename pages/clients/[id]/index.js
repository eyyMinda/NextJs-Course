import { useRouter } from "next/router"

export default function ClientProjectsPage() {
  const router = useRouter();

  console.log(router.query);

  function handleProjectLoad() {
    router.push({
      pathname: '/clients/[id]/[clientprojectid]',
      query: { id: 'max', clientprojectid: 'projecta' }
    });
  }

  return (
    <div>
      <h1>Client Project Page</h1>
      <button onClick={handleProjectLoad}>Load Project A</button>
    </div>
  )
}
