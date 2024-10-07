import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { getProductosDestacados } from '../api'; // Asume que ya tienes una función para obtener productos destacados
import AddToCartButton from '../components/AddToCartButton'; // Importar el botón reutilizable

const HomeScreen = ({ addToCart }) => {
  const [productosDestacados, setProductosDestacados] = useState([]);
  const IMAGE_BASE_URL = 'http://192.168.2.10:3000';

  useEffect(() => {
    const fetchProductos = async () => {
      const data = await getProductosDestacados();
      setProductosDestacados(data);
    };
    fetchProductos();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={productosDestacados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            {item.imagenes && item.imagenes.length > 0 && (
              <Image 
                source={{ uri: `${IMAGE_BASE_URL}${item.imagenes[0].url}` }} 
                style={styles.productImage}
              />
            )}
            <Text style={styles.productName}>{item.nombre}</Text>
            <Text style={styles.productPrice}>${item.precio}</Text>

            {/* Usar el botón reutilizable */}
            <AddToCartButton product={item} addToCart={addToCart} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  productContainer: { margin: 10 },
  productImage: { width: 200, height: 200, resizeMode: 'cover' },
  productName: { textAlign: 'center', marginTop: 5 },
  productPrice: { textAlign: 'center', marginTop: 5, fontWeight: 'bold' },
});

export default HomeScreen;
