import { useCallback } from "react";

export const CardProduct = (props) => {
  const { name, price, id, onRemove, onEdit } = props;

  const removeProduct = useCallback(() => {
    onRemove(id);
  }, [id, onRemove]);

  const editProduct = useCallback(() => {
    onEdit({ status: true, id });
  }, [id, onEdit]);

  return (
    <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
      <div style={{ height: 100, background: "red" }}>Logo</div>
      <div style={{ padding: 16, background: "green" }}>
        <div style={{ color: "white" }}>{name}</div>
        <div style={{ color: "white" }}>{price} $</div>
      </div>
      <div style={{ display: "flex" }}>
        <button
          style={{
            background: "red",
            color: "white",
            flex: 1,
            cursor: "pointer",
          }}
          onClick={removeProduct}
        >
          Удалить
        </button>
        <button
          style={{
            background: "blue",
            color: "white",
            flex: 1,
            fontSize: 16,
            padding: 8,
            cursor: "pointer",
          }}
          onClick={editProduct}
        >
          Изменить
        </button>
      </div>
    </div>
  );
};
