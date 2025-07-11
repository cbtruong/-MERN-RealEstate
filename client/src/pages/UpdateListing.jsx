import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';


const UpdateListing = () => {
	const { currentUser } = useSelector((state) => state.user);
	const navigate = useNavigate();
    const params = useParams();
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		address: "",
		type: "rent",
		bedrooms: 1,
		bathrooms: 1,
		regularPrice: 50,
		discountPrice: 0,
		offer: false,
		parking: false,
		furnished: false,
		imageUrls: [
			"https://tse3.mm.bing.net/th?id=OIP.qQaYM8SzEL3FCABDnxWtZgHaEh&pid=Api&P=0&h=180",
			"https://tse1.mm.bing.net/th?id=OIP.AlPOGhL46M4ElIITwfrWVwHaE8&pid=Api&P=0&h=180",
		],
	});
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);


    useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };

        fetchListing();
    }, []);
	const handleChange = (e) => {
		if (e.target.id === "sale" || e.target.id === "rent") {
			setFormData({
				...formData,
				type: e.target.id,
			});
		}

		if (
			e.target.id === "parking" ||
			e.target.id === "furnished" ||
			e.target.id === "offer"
		) {
			setFormData({
				...formData,
				[e.target.id]: e.target.checked,
			});
		}

		if (
			e.target.type === "number" ||
			e.target.type === "text" ||
			e.target.type === "textarea"
		) {
			setFormData({
				...formData,
				[e.target.id]: e.target.value,
			});
		}
	};

	const handleImageSubmit = async () => {
		console.log("wait");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setError(false);
			setLoading(true);
            const res = await fetch(`/api/listing/update/${params.listingId}`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                ...formData,
                userRef: currentUser._id,
                }),
            });
			const data = await res.json();
			setLoading(false);
			if (data.success === false) {
				setError(data.message);
			}
			navigate(`/listing/${data._id}`);
		} catch (error) {
			setError(error.message);
			setLoading(false);
		}
	};
	console.log(formData);
	return (
		<main className="p-3 max-w-4xl mx-auto">
			<h1 className="text-3xl font-semibold text-center my-7">
				Cập nhật bất động sản
			</h1>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col sm:flex-row gap-4"
			>
				<div className="flex flex-col flex-1 gap-4">
					<p className="font-semibold">
						Hình ảnh:
						<span className="font-normal text-gray-600 ml-2">
							Chỉ tải lên tối đa 6 hình ảnh.
						</span>
					</p>
					<div className=" flex gap-4">
						<input
							className="p-3 border border-gray-300 rounded w-[75%]"
							type="file"
							id="images"
							accept="image/*"
							multiple
						/>
						<button
							type="button"
							onClick={handleImageSubmit}
							className="p-3 text-green-700 border border-green-700
                        rounded uppercase hover:shadow-lg disabled:opacity-80"
						>
							Tải lên
						</button>
					</div>
					<button
						className="p-3 bg-slate-700 text-white rounded-lg 
                uppercase hover:opacity-95 disabled:opacity-80"
					>
						{loading ? "Loading..." : "Cập nhật bất động sản"}
					</button>
					{error && <p className="text-red-700 text-sm">{error}</p>}
				</div>
				<div className="flex flex-col gap-4 flex-1">
					<input
						onChange={handleChange}
						type="text"
						placeholder="Tên bất động sản"
						className="border p-3 rounded-lg"
						id="name"
						maxLength="62"
						minLength="10"
						required
						value={formData.name}
					/>
					<textarea
						onChange={handleChange}
						type="text"
						placeholder="Mô tả"
						className="border p-3 rounded-lg"
						id="description"
						required
						value={formData.description}
					/>
					<input
						onChange={handleChange}
						type="text"
						placeholder="Địa chỉ/ vị trí"
						className="border p-3 rounded-lg"
						id="address"
						required
						value={formData.address}
					/>
					<div className="flex gap-6 flex-wrap">
						<div className="flex gap-2">
							<span>Bán</span>
							<input
								onChange={handleChange}
								checked={formData.type === "sale"}
								type="checkbox"
								id="sale"
								className="w-5"
							/>
						</div>
						<div className="flex gap-2">
							<span>Thuê</span>
							<input
								onChange={handleChange}
								checked={formData.type === "rent"}
								type="checkbox"
								id="rent"
								className="w-5"
							/>
						</div>
						<div className="flex gap-2">
							<span>Bãi đậu xe</span>
							<input
								onChange={handleChange}
								type="checkbox"
								id="parking"
								className="w-5"
								checked={formData.parking}
							/>
						</div>
						<div className="flex gap-2">
							<input
								onChange={handleChange}
								type="checkbox"
								id="furnished"
								className="w-5"
								checked={formData.furnished}
							/>
							<span>Nội thất</span>
						</div>
						<div className="flex gap-2">
							<span>Đề nghị giảm giá</span>
							<input
								onChange={handleChange}
								type="checkbox"
								id="offer"
								className="w-5"
								checked={formData.offer}
							/>
						</div>
					</div>
					<div className=" flex flex-wrap gap-6">
						<div className="flex items-center gap-2">
							<p>Phòng ngủ</p>
							<input
								onChange={handleChange}
								type="number"
								id="bedrooms"
								min={1}
								max={10}
								required
								className="p-3 border border-gray-300 rounded-lg"
								value={formData.bedrooms}
							/>
						</div>
						<div className="flex items-center gap-2">
							<p>Phòng vệ sinh</p>
							<input
								onChange={handleChange}
								type="number"
								id="bathrooms"
								min={1}
								max={10}
								required
								className="p-3 border border-gray-300 rounded-lg"
								value={formData.bathrooms}
							/>
						</div>
						<div className="flex items-center gap-2">
							<input
								onChange={handleChange}
								type="number"
								id="regularPrice"
								min={50}
								max={1000000}
								required
								className="p-3 border border-gray-300 rounded-lg"
								value={formData.regularPrice}
							/>
							<div className=" flex flex-col items-center">
								<p>Gía niêm yết:</p>
								{formData.type === "rent" && (
									<span className="text-xs">(đ / month)</span>
								)}
							</div>
						</div>
						{formData.offer && (
							<div className="flex items-center gap-2">
								<input
									onChange={handleChange}
									type="number"
									id="discountPrice"
									min={1}
									max={10}
									required
									className="p-3 border border-gray-300 rounded-lg"
									value={formData.discountPrice}
								/>
								<div className=" flex flex-col items-center">
									<p>Giảm giá</p>
									{formData.type === "rent" && (
										<span className="text-xs">
											(đ / month)
										</span>
									)}
								</div>
							</div>
						)}
					</div>
				</div>
			</form>
		</main>
	);
};

export default UpdateListing;
