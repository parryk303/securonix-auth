import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';
import { Button } from 'semantic-ui-react';

const Navbar = () => {
  const [session, loading] = useSession();
  return (
    <>
      {session ? (
        <>
          <nav className='navbar'>
            <div className='logoGrid'>
              <a href='https://www.securonix.com/'><img id='mobileLogo' src='/logo.jpg' alt='logo' height={100} /></a>
              <div className='nav'>
                <Link href='/new'>
                  <a className='navbar-brand'>Take Assesment</a>
                </Link>
                <Link href='/secret'>
                  <a className='navbar-brand'>View Assessments</a>
                </Link>
              </div>
            </div>
            <a href='https://www.securonix.com/'><img id='logo' src='/logoBig.png' alt='logo' height={135} /></a>
            <Button id='loginout' onClick={signOut}>Logout</Button>
          </nav>
          <nav id='mobileNav' className='navbar'>
            <div id='mobileLinks' className='nav'>
              <Link href='/new'>
                <a className='navbar-brand'>Take Assesment</a>
              </Link>
              <Link href='/secret'>
                <a className='navbar-brand'>View Assessments</a>
              </Link>
            </div>
          </nav>
        </>
      ) : (
        <>
          <nav className='navbar'>
            <div className='logoGrid'>
              <a href='https://www.securonix.com/'><img id='mobileLogo' src='/logo.jpg' alt='logo' height={100} /></a>
            </div>
            <a href='https://www.securonix.com/'><img id='logo' src='/logoBig.png' alt='logo' height={135} /></a>
          <Button id='loginout' onClick={signIn}>Login</Button>
          </nav>
        </>
      )}
    </>
  )
}

export default Navbar;