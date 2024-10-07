import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { getProductosDestacados } from '../api';
import AddToCartButton from '../components/AddToCartButton';

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
        numColumns={2}
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

            {/* Botón de agregar al carrito */}
            <AddToCartButton product={item} addToCart={addToCart} />
          </View>
        )}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 10,
  },
  flatListContent: {
    justifyContent: 'space-between',
  },
  productContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    flex: 1,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 5,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default HomeScreen;
