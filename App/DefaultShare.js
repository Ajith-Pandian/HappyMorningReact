import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Share,
  TouchableOpacity,
  PermissionsAndroid,
  Platform
} from "react-native";
import RNFetchBlob from "react-native-fetch-blob";
import ShareImage from "react-native-share";

const share = () => {
  Share.share(
    {
      message: "This is a message to share",
      title: "Share Title"
    },
    { dialogTitle: "Dialog Title" }
  );
};
const PERMISSIONS = {
  CAMERA: { name: "Camera", permission: PermissionsAndroid.PERMISSIONS.CAMERA },
  READ_EXTERNAL_STORAGE: {
    name: "Read Storage",
    permission: PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
  },
  WRITE_EXTERNAL_STORAGE: {
    name: "Write Storage",
    permission: PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
  }
};
const checkPermissions = () => {
  Object.keys(PERMISSIONS).forEach(key => {
    PermissionsAndroid.check(PERMISSIONS[key].permission).then(result => {
      console.log(result);
      if (!result) requestPermission(PERMISSIONS[key]);
    });
  });
};
async function requestPermission(Permission) {
  let { permission, name } = Permission;
  try {
    const granted = await PermissionsAndroid.request(permission, {
      title: `Cool App Permission`,
      message: "App need this permission to save photo and share"
    });
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera");
    } else {
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
}
const downloadImage = () => {
  const fs = RNFetchBlob.fs;

  RNFetchBlob.config({
    fileCache: true
  })
    .fetch(
      "GET",
      "https://is4-ssl.mzstatic.com/image/thumb/Purple5/v4/c4/32/ae/c432ae45-f908-7963-eb52-4db6114e855f/source/256x256bb.jpg"
      //"https://d2ujflorbtfzji.cloudfront.net/key-image/6a55cd0b-40bd-4e07-9b0e-9a84d89061d0.png"
    )
    .then(resp => {
      // the image path you can use it directly with Image component
      console.log(resp.path());
      return resp.readFile("base64");
    })
    .then(base64Data => {
      // here's base64 encoded image
      console.log(base64Data);
      let shareImageBase64 = {
        title: "React Native",
        message: "This is a message",
        url: "data:image/png;base64," + base64Data,
        subject: "It'z green" //  for email
      };
      ShareImage.open(shareImageBase64);
      //  return fs.unlink(imagePath);
    });
};

class App extends Component {
  constructor() {
    super();
    if (Platform.OS !== "ios") checkPermissions();
  }
  render() {
    let { container, button } = styles;
    return (
      <View style={container}>
        <TouchableOpacity style={button} onPress={() => downloadImage()}>
          <Text>Download & Share Image</Text>
        </TouchableOpacity>
        <TouchableOpacity style={button} onPress={() => share()}>
          <Text>Share</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    backgroundColor: "orange",
    margin: 10,
    padding: 10
  }
});
App.navigationOptions = {
  title: "Default Share"
};
export default App;
