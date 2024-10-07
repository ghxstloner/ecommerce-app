import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CartScreen = ({ cartItems = [], updateCartItemQuantity, clearCart, removeItemFromCart }) => {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.precio * item.quantity, 0).toFixed(2);
  };

  const IMAGE_BASE_URL = 'http://192.168.2.10:3000';

  return (
    <View style={styles.container}>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                {/* Imagen del producto (si item.imagenes existe) */}
                {item.imagenes && item.imagenes.length > 0 && (
                  <Image source={{ uri: `${IMAGE_BASE_URL}${item.imagenes[0].url}` }} style={styles.productImage} />
                )}

                {/* Información del producto */}
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{item.nombre}</Text>
                  <Text style={styles.productPrice}>${item.precio}</Text>

                  {/* Controles de cantidad */}
                  <View style={styles.quantityContainer}>
                    {item.quantity === 1 ? (
                      <TouchableOpacity onPress={() => removeItemFromCart(item.id)}>
                        <Icon name="trash-outline" size={24} color="black" />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={() => updateCartItemQuantity(item.id, 'decrease')}>
                        <Text style={styles.button}>-</Text>
                      </TouchableOpacity>
                    )}

                    <Text style={styles.quantity}>{item.quantity}</Text>

                    <TouchableOpacity onPress={() => updateCartItemQuantity(item.id, 'increase')}>
                      <Text style={styles.button}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />

          {/* Total y botón de pagar */}
          <View style={styles.footer}>
            <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
            <TouchableOpacity style={styles.payButton} onPress={clearCart}>
              <Text style={styles.payButtonText}>Pagar</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text style={styles.emptyCartText}>Tu carrito está vacío</Text>
              )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  productInfo: {
    flex: 1,
    marginLeft: 15,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#000',
    color: '#fff',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantity: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 20,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  payButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  payButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyCartText: {
    fontSize: 20, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  
});

export default CartScreen;
