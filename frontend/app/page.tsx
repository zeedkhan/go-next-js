import ListUsers from "@/components/list-users";


export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ListUsers />
    </main>
  );
}
