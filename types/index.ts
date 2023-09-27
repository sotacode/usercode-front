

export interface FormData {
    productName: string;
    category: string;
    price: string;
    notice: string;
    images: Array<{ title: string; file: File }>;
  }