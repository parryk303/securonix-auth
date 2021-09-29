import Link from 'next/link';
import { signIn, signOut, useSession } from "next-auth/client";

const Navbar = () => {
  const [session, loading] = useSession();
  return (
    <nav className='navbar'>
      {session ? (
          <>
            <Link href='/secret'>
                <a className='navbar-brand'>Completed Forms</a>
            </Link>
            <button className='navbar-brand' onClick={signOut}>Logout</button>
            <Link href='/new'>
                <a className='create'>Take Assesment</a>
            </Link>

         </>
      ):(
        <>
          <button className='navbar-brand' onClick={signIn}>Login</button>
        </>
      )}
    </nav>
  )
}

export default Navbar;