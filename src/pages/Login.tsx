import { SubmitHandler, useForm } from "react-hook-form";
import { LocalLogin } from "../services/Auth";
import ResponseData from "../types/ResponseData";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

type FormInputs = {
  email: string
  password: string
}

function LoginPage() {
  const navigate = useNavigate();
  const {isAuthenticated, login} = useAuth();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputs>({
    defaultValues: {
      email: "miguel@example.com",
      password: "password"
    }
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    LocalLogin(data.email, data.password)
      .then((response) => {
        const responseData: ResponseData = response.data;
        login(responseData.data.token);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error);
      })
  }

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col p-2 gap-2 w-1/3 border"
      >
        <input
          className="border-2 p-1 rounded-md"
          type="email"
          placeholder="exmple.exmple.com"
          {...register('email', {
            required: true,
          })}
        />

        <input
          type="password"
          className="border-2 p-1 rounded-md"
          placeholder="your password"
          {...register('password', {
            required: true,
          })}
        />

        {errors.email?.message}
        {errors.password?.message}

        <input className="cursor-pointer" type="submit" value="enviar" />
      </form>
    </div>
  );
}

export default LoginPage;