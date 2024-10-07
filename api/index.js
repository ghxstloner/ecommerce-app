import { NEXT_PUBLIC_API_URL } from '@env';
import axios from 'axios';

const URL = `http://192.168.2.10:3000/api/e071cefb-046a-40f9-98c2-be86dfe07252`;

console.log("API URL: ", URL);

// Obtener banner
export const getBanners = async (id) => {
  try {
    const response = await axios.get(`${URL}/banners/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener banners:", error);
    return null;
  }
};

// Obtener productos destacados
export const getProductosDestacados = async () => {
  try {
    const response = await axios.get(`${URL}/productos?esDestacado=true`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener productos destacados:", error);
    return null;
  }
};

// Obtener todas las categorías
export const getCategorias = async () => {
  try {
    const response = await axios.get(`${URL}/categorias`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    return null;
  }
};

// Obtener una categoría específica por ID
export const getCategoria = async (id) => {
  try {
    const response = await axios.get(`${URL}/categorias/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener categoría ${id}:`, error);
    return null;
  }
};

// Obtener todos los colores
export const getColores = async () => {
  try {
    const response = await axios.get(`${URL}/colores`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener colores:", error);
    return null;
  }
};

// Obtener un producto específico por ID
export const getProductos = async (id) => {
  try {
    const response = await axios.get(`${URL}/productos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener producto ${id}:`, error);
    return null;
  }
};

// Obtener productos por categoría
export const getProductosPorCategoria = async (categoryId) => {
  try {
    const response = await axios.get(`${URL}/productos?categoriaId=${categoryId}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener productos de la categoría ${categoryId}:`, error);
    return null;
  }
};
