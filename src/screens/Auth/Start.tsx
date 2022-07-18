import React, { useCallback, memo, useRef, useState } from "react";
import Button from '../../components/Button'
import {
  FlatList,
  View,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Image,
  Text,
} from "react-native";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  slide: {
    height: windowHeight,
    width: windowWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  slideImage: { width: windowWidth , height: windowHeight * 0.9 },

  pagination: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },
  paginationDot: {
    width: 12,
    height: 12,
    borderRadius: 8,
    marginHorizontal: 2,
  },
  paginationDotActive: { backgroundColor: "#8edfa4" },
  paginationDotInactive: { backgroundColor: "#2a4876" },
  submitButton: {
    position: 'absolute',
    bottom: 50,
    borderRadius: 0,
    alignItems: "center",
  },
  carousel: { flex: 1 },
});

const slideList = [
  {
    id: 1,
    image: require("../../assets/1.png"),
  },
  {
    id: 2,
    image: require("../../assets/2.png"),
  },
  {
    id: 3,
    image: require("../../assets/3.png"),
  }
]

const Slide = memo<any>(function Slide({data, navigation}) {

  return (
    <ImageBackground
      source={require('../../assets/background_dot.png')}
      resizeMode="repeat"
    >
    <View style={styles.slide}>
    
      <Image source={data.image} style={styles.slideImage}></Image>
      { data.id == 3 ? <Button  style={styles.submitButton} onPress={() => navigation.navigate('ApplicationList')} mode="contained">Let's try out</Button> : <Text></Text> }
    </View>
    </ImageBackground>
  );
});

function Pagination({ index }) {
  return (
    <View style={styles.pagination} pointerEvents="none">
      {slideList.map((_, i) => {
        return (
          <View
            key={i}
            style={[
              styles.paginationDot,
              index === i
                ? styles.paginationDotActive
                : styles.paginationDotInactive,
            ]}
          />
        );
      })}
    </View>
  );
}

export default function Start({ navigation }) {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(index);
  indexRef.current = index;
  const onScroll = useCallback((event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);

    const distance = Math.abs(roundIndex - index);

    // Prevent one pixel triggering setIndex in the middle
    // of the transition. With this we have to scroll a bit
    // more to trigger the index change.
    const isNoMansLand = 0.4 < distance;

    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }
  }, []);

  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    keyExtractor: useCallback(s => String(s.id), []),
    getItemLayout: useCallback(
      (_, index) => ({
        index,
        length: windowWidth,
        offset: index * windowWidth,
      }),
      []
    ),
  };

  const renderItem = useCallback(function renderItem({ item }) {
    return <Slide data={item} navigation={navigation} />;
  }, []);

  return (
    <>
      <FlatList
        data={slideList}
        style={styles.carousel}
        renderItem={renderItem}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={onScroll}
        {...flatListOptimizationProps}
      />
      <Pagination index={index}></Pagination>
    </>
  );
}