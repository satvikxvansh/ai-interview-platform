import { redirect } from 'next/navigation';

export default async function Page() {
  const isAuthenticated = false; 
  
  if (!isAuthenticated) {
    redirect('/login');
  }

  return <div>Dashboard Content</div>;
}