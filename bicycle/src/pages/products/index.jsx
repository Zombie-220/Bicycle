import { useEffect, useState } from "react";
import { CreateProduct } from "./CreateProduct";
import { getProducts } from "../../requests/products";
import { CardProduct } from "../../components/CardPoduct";
import { removeOneProduct } from "../../requests/products";
import { EditProduct } from "./EditProduct";

import "./style.scss";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isEdit, setIsEdit] = useState({ status: false, id: null });

  const addProduct = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    getProducts()
      .then(({ data }) => {
        setProducts(data.map((elem) => ({ ...elem, price: 10 })));
      })
      .catch(() => null);
  }, []);

  const removeProduct = (id) => {
    removeOneProduct(id)
      .then(({}) => {
        setProducts((prevValue) =>
          prevValue.filter((product) => product.id !== id)
        );
      })
      .catch(() => alert("Ошибка"));
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="auth__headerBackground" />
      <div className="test1">
        <button onClick={addProduct}>Добавить продукт</button>
        <span style={{ marginLeft: 16, fontSize: 20, fontWeight: 600 }}>
          {products.length}
        </span>
        <div style={{ display: "flex", gap: 8, margin: "40px 20px" }}>
          {products.map((product) => (
            <CardProduct
              {...product}
              key={product.id}
              name={product.title}
              price={product.price}
              onRemove={removeProduct}
              onEdit={setIsEdit}
            />
          ))}
        </div>
        <CreateProduct
          setProducts={setProducts}
          onCloseModal={onCloseModal}
          isModalOpen={isModalOpen}
        />
        {isEdit.status && (
          <EditProduct
            setProducts={setProducts}
            onCloseModal={setIsEdit}
            isModalOpen={isEdit.status}
            initialValues={
              products.filter((product) => product.id === isEdit.id)[0]
            }
            setIsEdit={setIsEdit}
            id={isEdit.id}
          />
        )}
      </div>
    </div>
  );
};
