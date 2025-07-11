import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Header = () => {
	const { currentUser } = useSelector((state) => state.user);
	const [searchTerm, setSearchTerm] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		const urlParams = new URLSearchParams(window.location.search);
		urlParams.set("searchTerm", searchTerm);
		const searchQuery = urlParams.toString();
		navigate(`/search?${searchQuery}`);
	};

	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const searchTermFromUrl = urlParams.get("searchTerm");
		if (searchTermFromUrl) {
			setSearchTerm(searchTermFromUrl);
		}
	}, [location.search]);
	return (
		<header className="bg-red-400 shadow-md">
			<div className="flex justify-between items-center max-w-6xl mx-auto p-4">
				<Link to="/">
					<h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
						<span className="text-slate-500">ThinhPhat</span>
					</h1>
				</Link>
				{/* <form
					onSubmit={handleSubmit}
					className="bg-slate-100 p-3 rounded-lg flex items-center"
				>
					<input
						type="text"
						placeholder="Tìm kiếm bất động sản..."
						className="bg-transparent focus:outline-none w-24 sm:w-64"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<button>
						<FaSearch className="text-slate-600" />
					</button>
				</form> */}
				<ul className="flex gap-4">
					<Link to="/">
						<li className="hidden sm:inline text-slate-200 hover:underline ">
							Trang chủ
						</li>
					</Link>
					<Link to="/search">
						<li className="hidden sm:inline text-slate-200 hover:underline ">
							Bất động sản
						</li>
					</Link>
					<Link to="/about">
						<li className="hidden sm:inline text-slate-200 hover:underline ">
							Về chúng tôi
						</li>
					</Link>
					<Link to="/profile">
						{currentUser ? (
							<img
								className="rounded-full h-7 w-7 object-cover"
								src={currentUser.avatar}
								alt="profile"
							/>
						) : (
							<li className=" text-slate-200 hover:underline ">
								Đăng nhập
							</li>
						)}
					</Link>
				</ul>
			</div>
		</header>
	);
};

export default Header;
