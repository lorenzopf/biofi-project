import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  Dashboard,
  Start,
  HomePage,
  ApplicationList
} from './screens';

const Router = createStackNavigator(
  {
    HomeScreen,
    LoginScreen,
    RegisterScreen,
    ForgotPasswordScreen,
    Dashboard,
    HomePage,
    Start,
    ApplicationList
  },
  {
    initialRouteName: 'HomeScreen',
    headerMode: 'none',
  }
);

const Main = createAppContainer(Router);
export default Main;
