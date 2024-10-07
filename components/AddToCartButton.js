import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const AddToCartButton = ({ product, addToCart }) => {
  return (
    <TouchableOpacity
      style={styles.addButton}
      onPress={() => addToCart(product)}
    >
      <Text style={styles.addButtonText}>Agregar al carrito</Text>
    </TouchableOpacity>
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
});

export default AddToCartButton;
