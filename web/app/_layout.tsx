import { BlurView } from 'expo-blur';
import { Slot } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

export default function RootLayout() {
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 3. Start your custom fade-out animation
    Animated.sequence([
      Animated.delay(2000), // Keep overlay visible for 2 seconds
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true, // Note: On web, useNativeDriver doesn't matter much, but good practice
      }),
    ]).start(() => {
      setIsOverlayVisible(false); // Unmount when done
    });
  }, []);


  return (
    <View style={{ flex: 1 }}>
      <Slot />

      {isOverlayVisible && (
        <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
          {/* High intensity blur for the frosted effect */}
          <BlurView intensity={80} style={StyleSheet.absoluteFill} tint="dark">
             <View style={styles.centered}>
                <Text style={{color: 'white', fontSize: 24}}>Welcome</Text>
             </View>
          </BlurView>
        </Animated.View>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100, // Make sure this is high enough to sit on top
    backgroundColor: 'rgba(0,0,0,0.1)', // Slight dark tint base
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});