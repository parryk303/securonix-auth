import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';
import { Button } from 'semantic-ui-react';

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
          <Button id='loginout' onClick={signOut}>Logout</Button>
        </>
      ) : (
        <>
          <a href='https://www.securonix.com/'><img id='logo' src='/logo.jpg' alt='logo' height={100} /></a>
          <Button id='loginout' onClick={signIn}>Login</Button>
        </>
      )}
    </nav>
  )
}

export default Navbar;