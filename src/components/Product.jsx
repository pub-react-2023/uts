import { MdAddShoppingCart, MdDelete, MdEdit } from "react-icons/md";
import IconButton from "./IconButton";

export default function Product({
  name,
  image,
  price,
  category,
  onAddToCart,
  onEdit,
  onDelete,
}) {
  return (
    <div className="product">
      <img src={image} alt={name} />
      <section>
        <h2>{name}</h2>
        <p>
          {price.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
          })}{" "}
          ({category})
        </p>
        <div>
          <IconButton onClick={onAddToCart} title="Tambahkan ke keranjang">
            <MdAddShoppingCart />
          </IconButton>
          <IconButton variant="tonal" onClick={onEdit} title="Edit">
            <MdEdit />
          </IconButton>
          <IconButton variant="tonal" onClick={onDelete} title="Hapus">
            <MdDelete />
          </IconButton>
        </div>
      </section>
    </div>
  );
}
