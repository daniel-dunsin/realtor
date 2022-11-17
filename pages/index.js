import Head from 'next/head'
import Image from 'next/image'
import { Banner } from '../components/banner'
import { Property } from '../components/property'
import styles from '../styles/Home.module.css'
import { fetchData } from '../utils/fetchData'

export default function Home({ propertiesForRent, propertiesForSale }) {
  return (
    <>
      <Head>
        <title>
          Realtor
        </title>
      </Head>
      <main className='bg-white pt-5 w-full max-w-[1200px] mx-auto'>
        <Banner image="/images/home1.png" subtitle="rent a home" title="Rental Homes for Everyone" description="Explore from apartments, builder floors, villas and more" buttonText="Explore Renting" />

        <section className='flex flex-col md:flex-row flex-wrap gap-4 justify-between px-4'>
          {propertiesForRent?.map((property, index) => {
            return <Property key={index} {...property} />
          })}
        </section>

        <Banner image="/images/home2.png" subtitle="buy a home" title="Find, Buy & Own Your Dream Home" description="Explore from apartments, builder floors, villas and more" buttonText="Explore Buying" />

        <section className='flex flex-col md:flex-row flex-wrap gap-4 justify-between px-4'>
          {
            propertiesForSale?.map((property, index) => {
              return <Property key={index} {...property} />
            })
          }
        </section>
      </main>
    </>
  )
}


export async function getStaticProps() {
  const propertiesForSale = await fetchData("/properties/list?locationExternalIDs=5002%2C6020&purpose=for-sale&hitsPerPage=6");
  const propertiesForRent = await fetchData("/properties/list?locationExternalIDs=5002%2C6020&purpose=for-rent&hitsPerPage=6")
  return {
    props: {
      propertiesForSale: propertiesForSale?.hits,
      propertiesForRent: propertiesForRent?.hits
    }
  }
}
