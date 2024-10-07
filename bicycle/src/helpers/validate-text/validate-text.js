export const getTextError = (type) => {
  switch (type) {
    case "required": return "Поле обязательное для заполнения";
    default: return `${type} - ошибка`;
  }
};
