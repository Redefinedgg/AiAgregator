import COLUMN_WIDTH_MAP from "@/shared/constants/COLUMN_WIDTH_MAP";

const getColumnWidth = (columnsCount: number): string => {
  return COLUMN_WIDTH_MAP[columnsCount as keyof typeof COLUMN_WIDTH_MAP] || "w-1/6";
};

export default getColumnWidth;
