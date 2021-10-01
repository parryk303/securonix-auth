import Head from 'next/head';
import Navbar from './Navbar';

const Layout = ({ children }) => (
    <>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link
            rel='preload'
            href='/fonts/nimbus-sans-novas-dot/Nimbus-Sans-D-OT-Bold_32747.ttf'
            as='font'
            crossOrigin='' />
            <link
            rel='preload'
            href='/fonts/nimbus-sans-novas-dot/Nimbus-Sans-D-OT-Light_32752.ttf'
            as='font'
            crossOrigin='' />
            <link
            rel='preload'
            href='/fonts/HandelGo.ttf'
            as='font'
            crossOrigin='' />
            <link
            rel='preload'
            href='/fonts/Ubuntu/Ubuntu-Medium.ttf'
            as='font'
            crossOrigin='' />
            <link
            async
            rel='stylesheet'
            href='https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css' />
            <title>Securonix Risk Assessment</title>
            <link rel='icon' href='/favicon.ico' />
        </Head>
        <Navbar />
        {children}
    </>
)

export default Layout;