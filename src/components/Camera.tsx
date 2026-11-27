
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import {
    Button,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    Pressable
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Camera() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [picture, setPicture] = useState<any>(null);

    const camera = useRef<CameraView>(null);

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>
                    We need your permission to show the camera
                </Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    const takePicture = async () => {
        const options = {
            base64: true,
            exif: true,
            quality: 1
        };

        const pic = await camera.current?.takePictureAsync(options);
        setPicture(pic);
    };

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const sendPic = () => {
        console.log(picture.base64);
    };

    if (picture) {
        return (
            <View>
                <Image
                    source={{ uri: 'data:image/jpg;base64,' + picture.base64 }}
                    style={{ width: 300, height: 400 }}
                />

                <Pressable onPress={() => sendPic()}>
                    <MaterialIcons name="send" size={30} />
                </Pressable>

                <Pressable onPress={() => setPicture(null)}>
                    <Text>Retake Picture</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                facing={facing}
                ref={camera}
            />

            <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={toggleCameraFacing}>
                    <Text style={styles.text}>Flip Camera</Text>
                </Pressable>

                <View>
                    <Pressable onPress={() => takePicture()}>
                        <Text style={styles.text}>Take Picture</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 64,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        width: '100%',
        paddingHorizontal: 64,
    },
    button: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});
