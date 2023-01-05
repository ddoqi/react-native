import { useState, useEffect, useRef } from "react";
import styled from "@emotion/native";
import { authService } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { emailRegex, pwRegex } from "../util";

export default function Login({ navigation: { goBack, setOptions } }) {
  const emailRef = useRef(null);
  const pwRef = useRef(null);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const validateInputs = () => {
    if (!email) {
      alert("email을 입력해주세요.");
      emailRef.current.focus();
      return true;
    }
    if (!pw) {
      alert("password를 입력해주세요.");
      pwRef.current.focus();
      return true;
    }
    const matchedEmail = email.match(emailRegex);
    const matchedPw = pw.match(pwRegex);

    if (matchedEmail === null) {
      alert("이메일 형식에 맞게 입력해 주세요.");
      emailRef.current.focus();
      return true;
    }
    if (matchedPw === null) {
      alert("비밀번호는 8자리 이상 영문자, 숫자, 특수문자 조합이어야 합니다.");
      pwRef.current.focus();
      return true;
    }
  };
  const handleLogin = () => {
    // 유효성 검사
    if (validateInputs()) {
      return;
    }

    // 로그인 요청
    signInWithEmailAndPassword(authService, email, pw)
      .then(() => {
        console.log("로그인성공");
        setEmail("");
        setPw("");
        goBack();
        // 로그인 화면 이전 화면으로 돌아가기
      })
      .catch((err) => {
        console.log("err.message:", err.message);
        if (err.message.includes("user-not-found")) {
          alert("회원이 아닙니다. 회원가입을 먼저 진행해 주세요.");
        }
        if (err.message.includes("wrong-password")) {
          alert("비밀번호가 틀렸습니다.");
        }
      });
  };

  const handleRegister = () => {
    // 유효성 검사
    if (validateInputs()) {
      return;
    }

    // 회원가입 요청
    createUserWithEmailAndPassword(authService, email, pw)
      .then(() => {
        console.log("로그인성공");
        setEmail("");
        setPw("");
        goBack();
      })
      .catch((err) => {
        console.log("err.message:", err.message);
        if (err.message.includes("already-in-use")) {
          alert("이미 사용중인 아이디입니다.");
        }
      });
  };

  useEffect(() => {
    setOptions({ headerRight: () => null });
  }, []);

  return (
    <View>
      <EmailInput
        ref={emailRef}
        value={email}
        onChangeText={(text) => setEmail(text)}
        textContentType="emailAddress"
        placeholder="Enter your email id"
      />
      <PwInput
        ref={pwRef}
        value={pw}
        onChangeText={(text) => setPw(text)}
        textContentType="password"
        returnKeyType="send"
        secureTextEntry={true}
        placeholder="Enter your password"
      />
      <LoginButton onPress={handleLogin}>
        <LoginText>Login</LoginText>
      </LoginButton>
      <RegisterButton onPress={handleRegister}>
        <RegisterText>Register</RegisterText>
      </RegisterButton>
    </View>
  );
}

const View = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-top: 50px;
`;

const LoginButton = styled.TouchableOpacity`
  width: 150px;
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;
const LoginText = styled.Text`
  font-size: 20px;
`;
const RegisterText = styled(LoginText)``;

const RegisterButton = styled(LoginButton)``;

const EmailInput = styled.TextInput`
  background-color: grey;
  width: 150px;
  padding: 10px 15px;
  margin-bottom: 15px;
  border-radius: 10px;
`;
const PwInput = styled(EmailInput)``;
