import React, { useState } from 'react'
import { urlFor, client } from '../../lib/client'
import {
	AiOutlineMinus, AiOutlinePlus,
	AiFillStar, AiOutlineStar
} from 'react-icons/ai'

import Product from './../../components/Product';


export default function ProductDetails({ product,
	products }) {
	const [index, setIndex] = useState(0)
	const { image, name, details, price } = product;
	return (
		<div>
			<div className='product-detail-container'>
				<div>
					<div className='image-container'>
						<img src={urlFor(image && image[index])}
						 className="product-detail-image"  alt="big image" />
					</div>
					<div className='small-images-container'>
						{image?.map((item, i) => (
							<img src={urlFor(item)} alt=""
								className={i === index ? 'small-image selected-image' : 'small-image'}
								onMouseEnter={() => setIndex(i)}

							/>
						))}
					</div>
				</div>
				<div className='product-detail-desc'>
					<h1>{name}</h1>
					<div className='reviews'>
						<div>
							<AiFillStar />
							<AiFillStar />
							<AiFillStar />
							<AiFillStar />
							<AiOutlineStar />
						</div>
						<p>(20)</p>
					</div>
					<h4>Details:</h4>
					<p>{details}</p>
					<p className='price'>${price}</p>
					<div className='quantity'>
						<h3>Quantity:</h3>
						<p className='quantity-desc'>
							<span className='minus' onClick="">
								<AiOutlineMinus />
							</span>
							<span className='num' onClick="">
								0
							</span>
							<span className='plus' onClick="">
								<AiOutlinePlus />
							</span>
						</p>
					</div>
					<div className="buttons">
						<button type='button' onClick="" className='add-to-cart'>Add To Cart</button>
						<button type='button' onClick="" className='buy-now'>Add To Cart</button>
					</div>
				</div>
			</div>
			<div className='maylike-products-wrapper'>
				<h2>You may also like</h2>
				<div className='marquee'>
					<div className='maylike-products-container track'>
						{
							products.map(item => (
								<Product product={item} key={item._id} />
							))
						}
					</div>
				</div>
			</div>
		</div>
	)
}


export async function getStaticPaths() {
	const query = `*[_type == "product"]{
		slug{
			current
		}
	}`;

	const products = await client.fetch(query)

	const paths = products.map(product => ({
		params: {
			slug: product.slug.current
		}
	}))

	return {
		paths,
		fallback: 'blocking',
	}
}

export async function getStaticProps({ params: { slug } }) {
	const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
	const productQuery = '*[_type == "product"]'
	const product = await client.fetch(query)
	const products = await client.fetch(productQuery)
	return {
		props: {
			product,
			products

		}
	};
}
