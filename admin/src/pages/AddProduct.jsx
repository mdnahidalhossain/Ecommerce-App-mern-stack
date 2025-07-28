import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backend_url } from '../App'
import toast from 'react-hot-toast'

const AddProduct = ({ token }) => {

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [productName, setProductName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Men')
  const [subCategory, setSubCategory] = useState('Topwear')
  const [bestSeller, setBestSeller] = useState(false)
  const [sizes, setSizes] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (sizes.length === 0) {
      toast.error("Cannot add product. All fields required!")
      return
    }

    try {
      const formData = new FormData()

      //the string "values" should match the variable name ins the Product model
      formData.append("pName", productName)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestSeller", bestSeller)
      formData.append("sizes", JSON.stringify(sizes)) //because its an array

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)


      // admin token is required is order to post/add items
      const response = await axios.post(backend_url + "/product/add-product", formData, { headers: { token } })

      console.log(response.data)

      if (response.data.success) {
        toast.success("Product added successfully!")

        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)

        setProductName('')
        setDescription('')
        setPrice('')
      }

    } catch (error) {
      console.log(error)
      toast.error("Cannot add product. All fields required!")
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='flex flex-col w-full items-start gap-3'>
        <div>
          <p className='mb-2'>Upload Image</p>
          <div className='flex gap-2'>
            <label htmlFor="image1">
              <img src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} className='cursor-pointer w-20' alt="" />
              <input onChange={(e) => setImage1(e.target.files[0])} type="file" id='image1' hidden />
            </label>

            <label htmlFor="image2">
              <img src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} className='cursor-pointer w-20' alt="" />
              <input onChange={(e) => setImage2(e.target.files[0])} type="file" id='image2' hidden />
            </label>

            <label htmlFor="image3">
              <img src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} className='cursor-pointer w-20' alt="" />
              <input onChange={(e) => setImage3(e.target.files[0])} type="file" id='image3' hidden />
            </label>

            <label htmlFor="image4">
              <img src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} className='cursor-pointer w-20' alt="" />
              <input onChange={(e) => setImage4(e.target.files[0])} type="file" id='image4' hidden />
            </label>
          </div>
        </div>

        <div className='w-full'>
          <p className='mb-2'>Product Name</p>
          <input value={productName} onChange={(e) => setProductName(e.target.value)} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
        </div>

        <div className='w-full'>
          <p className='mb-2'>Product Description</p>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
        </div>

        <div className='flex flex-col gap-2 w-full sm:flex-row sm:gap-8'>
          <div>
            <p className='mb-2'>Product Category</p>
            <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2'>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div>
            <p className='mb-2'>Sub Category</p>
            <select onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2'>
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          <div>
            <p className='mb-2'>Product Price</p>
            <input value={price} onChange={(e) => setPrice(e.target.value)} className='w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='0' />
          </div>
        </div>

        <div>
          <p className='mb-2'>Product Sizes</p>
          <div className='flex gap-3'>
            <div onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}>
              <p className={`${sizes.includes("S") ? 'bg-black text-white' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>S</p>
            </div>
            <div onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}>
              <p className={`${sizes.includes("M") ? 'bg-black text-white' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>M</p>
            </div>
            <div onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}>
              <p className={`${sizes.includes("L") ? 'bg-black text-white' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>L</p>
            </div>
            <div onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}>
              <p className={`${sizes.includes("XL") ? 'bg-black text-white' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>XL</p>
            </div>
          </div>
        </div>

        <div className='flex gap-2 mt-2'>
          <input checked={bestSeller} onChange={() => setBestSeller(!bestSeller)} type="checkbox" id="bestSeller" />
          <label htmlFor="bestSeller" className='cursor-pointer'>Add to best seller</label>
        </div>

        <button type='submit' className='w-28 py-3 mt-4 bg-black text-white cursor-pointer'>ADD</button>
      </form>
    </>
  )
}

export default AddProduct