import { useState } from "react";
import Product from "../components/Product";
import Button from "../components/Button";
import { MdAdd, MdClose, MdRemove, MdShoppingCart } from "react-icons/md";
import IconButton from "../components/IconButton";

const productsSample = [
  {
    id: 1,
    name: "MacBook Air 15”",
    image: "/macbook_air_15.jpg",
    price: 26999999,
    category: "Laptop",
  },
  {
    id: 2,
    name: "iPhone 14 Pro",
    image: "/iphone_14_pro.jpg",
    price: 19999999,
    category: "Smartphone",
  },
  {
    id: 3,
    name: "iPhone 14",
    image: "/iphone_14.jpg",
    price: 15999999,
    category: "Smartphone",
  },
  {
    id: 4,
    name: "Apple Vision Pro",
    image: "/apple_vision_pro.jpg",
    price: 66999999,
    category: "Headset",
  },
  {
    id: 5,
    name: "Apple Watch Series 8",
    image: "apple_watch_series_8.jpg",
    price: 7999999,
    category: "Watch",
  },
  {
    id: 6,
    name: "iPad Pro",
    image: "/ipad_pro.jpg",
    price: 15999999,
    category: "Tablet",
  },
];

export default function Home() {
  const [products, setProducts] = useState(
    productsSample.reduce(
      (a, p) => [...a, { ...p, id: p.id + productsSample.length - 1 }],
      productsSample
    )
  );
  const [idSquence, setIdSequence] = useState(products.length);
  const [keyword, setKeyword] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [category, setCategory] = useState("Semua");
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [editedProduct, setEditedProduct] = useState();
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [productsPerPage, setProductsPerPage] = useState(4);

  const filteredSortedProducts = products
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortBy] < b[sortBy] ? -1 : 1;
      } else {
        return a[sortBy] > b[sortBy] ? -1 : 1;
      }
    })
    .filter(
      (product) =>
        product.name.toLowerCase().includes(keyword) &&
        product.price >= minPrice &&
        product.price <= maxPrice &&
        (category === "Semua" || product.category === category)
    );

  return (
    <div className="products">
      <header>
        <Button onClick={() => setEditedProduct({})}>
          <MdAdd />
          Buat
        </Button>
        <label>
          Cari:
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </label>
        <section>
          Harga:
          <label>
            Minimal:
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </label>
          <label>
            Maksimal:
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value || Infinity)}
            />
          </label>
        </section>
        <label>
          Kategori:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Semua</option>
            <option>Laptop</option>
            <option>Smartphone</option>
            <option>Headset</option>
            <option>Watch</option>
          </select>
        </label>
        <section>
          Urutkan:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="id">Normal</option>
            <option value="name">Nama</option>
            <option value="price">Harga</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Naik</option>
            <option value="desc">Turun</option>
          </select>
        </section>
        <Button onClick={() => setIsCartOpen(true)}>
          <MdShoppingCart />
          {cart.reduce((a, p) => a + p.count, 0)}
        </Button>
      </header>
      <main>
        {filteredSortedProducts.length > 0
          ? filteredSortedProducts
              .filter(
                (_product, i) =>
                  i >= productsPerPage * page - productsPerPage &&
                  i < productsPerPage * page
              )
              .map((product, i) => (
                <Product
                  key={i}
                  {...product}
                  onAddToCart={() => {
                    if (cart.find((p) => p.id === product.id)) {
                      setCart(
                        cart.map((p) =>
                          p.id === product.id
                            ? {
                                ...p,
                                count: p.count + 1,
                              }
                            : p
                        )
                      );
                    } else {
                      setCart([...cart, { ...product, count: 1 }]);
                    }
                  }}
                  onEdit={() => setEditedProduct(product)}
                  onDelete={() => {
                    if (
                      confirm(
                        `Apakah Anda yakin ingin menghapus produk ini (${product.name})?`
                      )
                    ) {
                      setProducts(products.filter((p) => p.id !== product.id));
                    }
                  }}
                />
              ))
          : "Tidak ada produk ditemukan."}
      </main>
      <footer>
        <label>
          Produk per halaman:
          <input
            type="number"
            value={productsPerPage}
            onChange={(e) => setProductsPerPage(parseInt(e.target.value))}
          />
        </label>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Sebelumnya
        </Button>
        {filteredSortedProducts
          .filter((_product, i) => i % productsPerPage === 0)
          .map((_product, i) => (
            <button
              key={i}
              className="page-number"
              onClick={() => setPage(i + 1)}
              disabled={i + 1 === page}
            >
              {i + 1}
            </button>
          ))}
        <Button
          onClick={() => setPage(page + 1)}
          disabled={
            page === Math.ceil(filteredSortedProducts.length / productsPerPage)
          }
        >
          Berikutnya
        </Button>
      </footer>
      {isCartOpen && (
        <div className="card dialog">
          <IconButton variant="tonal" onClick={() => setIsCartOpen(false)}>
            <MdClose />
          </IconButton>
          <h1>Keranjang</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama</th>
                <th>Jumlah</th>
                <th>Tindakan</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.count.toLocaleString()}</td>
                  <td>
                    <IconButton
                      onClick={() => {
                        if (product.count > 1) {
                          setCart(
                            cart.map((p) =>
                              p.id === product.id
                                ? { ...p, count: p.count - 1 }
                                : p
                            )
                          );
                        } else {
                          setCart(cart.filter((p) => p.id !== product.id));
                        }
                      }}
                      title="Kurangi"
                    >
                      <MdRemove />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setCart(
                          cart.map((p) =>
                            p.id === product.id
                              ? { ...p, count: p.count + 1 }
                              : p
                          )
                        );
                      }}
                      title="Tambah"
                    >
                      <MdAdd />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            Total bayar:{" "}
            {cart
              .reduce((a, p) => a + p.price * p.count, 0)
              .toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0,
              })}
          </div>
        </div>
      )}
      {editedProduct && (
        <form
          className="dialog"
          onSubmit={(e) => {
            e.preventDefault();
            if (editedProduct.id) {
              setProducts(
                products.map((product) =>
                  product.id === editedProduct.id ? editedProduct : product
                )
              );
            } else {
              setProducts([...products, { ...editedProduct, id: idSquence }]);
              setIdSequence(idSquence + 1);
            }
            setEditedProduct(undefined);
          }}
        >
          <h1>{editedProduct.id ? "Edit" : "Buat"} Produk</h1>
          <label>
            Nama
            <input
              type="text"
              value={editedProduct.name}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, name: e.target.value })
              }
              autoFocus
            />
          </label>
          <label>
            Harga
            <input
              type="number"
              value={editedProduct.price}
              onChange={(e) =>
                setEditedProduct({
                  ...editedProduct,
                  price: parseInt(e.target.value),
                })
              }
            />
          </label>
          <label>
            Gambar
            <input
              type="text"
              value={editedProduct.image}
              onChange={(e) =>
                setEditedProduct({
                  ...editedProduct,
                  image: e.target.value,
                })
              }
            />
          </label>
          <label>
            Kategori
            <select
              value={editedProduct.category}
              onChange={(e) =>
                setEditedProduct({
                  ...editedProduct,
                  category: e.target.value,
                })
              }
            >
              <option>Semua</option>
              <option>Laptop</option>
              <option>Smartphone</option>
              <option>Headset</option>
              <option>Watch</option>
            </select>
          </label>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              type="reset"
              variant="tonal"
              onClick={() => setEditedProduct(undefined)}
            >
              Batal
            </Button>
            <Button>Simpan</Button>
          </div>
        </form>
      )}
    </div>
  );
}
