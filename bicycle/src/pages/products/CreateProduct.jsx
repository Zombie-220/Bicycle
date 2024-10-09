import { useForm } from "react-hook-form";
import { ValidateInput } from "../../components/ValidateInput";
import ReactModal from "react-modal";
import { addedProducts } from "../../requests/products";
import { useState } from "react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: 400,
  },
};

export const CreateProduct = (props) => {
  const { isModalOpen, onCloseModal, setProducts } = props;
  const [errorForm, setErrorForm] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const onSubmit = (data) => {
    addedProducts(data)
      .then(({ data }) => {
        setProducts((prev) => [...prev, { ...data, title: data.title }]);
        onCloseModal();
      })
      .catch(() => setErrorForm(true));
  };

  return (
    <ReactModal isOpen={isModalOpen} style={customStyles}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <button
            onClick={() => {
              onCloseModal();
              setErrorForm(false);
            }}
          >
            close
          </button>
        </div>
        <div>
          {errorForm ? (
            <div>Произошла ощибка добавления</div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ValidateInput
                register={register}
                name={"title"}
                label={"Наименование"}
                validate={{ required: true }}
                errors={errors}
              />
              <ValidateInput
                register={register}
                errors={errors}
                name={"price"}
                label={"Цена"}
                validate={{ required: true }}
              />
              <button>Добавить продукт</button>
            </form>
          )}
        </div>
      </div>
    </ReactModal>
  );
};
