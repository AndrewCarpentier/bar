import { useForm, useFieldArray } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useLoaderData, useNavigate } from 'react-router-dom';

export default function UpdateBeer() {

  const beer = useLoaderData();
  console.log(beer);

  const navigate = useNavigate();

    const yupSchema = yup.object({
      name: yup.string().required("Ce champ est obligatoire").min(2).max(30),
      degre: yup.number().typeError('Veuillez rentrer un chiffre'),
      img: yup.string().required("Ce champ est obligatoire"),
      description: yup.string().required("Ce champ est obligatoire"),
      allergene: yup.string(),
      visible: yup.bool(),
      dispo: yup.bool(),
      sizes: yup.array().of(yup.object({
        price: yup.number()
      }))
    })

    const defaultValues = {
      name:  beer.name,
      degre: beer.degre,
      img: beer.img,
      description: beer.description,
      allergene: beer.allergene,
      sizes: beer.sizes
    }

    const { control, register, handleSubmit, formState: { errors, isSubmitting} } = useForm({
      defaultValues,
      resolver: yupResolver(yupSchema)
    });

    const { fields, append, remove} = useFieldArray({
      name: 'sizes',
      control
    })

    function addActivity() {
      append({
        size: "",
        price: 0,
        available: true
      })
    }

    function deleteActivity(index) {
      remove(index);
    }

    async function deleteOneBeer(id) {
      console.log(id);
      try {
        const response = await fetch(`http://localhost:8000/deleteOneBeer/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        let body = await response.json();
        console.log(body);
        navigate('/beers')
        return body.beer;
      } catch (error) {
        console.log(error);
      }
    }

      async function submit(values) {
        console.log(values);
        try {
          const response = await fetch(`http://localhost:8000/majOneBeer/${beer._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
          })
          let body = await response.json();
          console.log(body);
          navigate('/beers')
          return body.beers;
        } catch (error) {
          console.log(error);
        }
      }


    return (
        <div className="d-flex flex-column justify-content-center align-items-center"
        style={{backgroundColor: "#fefefe", height: "100vh", width:"100%"}}
        >
           <form onSubmit={ handleSubmit(submit)}>
            <div className="d-flex flex-column mb20">
              <label className="mb10 text-info" htmlFor="name">Name</label>
              <input {...register("name")} id="name" type="text"
               />
              { errors?.name && <p className='error'>{errors.name.message}</p>}
            </div>

            <div className="d-flex flex-column mb20">
              <label className="mb10" htmlFor="degre">Degre</label>
              <input {...register("degre")} id="degre" type="number" min='0' step=".10"
              />
              { errors?.degre && <p className='error'>{errors.degre.message}</p>}
            </div>

            <div className="d-flex flex-column mb20">
              <label className="mb10" htmlFor="image">Image</label>
              <input {...register("img")} id="image" type="text"
               />
              { errors?.img && <p className='error'>{errors.img.message}</p>}
            </div>

            <div className="d-flex flex-column mb20">
              <label className="mb10 text-info" htmlFor="allergene">Allergene</label>
              <input {...register("allergene")} id="allergene" type="text"
              />
              { errors?.allergene && <p className='error'>{errors.allergene.message}</p>}
            </div>

            <div className="d-flex flex-column mb20">
              <label className="mb10" htmlFor="description">Description</label>
              <textarea {...register("description")} id="description" rows={7} cols={50}
              />
              { errors?.description && <p className='error'>{errors.description.message}</p>} 
            </div>

            <ul>
               {fields.map((sizes, i) => (
                <li key={sizes.id} className='d-flex flex-column mb20'>
                  <label className="mb10 text-info" htmlFor="size">Size
                  </label>
                  <select {...register(`sizes[${i}].size`)} id="size" className='mb10'>
                    <option value="25cl">25 cl</option>
                    <option value="33cl">33 cl</option>
                    <option value="50cl">50 cl</option>
                    <option value="1l">1l</option>
                  </select>
                  <label className="mb10 text-info" htmlFor="price">Price
                  </label>
                  <input {...register(`sizes[${i}].price`)} className='flex-fill mb10' id='price' type="number" min='0' step=".10" />
                  <button type='button' onClick={() => deleteActivity(i)} className="btn btn-warning mt-10">-</button>
                </li>
              ))}
            </ul>
            <div className="d-flex flex-column mb20">
            <label className="mb10 d-flex justify-content-center align-items-center">
              <span className='text-danger mr20 text-info'>Sizes</span>
              <button onClick={addActivity} type='button' className='btn btn-info'>+</button>
            </label>
            </div>


            <button disabled={isSubmitting} className="btn btn-primary">Save</button>
           </form>
           <div>
           <button onClick={() => deleteOneBeer(beer._id)} className="btn btn-danger">Delete</button>
           </div>
        </div>
    )
}