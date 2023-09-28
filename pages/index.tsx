import { createProduct, fetchData } from "@/common/axios";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";;
import { Button, Card, CardBody, CardHeader, Divider, Input, Radio, RadioGroup, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";



export default function IndexPage() {
	const [data, setData] = useState([]);
	const [category, setCategory] = useState<any>(new Set([]));
	const [nombre, setNombre] = useState<string>("");
	const [precio, setPrecio] = useState<string>("");
	const [aviso, setAviso] = useState("Normal");
	const [showError, setShowError] = useState<any>(false);
	const [errorForm, setErrorForm] = useState<string[] | string>([]);


	const handleSelectionCategoryChange = (e: any) => {
		setCategory(new Set([e.target.value]));
	};


	const [images, setImages] = useState<Array<{ title: string; file: File }>>([]);
	const [imageTitle, setImageTitle] = useState<string>('');

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newImages = [...images];
		const files = e.target.files;

		if (files) {
			Array.from(files).forEach((file) => {
				newImages.push({ title: imageTitle, file });
			});

			setImages(newImages);
		}
	};

	const handleImageTitleChange = (index: number, title: string) => {
		const updatedImages = [...images];
		updatedImages[index].title = title;
		setImages(updatedImages);
	};

	const handleRemoveImage = (index: number) => {
		const updatedImages = [...images];
		updatedImages.splice(index, 1);
		setImages(updatedImages);
	};

	const handleSumbitProduct = async () => {
		setShowError(false)
		try {
			const formData = new FormData();
			formData.append('name', nombre);
			formData.append('category', Array.from(category)[0] as string);
			formData.append('notification', aviso);
			formData.append('price', precio);

			let metadataImages: any[] = []
			if (images.length > 0) {
				images.forEach((image) => {
					metadataImages.push({ title: image.title, imageName: image.file.name })
					formData.append("files", image.file);
				})
			}
			formData.append('images', JSON.stringify(metadataImages));

			const response = await axios.post('http://localhost:3001/api/products', formData);
			setCategory(new Set([]))
			setNombre("")
			setPrecio("")
			setAviso("Normal")
			setImages([])
		} catch (error: any) {
			setShowError(true);
			setErrorForm(error.response?.data?.message);
			if(!error.response?.data?.message) setErrorForm([`Verifique que el servidor este levantado`]);
			console.error(error);
		}
	}




	useEffect(() => {
		fetchData('products')
			.then((apiData) => {
				setData(apiData);
			})
			.catch((error) => {
				console.error('Error al cargar los datos:', error);
			});
	}, []);
	return (
		<DefaultLayout>
			<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
				<div className="inline-block max-w-lg text-center justify-center">
					<h1 className={title()}>Entrevista técnica USERCODE&nbsp;</h1>
				</div>
				<Card className="w-full sm:max-w-screen-sm">
					<CardHeader className="flex flex-col items-center gap-3">
						<div className="flex flex-col">
							<p className="text-md">Agrega tu producto</p>
						</div>
					</CardHeader>
					<Divider />
					<CardBody>
						<div className="w-full">
							<Input
								className="mb-5"
								label="Nombre"
								placeholder="Nombre"
								value={nombre}
								onValueChange={setNombre}
							/>
							<div className="mb-5">
								<Select
									label="Categoría"
									variant="faded"
									placeholder="Seleciona una categoría"
									selectedKeys={category}
									className="max-w-xs"
									onChange={handleSelectionCategoryChange}
								>
									<SelectItem key={"Entretención"} value="Entretención">
										Entretención
									</SelectItem>
									<SelectItem key={"Videojuegos"} value="Videojuegos">
										Videojuegos
									</SelectItem>
									<SelectItem key={"Smart home"} value="Smart home">
										Smart home
									</SelectItem>

								</Select>
							</div>
							<div className="mb-5">
								<Input
									className="mb-5"
									label="Precio"
									placeholder="Precio"
									value={precio}
									onValueChange={setPrecio}
								/>
							</div>
							<div className="mb-5">
								<RadioGroup
									label="Aviso"
									orientation="horizontal"
									value={aviso}
									onValueChange={setAviso}
								>
									<Radio value="Destacado">Destacado</Radio>
									<Radio value="Normal">Normal</Radio>
								</RadioGroup>
							</div>
							<div className="mb-5">
								<h2 className="text-md">Agregar Imágenes</h2>
								<br />
								<input type="file" accept="image/*" multiple onChange={handleImageChange} />
								{images.map((image, index) => (
									<div key={index} className="m-3 flex items-center">
										<img
											src={URL.createObjectURL(image.file)} // Crea una URL temporal para la vista previa
											alt={`Imagen ${index + 1}`}
											style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '10px' }}
										/>
										<div className="flex items-center justify-center">
											<Input
												placeholder="Título de la Imagen"
												value={image.title}
												onChange={(e: any) => handleImageTitleChange(index, e.target.value)}
											/>
											<Button
												color="danger"
												onClick={() => handleRemoveImage(index)}
												className="ml-4 bg-red-500 text-white rounded"
											>
												Eliminar
											</Button>
										</div>
									</div>

								))}
							</div>
							{showError &&
								(
									(Array.isArray(errorForm) &&
										errorForm.map((message) => {
											return <p className="text-md text-red-600">{message}</p>
										}))
									||
									(typeof errorForm === "string" && <p className="text-md text-red-600">{errorForm}</p>)
								)
							}

							<div className="mb-5 flex flex-col items-center">
								<Button color="primary" variant="solid" size="lg" onClick={handleSumbitProduct}>
									Subir Producto
								</Button>
							</div>
						</div>
					</CardBody>
				</Card>
				<Divider className="max-w-[1200px] my-10" />

				<div className="w-full sm:max-w-screen-lg">
					<h1>Listado de Productos</h1>
					<Table aria-label="Example static collection table" fullWidth>
						<TableHeader>
							<TableColumn>Nombre</TableColumn>
							<TableColumn>Categoria</TableColumn>
							<TableColumn>Precio</TableColumn>
							<TableColumn>Aviso</TableColumn>
							<TableColumn>Ver</TableColumn>
						</TableHeader>
						<TableBody>
							{data.map((product: any) => (
								<TableRow key={product.id}>
									<TableCell>{product.name}</TableCell>
									<TableCell>{product.category}</TableCell>
									<TableCell>{product.price}</TableCell>
									<TableCell>{product.notification}</TableCell>
									<TableCell>
										<Button color="primary">
											Ver
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</section>
		</DefaultLayout>
	);
}
