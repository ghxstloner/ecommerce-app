import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text, Animated, StyleSheet, Modal, TouchableOpacity } from 'react-native'; // Incluimos Animated

import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import CategoryScreen from './screens/CategoryScreen';
import ProductScreen from './screens/ProductScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function CategoryStack({ addToCart }) {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Categories" 
        component={CategoryScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Products" 
        children={(props) => <ProductScreen {...props} addToCart={addToCart} />} 
        options={{ title: 'Productos' }} 
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [purchaseModalVisible, setPurchaseModalVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(-100))[0]; // Controlamos el modal con Animated

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find(item => item.id === product.id);
      if (itemExists) {
        return prevItems.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });

    // Mostramos el modal cuando se agrega un producto
    setModalVisible(true);

    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setModalVisible(false));
    }, 2000);
  };

  // Función para eliminar un producto del carrito
  const removeItemFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== productId));
  };

  const updateCartItemQuantity = (productId, action) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: action === 'increase' ? item.quantity + 1 : Math.max(item.quantity - 1, 1),
            }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setPurchaseModalVisible(true); // Mostrar el modal de confirmación de compra
    setTimeout(() => {
      setPurchaseModalVisible(false); // Ocultar el modal después de 2 segundos
    }, 2000);
  };

  // Función para contar la cantidad de productos en el carrito
  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'CategoryStackTab') {
                iconName = 'list'; 
              } else if (route.name === 'Cart') {
                iconName = 'cart';

                // Mostramos el ícono del carrito con la cantidad de productos en un círculo naranja
                return (
                  <View>
                    <Icon name={iconName} size={size} color={color} />
                    {getTotalItems() > 0 && (
                      <View style={styles.cartBadge}>
                        <Text style={styles.cartBadgeText}>{getTotalItems()}</Text>
                      </View>
                    )}
                  </View>
                );
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#000000',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen 
            name="Home" 
            options={{ title: 'Inicio' }}
          >
            {() => <HomeScreen addToCart={addToCart} />}
          </Tab.Screen>

          <Tab.Screen 
            name="CategoryStackTab" 
            options={{ title: 'Categorías' }}
          >
            {() => <CategoryStack addToCart={addToCart} />}
          </Tab.Screen>

          <Tab.Screen 
            name="Cart" 
            options={{ title: 'Carrito' }}
          >
            {() => (
              <CartScreen 
                cartItems={cartItems} 
                updateCartItemQuantity={updateCartItemQuantity} 
                removeItemFromCart={removeItemFromCart}
                clearCart={clearCart} 
              />
            )}
          </Tab.Screen>
        </Tab.Navigator>

        {/* Modal para la confirmación de compra */}
        <Modal
          transparent={true}
          visible={purchaseModalVisible}
          animationType="slide"
          onRequestClose={() => setPurchaseModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Icon name="checkmark-circle" size={50} color="green" />
              <Text style={styles.modalText}>¡Compra realizada con éxito!</Text>
              <TouchableOpacity onPress={() => setPurchaseModalVisible(false)}>
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal de confirmación de producto agregado */}
        {modalVisible && (
          <Animated.View style={[styles.toastContainer, { transform: [{ translateY: slideAnim }] }]}>
            <Icon name="checkmark-circle" size={24} color="green" />
            <Text style={styles.toastText}>Producto agregado satisfactoriamente</Text>
          </Animated.View>
        )}
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
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
    zIndex: 1000,
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
  cartBadge: {
    position: 'absolute',
    right: -10,
    top: -5,
    backgroundColor: 'orange',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  closeButtonText: {
    marginTop: 15,
    fontSize: 16,
    color: 'blue',
  },
});
