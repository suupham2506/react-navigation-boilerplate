import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {KeyboardContainer, RNText, RNTextInput} from 'components/common';
import {useDispatch} from 'react-redux';
import {unwrapResult} from '@reduxjs/toolkit';
import COLORS from 'theme/colors';
import {login} from 'redux-toolkit/Auth';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
});

const Login = ({}) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values, {setSubmitting}) => {
      dispatch(login(values));
    },
  });

  return (
    <KeyboardContainer style={styles.container} loading={formik.isSubmitting}>
      <View style={styles.topView}>
        <RNText font="semibold" style={styles.startedText}>
          Let's get started
        </RNText>
        <RNText font="regular" style={styles.descriptionText}>
          Log in to your exist account to see all features
        </RNText>
      </View>
      <View style={styles.inputView}>
        <RNTextInput
          value={formik.values.email}
          placeholder="Enter your email"
          keyboardType="email-address"
          onChangeText={formik.handleChange('email')}
          returnKeyType="next"
          touched={formik.touched.email}
          error={formik.errors.email}
        />
        <RNTextInput
          value={formik.values.password}
          placeholder="Enter your password"
          returnKeyType="done"
          secureTextEntry
          onChangeText={formik.handleChange('password')}
          style={styles.passwordTextInput}
          touched={formik.touched.password}
          error={formik.errors.password}
        />
      </View>
      <RNText font="regular" style={styles.forgotText}>
        Forgot password?
      </RNText>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={formik.handleSubmit}>
        <RNText font="medium" style={styles.loginButtonText}>
          Login
        </RNText>
      </TouchableOpacity>
      <RNText font="regular" style={styles.otherConnectText}>
        Or connect using
      </RNText>

      <View>
        <TouchableOpacity style={styles.facebookButton}>
          <Icon name="facebook-f" size={23} color="white" />
          <RNText font="medium" style={styles.socialButtonText}>
            Login via Facebook
          </RNText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.googleButton}>
          <Icon name="google" size={23} color="white" />
          <RNText font="medium" style={styles.socialButtonText}>
            Login via Google
          </RNText>
        </TouchableOpacity>
      </View>
    </KeyboardContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  topView: {
    marginTop: 80,
  },
  startedText: {
    fontSize: 22,
  },
  descriptionText: {
    fontSize: 14,
    paddingVertical: 10,
  },
  inputView: {
    marginVertical: 20,
  },
  passwordTextInput: {
    marginTop: 20,
  },
  forgotText: {
    textAlign: 'right',
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    height: 48,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  loginButtonText: {
    color: COLORS.white,
    fontSize: 16,
  },
  otherConnectText: {
    fontSize: 14,
    textAlign: 'center',
    paddingTop: 30,
    paddingBottom: 20,
  },
  facebookButton: {
    backgroundColor: COLORS.facebook,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    flexDirection: 'row',
  },
  socialButtonText: {
    fontSize: 14,
    textAlign: 'center',
    paddingLeft: 20,
    color: COLORS.white,
  },
  googleButton: {
    backgroundColor: COLORS.google,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    flexDirection: 'row',
  },
});
export default Login;
