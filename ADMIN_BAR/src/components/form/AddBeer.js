import { useForm, useFieldArray } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';


export default function AddBeer() {

    // Vérification sur les champs du formulaire
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

      // valeurs par défaut des champs
      const defaultValues = {
        name: '',
        degre: 0,
        description: '',
        img:'',
        allergene: '',
        visible: true,
        dispo: true,
        sizes: []
      }

    // méthodes utilisées sur notre formulaire
    const { control, register, reset, trigger, handleSubmit, formState: { errors, isSubmitting} } = useForm({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(yupSchema)
      });

    // ajout de champs dynamiques
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

      async function submit(values) {
        console.log(values);
        try {
          const response = await fetch('http://localhost:8000/newBeer', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
          });
          if (response.ok) {
            const newForm = await response.json();
            reset(defaultValues);
            console.log(newForm);
          } else {
            console.log('error');
          }
        } catch (error) {
          console.log(error);
        }
      }


    return (
        <div className="d-flex justify-content-center align-items-center"
        style={{backgroundColor: "#fefefe", height: "100vh", width:"100%"}}
        >
           <form onSubmit={ handleSubmit(submit)}>
            <div className="d-flex flex-column mb20">
              <label className="mb10 text-info" htmlFor="name">Name</label>
              <input {...register("name", {
                onBlur() {
                  trigger("name")
                }
              })} id="name" type="text" />
              { errors?.name && <p className='error'>{errors.name.message}</p>}
            </div>
            <div className="d-flex flex-column mb20">
              <label className="mb10 text-info" htmlFor="degre">Degre</label>
              <input {...register("degre", {
                onBlur() {
                  trigger("degre")
                }
              })} id="degre" type="number" min='0' step=".50" />
              { errors?.degre && <p className='error'>{errors.degre.message}</p>}
            </div>
            <div className="d-flex flex-column mb20">
              <label className="mb10 text-info" htmlFor="image">Image</label>
              <input {...register("img", {
                onBlur() {
                  trigger("img")
                }
              })} id="image" type="text" />
              { errors?.img && <p className='error'>{errors.img.message}</p>}
            </div>

            <div className="d-flex flex-column mb20">
              <label className="mb10 text-info" htmlFor="allergene">Allergene</label>
              <input {...register("allergene", {
                onBlur() {
                  trigger("allergene")
                }
              })} id="allergene" type="text" />
              { errors?.allergene && <p className='error'>{errors.allergene.message}</p>}
            </div>
            <div className="d-flex flex-column mb20">
              <label className="mb10 text-info" htmlFor="description">Description</label>
              <textarea {...register("description", {
                onBlur() {
                  trigger("description")
                }
              })} id="description" />
              { errors?.description && <p className='error'>{errors.description.message}</p>}
            </div>
            <div className="d-flex flex-column mb20">
              <label className="mb10 mr20 text-info" htmlFor="visible">Visible
              <input {...register("visible")} id="visible" type="checkbox" />
              </label>
            </div>
            <div className="d-flex flex-column mb20">
              <label className="mb10 mr10 text-info" htmlFor="dispo">Dispo
              <input {...register("dispo")} id="dispo" type="checkbox" />
              </label>
            </div>
            <div className="d-flex flex-column mb20">
            <label className="mb10 d-flex justify-content-center align-items-center">
              <span className='text-danger mr20 text-info'>Sizes</span>
              <button onClick={addActivity} type='button' className='btn btn-info'>+</button>
            </label>
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
        </div>
            <button disabled={isSubmitting} className="btn btn-primary">Save</button>
           </form>
        </div>
    )
}