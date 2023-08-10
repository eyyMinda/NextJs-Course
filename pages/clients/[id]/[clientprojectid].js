import { useRouter } from "next/router"

export default function SelectedClientProjectPage() {
  const router = useRouter();

  console.log(router.query);


  return (
    <div>
      <h1>Project Page For a Specific Selected Client</h1>
    </div>
  )
}
