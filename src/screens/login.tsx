import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { saveToken } from "../store/user/userSlice";
import { useAppDispatch } from "../store/hooks.tsx";
import auth from "@react-native-firebase/auth";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { googleLogin } from "../store/user/userActions";
import AppIcon from "../components/app-icon/app-icon";
import { IconNames } from "../components/app-icon/app-icon.data";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  // Configure Google Sign-In on mount
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "572081542122-il9eh37i24gtv2l8jugrvimssq8gv6vl.apps.googleusercontent.com", // Use the web client ID from your google-services.json
      offlineAccess: true, // If you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: "", // specifies a hosted domain restriction
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      accountName: "", // [Android] specifies an account name on the device that should be used
    });
  }, []);

  const signInWithGoogle = async () => {
    try {
      // Check if Google Play Services are available
      await GoogleSignin.hasPlayServices();

      // Get the user's ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const userCredential = await auth().signInWithCredential(
        googleCredential
      );
      const user = userCredential.user;

      console.log("Firebase User:", user);

      // Prepare the form data for your backend
      const formData = new FormData();
      formData.append("email", user.email || "");
      formData.append("name", user.displayName || "");
      formData.append("gid", user.uid);

      // Dispatch the login action with the form data
      const res = await dispatch(googleLogin(formData)).unwrap();
      if (res?.status) {
        navigation.navigate("MainDrawer");
      }
    } catch (error) {
      console.error("Google Sign-In Error: ", error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("User cancelled the sign-in process");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Sign-in is in progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Google Play services not available");
      } else {
        console.error("Unknown error:", error);
      }
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/backgroundimg.png")}
      style={styles.backgroundimg}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Let's login to explore continues</Text>

        <Image
          source={require("../assets/logo/logo.png")}
          style={styles.logo}
        />

        <TouchableOpacity
          style={{ marginBottom: 22 }}
          onPress={signInWithGoogle}
        >
          <AppIcon icon={IconNames.GOOGLE_LOGIN} size={20} />
        </TouchableOpacity>

        {Platform.OS === "ios" && (
          <TouchableOpacity
            onPress={() => {
              /* Implement Apple login logic here if needed */
            }}
            style={{ marginBottom: 22 }}
          >
            <AppIcon icon={IconNames.APPLE_LOGIN} size={20} />
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundimg: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "red",
  },
  logo: {
    width: 255.83,
    height: 50.31,
    marginVertical: 33,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: "gray",
  },
});
