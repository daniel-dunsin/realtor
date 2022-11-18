import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { BiBath, BiBed, BiCheckShield, BiChevronLeft, BiChevronRight, BiShapeSquare } from "react-icons/bi";
import { fetchData } from '../../utils/fetchData';

const loader = ({ src }) => {
    return src;
}

export default function Property({ property }) {
    console.log(property)
    const {
        agency,
        area,
        baths,
        rooms,
        photos,
        coverPhoto,
        description,
        category,
        location,
        phoneNumber,
        price,
        purpose,
        title,
        type,
        isVerified
    } = property;

    // location is an array with items of id, name

    const [photoCount, setPhotoCount] = useState(0);

    const changePhoto = (typeOfOperation) => {
        if (typeOfOperation === "inc") {
            if (photoCount === 4) {
                setPhotoCount(0);
            } else {
                setPhotoCount(prev => prev + 1);
            }
        } else {
            if (photoCount === 0) {
                setPhotoCount(4);
            } else {
                setPhotoCount(prev => prev - 1)
            }
        }
    }

    return (
        <>
            <Head>
                <title>{agency?.name || "Realtor"} Property</title>
            </Head>
            <section className='py-8 max-w-[1200px] mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-4'>
                <div className='flex-[70%]'>
                    {/* images container */}
                    <div className='w-full max-w-[900px] max-h-[400px] relative carousel'>
                        <i className='absolute top-[50%] -left-[10px] -translate-y-[50%] bg-black w-[40px] h-[40px] text-white rounded-full z-[30] text-[30px] flex justify-center items-center' onClick={() => {
                            changePhoto("dec")
                        }}>
                            <BiChevronLeft />
                        </i>
                        <Image
                            loader={loader}
                            src={photos[photoCount]?.url || coverPhoto?.url}
                            unoptimized
                            blurDataURL={coverPhoto?.url}
                            width={"900"}
                            height={"400"}
                            objectFit={"cover"}
                            objectPosition={"center"}
                            alt={title}
                        />
                        <i className='absolute top-[50%] -right-[10px] -translate-y-[50%] bg-black w-[40px] h-[40px] text-white rounded-full z-[30] text-[30px] flex justify-center items-center' onClick={() => {
                            changePhoto("inc")
                        }}>
                            <BiChevronRight />
                        </i>
                    </div>
                    <header className="flex flex-row justify-between items-center gap-[4px] mb-2">
                        {isVerified && (
                            <i className="text-green-500">
                                <BiCheckShield />
                            </i>
                        )}
                        <h1 className="text-[20px] font-bold flex-1">
                            AED {price} {purpose == "for-rent" && `/${rentFrequency}`}
                        </h1>
                        <div className="w-[35px] h-[35px] border-2 hover:border-blue-500 rounded-full overflow-hidden">
                            <Image
                                loader={loader}
                                unoptimized
                                src={agency?.logo?.url}
                                width={"35"}
                                height={"35"}
                                alt={title}
                                objectFit={"cover"}
                                objectPosition={"center"}
                            />
                        </div>
                    </header>
                    <div className="flex flex-row gap-x-2 items-center text-blue-500">
                        <span className="flex flex-row gap-x-2 items-center cursor-pointer">
                            <p>{baths}</p>
                            <i>
                                <BiBath />
                            </i>
                            |
                        </span>
                        <span className="flex flex-row gap-x-2 items-center cursor-pointer">
                            <p>{rooms}</p>
                            <i>
                                <BiBed />
                            </i>
                            |
                        </span>
                        <span className="flex flex-row gap-x-2 items-center cursor-pointer">
                            <p>{area.toFixed(2)} sqft</p>
                            <i>
                                <BiShapeSquare />
                            </i>
                        </span>
                    </div>
                    <div className='my-4'>
                        <h1 className='text-black text-[22px] font-bold mb-2'>{title}</h1>
                        <p className='text-gray-700 text-[15px]'>{description}</p>
                    </div>
                    {/* other details */}
                    <div className='flex gap-4 flex-col lg:flex-row'>
                        <span className='flex w-full flex-1 justify-between text-[17px] uppercase'>
                            <h1 className='font-bold'>type:</h1>
                            <h1>{type}</h1>
                        </span>
                        <span className='flex w-full flex-1 justify-between text-[17px] uppercase'>
                            <h1 className='font-bold'>purpose:</h1>
                            <h1>{purpose}</h1>
                        </span>
                    </div>
                    {/* locations */}
                    <div>
                        <h1 className='text-[17px] font-bold mt-4 mb-3 uppercase'>Locations</h1>
                        <div className='flex flex-wrap gap-4'>
                            {
                                location.map((location) => (
                                    <span key={location?.id} className="p-2 rounded-md text-blue-600 bg-blue-100 cursor-pointer font-semibold">{location?.name}</span>
                                ))
                            }
                        </div>
                    </div>
                    {/* catrgory */}
                    <div>
                        <h1 className='text-[17px] font-bold mt-4 mb-3 uppercase'>Category</h1>
                        <div className='flex flex-wrap gap-4'>
                            {
                                category.map((category) => (
                                    <span key={category?.id} className="p-2 rounded-md text-blue-600 bg-blue-100 cursor-pointer font-semibold">{category?.name}</span>
                                ))
                            }
                        </div>
                    </div>
                </div>
                {/* contact agency */}
                <div className='flex-[30%]'>
                    <form className='border-2 rounded-md p-4'>
                        <div className='w-full flex justify-between items-center gap-x-2'>
                            {/* image container */}
                            <div className='border-2 hover:border-blue-700 w-[80px] h-[80px] overflow-hidden rounded-full'>
                                <Image
                                    src={agency?.logo?.url}
                                    alt={agency?.name}
                                    loader={loader}
                                    width={300}
                                    height={300}
                                    objectFit={"cover"}
                                    objectPosition={"center"}
                                />
                            </div>
                            <div className='flex flex-col gap-y-1'>
                                <h1 className='text-[16px] font-bold'>{agency?.name}</h1>
                                <p className='text-[13px]'>{phoneNumber?.mobile || phoneNumber?.phone}</p>
                            </div>
                        </div>
                        {/* inputs container */}
                        <div className='w-full flex flex-col gap-y-4 mt-12 mb-6 text-[15px]'>
                            <input type="text" placeholder='Enter Name...' className={styles.input} />
                            <input type="email" placeholder='Enter Email...' className={styles.input} />
                            <input type="number" placeholder="Enter Phone Number..." className={styles.input} />
                        </div>
                        <button className='w-full p-2 rounded-md bg-blue-600 text-white hover:bg-blue-700'>Contact Agency</button>
                    </form>
                </div>
            </section>
        </>
    )
}

const styles = {
    input: "border-2 focus:border-blue-600 outline-none p-2 rounded-md"
}

export const getServerSideProps = async (context) => {
    const { id } = context.params;
    const property = await fetchData(`/properties/detail?externalID=${id}`);
    return {
        props: {
            property
        }
    }
}