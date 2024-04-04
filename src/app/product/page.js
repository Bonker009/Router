import {getAllProducts} from "@/app/services/productService";
import Image from "next/image";

const Product = async () => {
    const result = await getAllProducts();
    const {products: product} = result;


    return (

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Product Image
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Product id
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Product Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Description
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Status
                    </th>

                </tr>
                </thead>
                <tbody>
                { product?.map((item,index)=> (
                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <Image src={item.images[0]} alt={item.title} height={25} width={25} />
                        </th>
                        <td className="px-6 py-4">
                            {item.id}
                        </td>
                        <td className="px-6 py-4">
                            {item.title}
                        </td>
                        <td className="px-6 py-4">
                            {item.description}
                        </td>
                        <td className="px-6 py-4">
                            {item.price}
                        </td>
                        <td className="px-6 py-4 text-right">
                            <a href="#"
                               className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
                        </td>
                    </tr>

                ))}

                </tbody>
            </table>
        </div>
    )
}
export default Product