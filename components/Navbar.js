import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';

const Navbar = () => {
  const [session, loading] = useSession();
  return (
    <nav className='navbar'>
      {session ? (
        <>
          <div className='logoGrid'>
            <a href='https://www.securonix.com/'><img id='logo' src='/logo.jpg' alt='logo' height={100} /></a>
            <div className='nav'>
              <Link href='/new'>
                <a className='navbar-brand'>Take Assesment</a>
              </Link>
              <Link href='/secret'>
                <a className='navbar-brand'>View Assessments</a>
              </Link>
            </div>
          </div>
          <button id='loginout' className='navbar-brand' onClick={signOut}>Logout</button>
        </>
      ) : (
        <>
          <img id='logo' src='/logo.jpg' alt='logo' height={100} />
          <button id='loginout' className='navbar-brand' onClick={signIn}>Login</button>
        </>
      )}
    </nav>
  )
}

export default Navbar;