import { useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FieldValues, useForm } from "react-hook-form";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { auth } from "../firebaseConfig";

const SignUp = () => {
	const toast = useToast();
	const schema = z.object({
		email: z.string().email({ message: "Email is Required" }),
		password: z.string().min(4, { message: "Minimum of 4 characters" }),
	});

	type FormData = z.infer<typeof schema>;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const navigate = useNavigate();

	const onSubmit = async (data: FieldValues) => {
		const { email, password } = data;
		createUserWithEmailAndPassword(auth, email, password)
			.then(() => {
				toast({ title: "Account Created", status: "success" });
				navigate("/");
			})
			.catch((error) => {
				if (error instanceof FirebaseError && error.code === "auth/email-already-in-use")
					toast({
						title: "Email already Exists",
						status: "error",
					});
			});
	};
	return (
		<div className="lg:grid grid-cols-2 lg:h-screen lg:overflow-hidden">
			<div className="w-full h-full hidden lg:block">
				<LazyLoadImage
					src="/assets/loginBg.png"
					className="w-full h-full object-cover"
				/>
			</div>
			<div className="bg-white flex flex-col justify-center text-black px-10 md:px-20 h-screen pt-10 text-center lg:text-left lg:px-12">
				<h1 className="text-[36px] lg:text-[40px] xl:text-[54px] font-semibold">Welcome to SnapGrid</h1>
				<div className="flex items-center justify-center gap-x-3">
					<p className="lg:text-lg xl:text-xl text-[#00000099] font-inter">Create an Account</p>
					<div className="overflow-hidden rounded-full w-6 h-6">
						<img
							className="object-cover w-full h-full"
							src="/src/assets/logo.png"
							alt=""
						/>
					</div>
				</div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="mt-14"
				>
					<div className="flex flex-col gap-y-[10px]">
						<label
							htmlFor=""
							className="text-xl xl:text-2xl font-semibold text-left"
						>
							Email
						</label>
						<input
							{...register("email")}
							type="email"
							className="rounded-2xl border-[0.5px] border-black bg-transparent py-3 px-4"
							placeholder="Enter your email"
						/>
						{errors.email && <p className="text-red-500 text-left">{errors.email.message}</p>}
					</div>
					<div className="flex flex-col gap-y-[10px] mt-6">
						<label
							htmlFor=""
							className="text-xl xl:text-2xl font-semibold text-left"
						>
							Password
						</label>
						<input
							{...register("password")}
							type="password"
							className="rounded-2xl font-inter border-[0.5px] border-black bg-transparent py-3 px-4 placeholder:font-inter"
							placeholder="Enter your password"
						/>
						{errors.password && <p className="text-red-500 mt-1 text-left">{errors.password.message}</p>}
					</div>
					<button
						type="submit"
						className="bg-[#735355] w-full py-4 text-xl lg:text-[22px] text-white font-bold rounded-2xl mt-14"
					>
						Sign In
					</button>
				</form>
				<p className="mt-3 lg:mt-10 text-sm md:text-xl lg:text-2xl text-center">
					Already have an account?{" "}
					<Link
						to="/"
						className="font-semibold text-[#735355]"
					>
						sign in
					</Link>
				</p>
			</div>
		</div>
	);
};

export default SignUp;
