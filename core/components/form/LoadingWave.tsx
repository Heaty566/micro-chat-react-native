import * as React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { theme } from '../../styles/index';

interface LoadingWaveProps {
    height?: number;
    width?: number;
    color?: string;
}

export const LoadingWave: React.FC<LoadingWaveProps> = ({ height = theme.gutter * 10, width = theme.gutter * 2, color = '#F37124' }) => {
    const [scaleFirst] = React.useState(new Animated.Value(0.5));
    const [scaleSecond] = React.useState(new Animated.Value(1));
    const animationTime = React.useRef(300);

    const loading = StyleSheet.create({
        item: {
            width,
            height,
            marginHorizontal: theme.gutter,
            backgroundColor: color,
        },
        container: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
    });

    React.useEffect(() => {
        Animated.parallel([
            Animated.loop(
                Animated.sequence([
                    Animated.timing(scaleFirst, {
                        toValue: 1,
                        duration: animationTime.current,
                        useNativeDriver: true,
                    }),
                    Animated.timing(scaleFirst, {
                        toValue: 0.5,
                        duration: animationTime.current,
                        useNativeDriver: true,
                    }),
                ])
            ),
            Animated.loop(
                Animated.sequence([
                    Animated.timing(scaleSecond, {
                        toValue: 0.5,
                        duration: animationTime.current,
                        useNativeDriver: true,
                    }),
                    Animated.timing(scaleSecond, {
                        toValue: 1,
                        duration: animationTime.current,
                        useNativeDriver: true,
                    }),
                ])
            ),
        ]).start();
    }, [scaleFirst, scaleSecond]);

    return (
        <View style={loading.container}>
            <Animated.View style={{ transform: [{ scaleY: scaleFirst }] }}>
                <View style={{ ...loading.item }}></View>
            </Animated.View>
            <Animated.View style={{ transform: [{ scaleY: scaleSecond }] }}>
                <View style={loading.item}></View>
            </Animated.View>

            <Animated.View style={{ transform: [{ scaleY: scaleFirst }] }}>
                <View style={loading.item}></View>
            </Animated.View>
            <Animated.View style={{ transform: [{ scaleY: scaleSecond }] }}>
                <View style={loading.item}></View>
            </Animated.View>
            <Animated.View style={{ transform: [{ scaleY: scaleFirst }] }}>
                <View style={loading.item}></View>
            </Animated.View>
        </View>
    );
};
