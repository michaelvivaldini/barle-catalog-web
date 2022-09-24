import { ReactFragment, useEffect, useState } from 'react'
import '../App.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

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

export default function Product() {
    let { slug } = useParams();
    const [product, setProduct] = useState<Product>({} as Product);

    function getProduct() {
        const options = {
            url: 'http://localhost:3000/catalog/product/'+slug,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            }
        };
        axios(options)
            .then(response => {
                setProduct(response.data);
            });
    };

    useEffect(() => {
        getProduct();
    }, [])

    function fixedPrice(price: number){
        if(!price) return '';
        const priceString = price.toString();
        return priceString.replace('.', ',');
    }

    return (
        <div className="App">
            <h1>Barle</h1>
            <div>
                <ul className='catalog-grid'>
                    <li className="card">
                        <img src={product.image} className="logo" alt={product.title} />
                        <div>
                            <h2>{product.title}</h2>
                            <span>{product.description}</span>
                            <h3>R$ {`${product?.price}`.toString().replace('.', ',')}</h3>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}
