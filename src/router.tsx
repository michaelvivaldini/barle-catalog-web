import {
    BrowserRouter,
    Route,
    Link,
    Routes,
} from "react-router-dom";
import Catalog from "./catalog/catalog";
import Product from "./product/product";

export default function Router() {
    return (
        <BrowserRouter>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/catalog">Catalog</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route element={<h1>Berle</h1>} path="/" />
                    <Route element={<Catalog />} path="/catalog" />
                    <Route element={<Product />} path="/product/:slug" />
                </Routes>

            </div>
        </BrowserRouter>
    );
}