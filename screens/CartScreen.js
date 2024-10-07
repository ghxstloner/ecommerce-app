import React from 'react';
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity } from 'react-native';

const CartScreen = ({ cartItems = [], updateCartItemQuantity, clearCart }) => {
  return (
    <View style={styles.container}>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()} // Asegúrate de usar un ID único
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Text>{item.nombre}</Text>
                <Text>${item.precio}</Text>
                <Text>Cantidad: {item.quantity}</Text>

                {/* Botones para aumentar o disminuir la cantidad */}
                <View style={styles.quantityButtons}>
                  <TouchableOpacity onPress={() => updateCartItemQuantity(item.id, 'decrease')}>
                    <Text style={styles.button}>-</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => updateCartItemQuantity(item.id, 'increase')}>
                    <Text style={styles.button}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          {/* Botón de Pagar */}
          <Button title="Pagar" onPress={clearCart} />
        </>
      ) : (
        <Text>Tu carrito está vacío</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cartItem: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
  },
  quantityButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  button: {
    fontSize: 20,
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
});

export default CartScreen;
