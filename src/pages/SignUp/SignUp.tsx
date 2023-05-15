import { FC, useEffect } from "react";
import { WelcomeScreen } from "../../templates/WelcomeScreen/WelcomeScreen";
import { object, ref, string } from "yup";

import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./SignUp.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/selectors/user.selector";
import { createUser } from "../../store/thunks/user.thunks";
import { AppDispatch } from "../../store";

const RegisterValidation = object().shape({
  email: string()
    .required("El email es requerido")
    .email("El email es requerido"),
  password: string().min(8, "Required").required("La contraseña es requerida"),
  confirmPassword: string()
    .required("Please confirm your password")
    .oneOf([ref("password")], "Las contraseñas no coninciden"),
});

export const SignUp: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoadingCreate, uid, errorCreate } = useSelector(selectUser);
  const handledCreateUser = async (values: any) => {
    dispatch(createUser({ email: values.email, password: values.password }));
  };
  const handledLogin = () => {
    navigate("/");
  };

  useEffect(() => {
    if (uid) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "El usuario se creo correctamente.",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/pokemons");
    }
  }, [uid]);

  useEffect(() => {
    if (errorCreate) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title:
          "Ocurrio un problema al crear el usuario favor de intentar nuevamente.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [errorCreate]);

  return (
    <WelcomeScreen>
      <div className="signup__container">
        <h1>SignUp Pokémon</h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={handledCreateUser}
          validationSchema={RegisterValidation}
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
              <Form className="signup__form">
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className="signup__form-input"
                  placeholder="Ingresa un email"
                />
                <p className="signup__form-error">
                  {errors.email && touched.email && errors.email}
                </p>
                {errors.email && touched.email && errors.email}
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className="signup__form-input"
                  placeholder="Ingresa una contraseña de 8 caracteres"
                />
                <p className="signup__form-error">
                  {errors.password && touched.password && errors.password}
                </p>
                <input
                  type="password"
                  name="confirmPassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                  className="signup__form-input"
                  placeholder="Repite la contraseña"
                />
                <p className="signup__form-error">
                  {errors.confirmPassword &&
                    touched.confirmPassword &&
                    errors.confirmPassword}
                </p>

                <button
                  className="signup__form-button"
                  type="submit"
                  disabled={isSubmitting || isLoadingCreate}
                >
                  Crear Usuario
                </button>
                <button
                  className="signup__form-button"
                  type="button"
                  onClick={handledLogin}
                >
                  Ya tengo cuenta
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </WelcomeScreen>
  );
};
