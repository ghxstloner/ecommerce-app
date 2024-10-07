import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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
    alert("Compra satisfactoria ¡Disfruta!");
  };

  return (
    <NavigationContainer>
      <Tab.Navigator>
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
              clearCart={clearCart} 
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
