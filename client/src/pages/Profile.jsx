import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import { Link} from "react-router-dom";
import {
	updateUserStart,
	updateUserFailure,
	updateUserSuccess,
	deleteUserFailure,
	deleteUserSuccess,
	deleteUserStart,
	signOutUserStart,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

export default function Profile() {
	const fileRef = useRef(null);
	const [formData, setFormData] = useState({});
	const { currentUser, loading, error } = useSelector((state) => state.user);
	const [updateSuccess, setUpdateSuccess] = useState(false);
	const [showListingsError, setShowListingsError] = useState(false);
	const [userListings, setUserListings] = useState([]);
	const dispatch = useDispatch();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			dispatch(updateUserStart());
			const res = await fetch(`/api/user/update/${currentUser._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});
			const data = await res.json();
			if (data.success === false) {
				dispatch(updateUserFailure(data.message));
				return;
			}
			dispatch(updateUserSuccess(data));
			setUpdateSuccess(true);
		} catch (error) {
			dispatch(updateUserFailure(error.mess));
		}
	};

	const handleDeleteUser = async () => {
		try {
			dispatch(deleteUserStart());
			const res = await fetch(`/api/user/delete/${currentUser._id}`, {
				method: "DELETE",
			});
			const data = await res.json();
			if (data.success === false) {
				dispatch(deleteUserFailure(data.message));
				return;
			}
			dispatch(deleteUserSuccess(data));
		} catch (error) {
			dispatch(deleteUserFailure(error.message));
		}
	};
	const handleSignOut = async () => {
		try {
			dispatch(signOutUserStart());
			const res = await fetch("/api/auth/signout");
			const data = await res.json();
			if (data.success === false) {
				dispatch(deleteUserFailure(data.message));
				return;
			}
			dispatch(deleteUserSuccess(data));
		} catch (error) {
			dispatch(deleteUserFailure(error.message)); // Assuming error.message is what you want to dispatch
		}
	};
	const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };
  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };
	console.log(formData);
	return (
		<div className="p-3 max-w-xl mx-auto">
			<form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
				<div 
				style={{
                  background: `url(https://tse2.mm.bing.net/th?id=OIP.HyPO0GQqnsGoMcauAHz_MQHaE7&pid=Api&P=0&h=180) center no-repeat`,
                  backgroundSize: 'cover',
                }}
				className="h-60">
				<div>
					<input type="file" ref={fileRef} hidden accept="image/*" />
					<img
						onClick={() => fileRef.current.click()}
						src={currentUser.avatar}
						alt="profile"
						className=" rounded-full h-24 w-24 object-cover
						cursor-pointer self-center mt-2"
						/>
					</div>
				</div>
				<input
					type="text"
					placeholder="Tên người dùng"
					defaultValue={currentUser.username}
					id="username"
					className="border p-3 rounded-lg"
					onChange={handleChange}
				/>
				<input
					type="email"
					placeholder="email"
					defaultValue={currentUser.email}
					id="email"
					className="border p-3 rounded-lg"
					onChange={handleChange}
				/>
				<input
					type="password"
					placeholder="Mật khẩu"
					id="password"
					className="border p-3 rounded-lg"
					onChange={handleChange}
				/>
				<button
					disabled={loading}
					className="bg-red-400 text-white rounded-lg p-3
        uppercase hover:opacity-95 disabled:opacity-80"
				>
					{" "}
					{loading ? "Loading..." : "Cập nhật"}
				</button>
				<Link
					className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
					to={"/create-listing"}
				>
					Tạo bất động sản
				</Link>
			</form>
			<div className="flex justify-between mt-5">
				<span
					onClick={handleDeleteUser}
					className="text-red-700 cursor-pointer"
				>
					Xóa tài khoản
				</span>
				<span
					onClick={handleSignOut}
					className="text-red-700 cursor-pointer"
				>
					Đăng xuất
				</span>
			</div>
			<p className="text-red-700 mt-5">{error ? error : ""}</p>
			<p className="text-green-700 mt-5">
				{updateSuccess ? "User is updated successfully!" : ""}
			</p>
			<button onClick={handleShowListings} className='text-green-700 w-full'>
				Hiện thị danh sách bất động sản
			</button>
			<p className='text-red-700 mt-5'>
				{showListingsError ? 'Error showing listings' : ''}
			</p>
			{userListings && userListings.length > 0 && (
				<div className='flex flex-col gap-4'>
				<h1 className='text-center mt-7 text-2xl font-semibold'>
					Bất động sản của tôi
				</h1>
				{userListings.map((listing) => (
					<div
					key={listing._id}
					className='border rounded-lg p-3 flex justify-between items-center gap-4'
					>
					<Link to={`/listing/${listing._id}`}>
						<img
						src={listing.imageUrls[0]}
						alt='listing cover'
						className='h-16 w-16 object-contain'
						/>
					</Link>
					<Link
						className='text-slate-700 font-semibold  hover:underline truncate flex-1'
						to={`/listing/${listing._id}`}
					>
						<p>{listing.name}</p>
					</Link>

					<div className='flex flex-col item-center'>
						<button 
						onClick={() => handleListingDelete(listing._id)}
						className='text-red-700 uppercase'>
						Xóa
						</button>
						<Link to={`/update-listing/${listing._id}`}>
						<button className='text-green-700 uppercase'>Cập nhật</button>
						</Link>
					</div>
					</div>
				))}
				</div>
			)}
		</div>
	);
}
