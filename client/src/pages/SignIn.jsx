import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {signInStart,signInSuccess,signInFailure} from '../redux/user/userSlice';
import OAuth from "../components/OAuth";

const SignIn = () => {
	const [formData,setFormData]=useState({});
	const {loading, error}= useSelector((state)=> state.user);
	const dispatch= useDispatch();
	const navigate=useNavigate();

	const handleChange=(e)=>{
		setFormData({
			...formData,
			[e.target.id]:e.target.value,
		})
	}
	const handleSubmit= async(e)=>{
		e.preventDefault();
		try{
			dispatch(signInStart())
			const response= await fetch('api/auth/signin',
			{
				method:'POST',
				headers:{
					"Content-Type":"application/json",
				},
				body:JSON.stringify(formData),
			}
			);
			const data=await response.json();
			console.log(data);
			if (data.success ===false)
			{
				dispatch(signInFailure(data.message));
				return;
			}
			dispatch(signInSuccess(data));
			navigate("/profile");
		}
		catch(error)
		{
			dispatch(signInFailure(error.message));
		}
		
	}
	console.log(formData);
	return (
		<div className="p-3 max-w-lg mx-auto">
			<h1 className="text-3xl text-center font-semibold my-7">Đăng Nhập</h1>
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<input
					type="email"
					placeholder="email"
					className="border p-3 rounded-lg"
					id="email"
					onChange={handleChange}
				/>
				<input
					type="password"
					placeholder="mật khẩu"
					className="border p-3 rounded-lg"
					id="password"
					onChange={handleChange}
				/>
				<button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg 
        uppercase hover:opacity-95 disabled:opacity-80">
				{loading ? "Loading..." : "Đăng nhập"}
				</button>
				<OAuth/>
			</form>
		<div className="flex gap-2 mt-5">
			<p>Không có tài khoản?</p>
			<Link to="/sign-up">
			<span className="text-blue-700">Đăng kí</span></Link>
		</div>
		{error && <p className="text-red-500 mt-5">{error}</p>}
		</div>
	);
};

export default SignIn;
