import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

const SignUp = () => {
	const [formData,setFormData]=useState({});
	const [error,setError]=useState(null);
	const [loading,setLoading]=useState(false);

	const navigate=useNavigate();
	const handleChange=(e)=>{
		setFormData({
			...formData,
			[e.target.id]:e.target.value,
		})
	}
	const handleSubmit= async(e)=>{
		e.preventDefault();
		setLoading(true);
		try{
			const response= await fetch('api/auth/signup',
			{
				method:'POST',
				headers:{
					"Content-Type":"application/json",
				},
				body:JSON.stringify(formData),
			}
			);
			const data=await response.json();
			if (data.success ===false)
			{
				setError(data.message);
				setLoading(false);
				return;
			}
			setLoading(false);
			setError(null);
			navigate("/sign-in");
			console.log(data);
		}
		catch(error)
		{
			setError(error.message);
			setLoading(false);
		}
		
	}
	console.log(formData);
	return (
		<div className="p-3 max-w-lg mx-auto">
			<h1 className="text-3xl text-center font-semibold my-7">Đăng ký</h1>
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<input
					type="text"
					placeholder="Tên người dùng"
					className="border p-3 rounded-lg"
					id="username"
					onChange={handleChange}
				/>
				<input
					type="email"
					placeholder="email"
					className="border p-3 rounded-lg"
					id="email"
					onChange={handleChange}
				/>
				<input
					type="password"
					placeholder="Mật khẩu"
					className="border p-3 rounded-lg"
					id="password"
					onChange={handleChange}
				/>
				<button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg 
        uppercase hover:opacity-95 disabled:opacity-80">
				{loading ? "Loading..." : "Đăng ký"}
				</button>
				<OAuth/>
			</form>
		<div className="flex gap-2 mt-5">
			<p>Đã có tài khoản?</p>
			<Link to="/sign-in">
			<span className="text-blue-700">Đăng ký</span></Link>
		</div>
		{error && <p className="text-red-500 mt-5">{error}</p>}
		</div>
	);
};

export default SignUp;
