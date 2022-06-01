import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../service/AuthService";
import notify from "../../../service/NotifyService";
import "./Register.css";

function Register(): JSX.Element {

    const navigate = useNavigate();
    const { register, handleSubmit, formState } = useForm<UserModel>();

    async function submit(user: UserModel) {
        try {
            user.role = "RegularUser";
            console.log("check register: " , user);
            await authService.register(user);
            notify.success("You are now registered");
            navigate("/home");
        }
        catch(err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="Register Box">

			<h2>Register</h2>

            <form onSubmit={handleSubmit(submit)}>

                <label>First name: </label>
                <input type="text" {...register("firstName")} />

                <label>Last name: </label>
                <input type="text" {...register("lastName")} />

                <label>Username: </label>
                <input type="text" {...register("username")} />

                <label>Password: </label>
                <input type="password" {...register("password")} />

                <button>Register</button>

            </form>

        </div>
    );
}

export default Register;
