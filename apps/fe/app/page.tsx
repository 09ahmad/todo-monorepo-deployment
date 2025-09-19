import { client } from "@repo/db/client";

export default async function Home() {
  const users = await client.user.findMany();
  return <div>
    Usres are : {JSON.stringify(users)}
  </div>;
}

// export const dynamic = 'force-dynamic'
// or 
export const revalidate = 60 //revlidate after each 60 seconds 