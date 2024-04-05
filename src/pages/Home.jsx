import { NavLink } from "react-router-dom"
import { useState, useEffect } from "react";
export default function Home() {
  const [foodmenu, setFoodmenu] = useState([]);
  const [localmenu , setLocalmenu ] = useState(JSON.parse(localStorage.getItem("localmenu")) || []);
  const [error ,setError] = useState('');

  useEffect(() => {
    const getMenu = async () => {
      if (!localmenu || localmenu.length === 0) {
        try {
          const response = await fetch("https://api.spoonacular.com/recipes/random?apiKey=4b666b3276014afa8afa1a36d2280e59&number=50");
          if (response.ok) {
            const data = await response.json();
            setFoodmenu(data.recipes);
            localStorage.setItem("localmenu", JSON.stringify(data.recipes));
          }
          else 
          {
            const data = await response.json();
            setError(`CODE : ${data.code}, ${data.message}`)
          }
          console.log(response);
        } catch (error) {
          console.log("Error in fetching Food recipes Data", error);
          setError(`Faild To Fetch API `)
        }
      }
      else 
      {
        setFoodmenu(localmenu);
      }
    }

    getMenu();
  }, []);

  return (
    <>
    { foodmenu.length>0 ? (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Food Recipes Menu</h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {foodmenu.map((product) => (
            <NavLink to={`/details/${product.id}`} key={product.id}>
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-xl text-gray-700 text-left">
                    <a href="/details">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </a>
                  </h3>
                  <p className="text-sm font-medium text-gray-900 text-justify line-clamp-3" dangerouslySetInnerHTML={{ __html: product.summary }}>
                  </p>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
    ):(<div> 
      { error? (
          <div className="mt-0" >
          <div className='m-auto pt-96 text-bold text-xl'>
             { error }
          </div>
          </div>
      ):(
          <h2 className='text-bold'> Loading ...</h2>
      ) 
      }
    
  </div>)
    
    }
    </>
  )
}