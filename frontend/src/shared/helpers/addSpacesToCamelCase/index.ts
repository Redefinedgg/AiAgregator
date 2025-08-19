export const addSpacesToCamelCase = (str: string) => {
    return str
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Добавляет пробел перед заглавной буквой
      .replace(/^./, str[0].toUpperCase()); // Делает первую букву заглавной
};