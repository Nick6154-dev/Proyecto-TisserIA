
import { NavigationContainer } from '@react-navigation/native';
import StackNavigationInitial from './src/navigator/StackNavigationInitial';
import { AuthProvider } from './src/context/AuthContext';
import 'react-native-gesture-handler';

const AppState = ({ children }: any) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}
function App() {

  return (
    <NavigationContainer>
      <AppState>
        <StackNavigationInitial />        
      </AppState>
    </NavigationContainer>
  );
}
export default App

