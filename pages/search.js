import Head from 'next/head';
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { FilterItems } from '../components/filterItems';
import { Property } from '../components/property';
import { fetchData } from '../utils/fetchData';

export default function Search({ properties }) {
    const [openFilter, setOpenFilter] = useState(false);
    const { query } = useRouter();
    return (
        <>
            <Head>
                <title>Realtor Properties</title>
            </Head>
            <main className='w-full max-w-[1280px] px-4 py-8 md:px-6'>
                <div className='bg-blue-50 py-2'>
                    <div className='w-full flex justify-center items-center cursor-pointer gap-x-2' onClick={() => {
                        setOpenFilter(prev => !prev)
                    }}>
                        <h1>Search Properties by filter</h1>
                        <i className='text-[22px]'>{
                            openFilter ? <BiChevronUp /> : <BiChevronDown />
                        }</i>
                    </div>
                    {openFilter && <FilterItems />}
                </div>
                <h1 className='text-[24px] font-bold'>Properties {query?.purpose?.split("-")?.join(" ")}</h1>
                <section className='flex flex-col md:flex-row flex-wrap gap-4 justify-between px-4'>
                    {properties.map((properties, index) => {
                        return <Property key={index} {...properties} />
                    })}
                </section>
            </main>
        </>
    )
};

export const getServerSideProps = async ({ query }) => {
    const purpose = query.purpose || 'for-rent';
    const sort = query.sort || 'price-desc';
    const rentFrequency = query.rentFrequency || 'monthly';
    const categoryExternalID = query.categoryExternalID || "4";
    const priceMin = query.priceMin || "0";


    const properties = await fetchData(`/properties/list?locationExternalIDs=5002%2C6020&hitsPerPage=18&purpose=${purpose}&sort=${sort}&rentFrequency=${rentFrequency}&categoryExternalID=${categoryExternalID}&priceMin=${priceMin}`);

    return {
        props: {
            properties: properties?.hits
        }
    }
}

