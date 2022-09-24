import { ReactFragment, useEffect, useState } from 'react'
// import reactLogo from '../assets/react.svg'
import axios from 'axios'
import '../App.css'
import { Link } from 'react-router-dom'

interface Rating {
    rate: number,
    count: number
}

interface Product {
    _id: string,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: Rating
}

export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);

    function getCatalog() {
        const options = {
            url: 'http://localhost:3000/catalog/',
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            }
        };
        axios(options)
            .then(response => {
                setProducts(response.data);
            });
    };

    useEffect(() => {
        getCatalog();
    }, [])

    function prepareSlug(product: Product) {
        const productNoSlash = product.title.replaceAll(/[^\w\s]/gi, '');
        const productNoSpace = productNoSlash.replaceAll(' ', '');
        const slug = `${productNoSpace}-${product._id}`
        return slug;
    }

    return (
        <div className="App">
            <h1>Barle - Catalog</h1>
            <div>
                <ul className='catalog-grid'>
                    {products.map((product) => (
                        <Link key={product._id} to={'/product/'+prepareSlug(product)}>
                            <li className="card">
                                <img src={product.image} className="logo" alt={product.title} />
                                <div>
                                    <h2>{product.title}</h2>
                                    <span>{product.description}</span>
                                    <h3>R$ {product.price.toString().replace('.', ',')}</h3>
                                </div>
                            </li>
                        </Link>

                    ))}
                </ul>
            </div>
        </div>
    )
}
