import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AddToCartButton = ({ product, addToCart }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(-100))[0]; // Inicializamos el modal fuera de la pantalla

  const handleAddToCart = (product) => {
    addToCart(product);
    setModalVisible(true);

    // Animamos la entrada del "modal" hacia abajo
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      // Ocultamos el "modal" después de 2 segundos
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setModalVisible(false));
    }, 2000);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleAddToCart(product)}
      >
        <Text style={styles.addButtonText}>Agregar al carrito</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#000',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  toastContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginTop: 40,
    borderRadius: 5,
    elevation: 5,
    zIndex: 1000, // Aseguramos que esté por encima de otros elementos
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  toastText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default AddToCartButton;
