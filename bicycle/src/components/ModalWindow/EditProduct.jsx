import { useForm } from "react-hook-form";
import { ValidateInput } from "../ValidateInput";
import ReactModal from "react-modal";
import { editNewItems } from "../../requests/request";
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

export const EditProduct = (props) => {
  const {
    isModalOpen,
    onCloseModal,
    setProducts,
    id,
    initialValues,
    setIsEdit,
  } = props;
  const [errorForm, setErrorForm] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    defaultValues: initialValues,
  });

  const onSubmit = (data) => {
    editNewItems({ ...data, id })
      .then(({ data }) => {
        setProducts((prevValue) => [
          ...prevValue.map((product) => {
            if (product.id === id) {
              return { ...data, id };
            } else {
              return product;
            }
          }),
        ]);
        onCloseModal({ status: false, id: null });
      }).catch(() => setErrorForm(true));
  };

  console.log(initialValues);
  return (
    <ReactModal isOpen={isModalOpen} style={customStyles}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <button
            onClick={() => {
              onCloseModal({ status: false, id: null });
              setErrorForm(false);
            }}
          >
            close
          </button>
        </div>
        <div>
          {errorForm ? (
            <div>Произошла ошибка изменения</div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ValidateInput
                register={register}
                name={"name"}
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
              <button>Изменить продукт</button>
            </form>
          )}
        </div>
      </div>
    </ReactModal>
  );
};
