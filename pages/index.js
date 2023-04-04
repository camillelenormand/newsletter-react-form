import Head from 'next/head'
import ContactForm from '../components/ContactForm'
import Title from '../components/Title'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>Dileur Newsletter form</title>
        <meta name="description" content="Dileur contact form" />
        <link rel="icon" href="/dileur_white.png" />
      </Head>
        <Header />
        <Title />
        <ContactForm />
        <Footer />
    </>
  )
}
