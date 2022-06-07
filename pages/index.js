import React from 'react';
import { client } from '../lib/client'
import { Product, HeroBanner, FooterBanner } from '../components';


export async function getServerSideProps() {
  const query = '*[_type == "product"]'
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerQuery);


  return {
    props: {
      products,
      bannerData
    }
  };
}



export default function Home({ products, bannerData }) {
  return (
    <>
      <HeroBanner data={bannerData.length && bannerData[0]} />

      <div className="products-heading">
        <h2>Beset Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products?.map(
          product => <Product key={product._id} product={product} />
        )}
      </div>

      <FooterBanner />
    </>
  )
}
