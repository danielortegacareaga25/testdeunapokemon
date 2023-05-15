import { object, string } from "yup";
import { WelcomeScreen } from "../../templates/WelcomeScreen/WelcomeScreen";
import { Form, Formik } from "formik";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { loginUser } from "../../store/thunks/user.thunks";
import { selectUser } from "../../store/selectors/user.selector";
import { useEffect } from "react";
import Swal from "sweetalert2";

const LoginValudation = object().shape({
  email: string()
    .required("El email es requerido")
    .email("El email no es valido"),
  password: string().min(8, "Required").required("La contraseña es requerida"),
});

export const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isLoadingLogin, uid, errorLogin } = useSelector(selectUser);
  const navigate = useNavigate();
  const handledLogin = (values: any) => {
    dispatch(loginUser({ email: values.email, password: values.password }));
  };
  const handledRegister = () => {
    navigate("sigunp");
  };

  useEffect(() => {
    if (uid) {
      navigate("/pokemons");
    }
  }, [uid]);

  useEffect(() => {
    if (errorLogin) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title:
          "Ocurrio un problema al logear el usuario favor de intentar nuevamente.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [errorLogin]);
  return (
    <WelcomeScreen>
      <div className="login__form">
        <h1>Login Pokémon</h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={handledLogin}
          validationSchema={LoginValudation}
        >
          {({
            values,
            handleChange,
            handleBlur,
            touched,
            errors,
            isSubmitting,
          }) => {
            return (
              <Form>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className="login__form-input"
                  placeholder="Ingresa tu email"
                />
                <p className="login__form-error">
                  {errors.email && touched.email && errors.email}
                </p>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className="login__form-input"
                  placeholder="Ingresa tu contraseña"
                />
                <p className="login__form-error">
                  {errors.password && touched.password && errors.password}
                </p>
                <button
                  className="login__form-button"
                  type="submit"
                  disabled={isSubmitting || isLoadingLogin}
                >
                  Ingresar
                </button>
                <button
                  className="login__form-button"
                  type="button"
                  onClick={handledRegister}
                >
                  ¿No tienes cuenta?
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </WelcomeScreen>
  );
};
