import { View, Text, TouchableOpacity, Share, Alert, StyleSheet } from "react-native";
import { captureScreen } from "react-native-view-shot";
import { Linking } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function ShareButton({ quote, style}) {

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const captureAndShare = async () => {
        await delay(1000); // Wait for the screen to render
        try {
            
            const uri = await captureScreen({ format: "jpg", quality: 0.9 });

            console.log("Screenshot saved at:", uri);

            await Share.share({
                url: uri, // iOS
                message: `Check out this quote I got from Quotify! 

${quote.q} - ${quote.a}`, // Android
            });

        } catch (error) {
            console.error("Error capturing screenshot:", error);
            Alert.alert("Error", "Could not capture and share screenshot.");
        }
    };

    return (
            <TouchableOpacity style={style} onPress={captureAndShare}>
                <MaterialIcons name="share" size={24} color="white" />
            </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 300,
        height: 300,
        marginBottom: 10,
    },

    quotes: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.8,
        borderRadius: 10,
    },
    quoteText: {
        fontSize: 24,
        color: "white",
        marginBottom: 10,
    },
    authorText: {
        fontSize: 18,
        color: "white",
    },

});
