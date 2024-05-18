import { SafeAreaView } from "react-native";
import Navigation from "./src/routes/Navigation";


export default function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Navigation/>
    </SafeAreaView>
  );
}